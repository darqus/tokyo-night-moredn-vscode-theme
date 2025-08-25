#!/usr/bin/env ts-node

/**
 * Tokyo Night Lod Release Automation Script
 * Ensures proper semantic versioning
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

interface ReleaseOptions {
  type?: 'patch' | 'minor' | 'major' | 'prerelease'
  prerelease?: string
  dryRun?: boolean
  firstRelease?: boolean
}

class ReleaseManager {
  private packagePath: string
  private changelogPath: string

  constructor() {
    this.packagePath = join(process.cwd(), 'package.json')
    this.changelogPath = join(process.cwd(), 'CHANGELOG.md')
  }

  /**
   * Execute release
   */
  async release(options: ReleaseOptions = {}): Promise<void> {
    try {
      console.log('🚀 Starting release process...')

      // Check git status
      this.checkGitStatus()

      // Run tests
      if (!options.dryRun) {
        console.log('🧪 Running tests...')
        this.runTests()
      }

      // Build project
      if (!options.dryRun) {
        console.log('🏗️  Building project...')
        this.buildProject()
      }

      // Create release
      console.log('📦 Creating release...')
      this.createRelease(options)

      // Create package
      if (!options.dryRun) {
        console.log('📦 Creating VSIX package...')
        this.createPackage()
      }

      console.log('✅ Release successfully created!')
      this.printNextSteps()
    } catch (error) {
      console.error('❌ Error creating release:', error)
      process.exit(1)
    }
  }

  /**
   * Check git status
   */
  private checkGitStatus(): void {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' })
      if (status.trim()) {
        console.warn('⚠️  There are uncommitted changes:')
        console.log(status)
        throw new Error('Commit or stash changes before release')
      }
    } catch (error) {
      throw new Error(`Error checking git status: ${error}`)
    }
  }

  /**
   * Run tests
   */
  private runTests(): void {
    try {
      execSync('npm run test', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Tests failed')
    }
  }

  /**
   * Build project
   */
  private buildProject(): void {
    try {
      execSync('npm run build', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Project build error')
    }
  }

  /**
   * Create release
   */
  private createRelease(options: ReleaseOptions): void {
    const args: string[] = []

    if (options.dryRun) {
      args.push('--dry-run')
    }

    if (options.firstRelease) {
      args.push('--first-release')
    } else if (options.type) {
      if (options.type === 'prerelease') {
        args.push('--prerelease', options.prerelease || 'alpha')
      } else {
        args.push('--release-as', options.type)
      }
    }

    try {
      const command = `npx standard-version ${args.join(' ')}`
      console.log(`Executing: ${command}`)
      execSync(command, { stdio: 'inherit' })
    } catch (error) {
      throw new Error(`Error creating release: ${error}`)
    }
  }

  /**
   * Create VSIX package
   */
  private createPackage(): void {
    try {
      execSync('npm run package', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Package creation error')
    }
  }

  /**
   * Show next steps
   */
  private printNextSteps(): void {
    const pkg = JSON.parse(readFileSync(this.packagePath, 'utf8'))
    console.log('\n📋 Next steps:')
    console.log(`1. Check changes in CHANGELOG.md`)
    console.log(`2. Push changes: git push --follow-tags origin main`)
    console.log(`3. Publish package: npm run publish`)
    console.log(`4. Check release on GitHub`)
    console.log(`\n📊 New version: ${pkg.version}`)
  }

  /**
   * Get next version info
   */
  async getNextVersion(type?: string): Promise<string> {
    try {
      const args = ['--dry-run', '--silent']
      if (type) {
        args.push('--release-as', type)
      }

      const output = execSync(`npx standard-version ${args.join(' ')}`, {
        encoding: 'utf8',
        stdio: 'pipe',
      })

      const versionMatch = output.match(
        /bumping version in package\.json from .+ to (.+)/
      )
      return versionMatch ? versionMatch[1] : 'unknown'
    } catch (error) {
      return 'unknown'
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const releaseManager = new ReleaseManager()

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`

🚀 Tokyo Night Lod Release Manager

Usage:
  npm run release                     # Automatic version detection
  npm run release:patch              # Patch release (0.0.X)
  npm run release:minor              # Minor release (0.X.0)
  npm run release:major              # Major release (X.0.0)
  npm run release:alpha              # Prerelease alpha
  npm run release:beta               # Prerelease beta
  npm run release:rc                 # Prerelease RC
  npm run release:first              # First release
  npm run release:dry                # Dry run

Options:
  --dry-run                          # Show what would be done
  --help, -h                         # Show this help

Examples:
  npm run release                    # → 1.2.3 → 1.2.4 (automatically)
  npm run release:minor              # → 1.2.3 → 1.3.0
  npm run release:major              # → 1.2.3 → 2.0.0
  npm run release:alpha              # → 1.2.3 → 1.2.4-alpha.0
`)
    return
  }

  const options: ReleaseOptions = {
    dryRun: args.includes('--dry-run'),
  }

  // Determine release type from script name
  const scriptName = process.env.npm_lifecycle_event
  if (scriptName?.startsWith('release:')) {
    const releaseType = scriptName.split(':')[1]

    switch (releaseType) {
      case 'patch':
      case 'minor':
      case 'major':
        options.type = releaseType
        break
      case 'alpha':
      case 'beta':
      case 'rc':
        options.type = 'prerelease'
        options.prerelease = releaseType
        break
      case 'first':
        options.firstRelease = true
        break
      case 'dry':
        options.dryRun = true
        break
    }
  }

  await releaseManager.release(options)
}

if (require.main === module) {
  main().catch(console.error)
}

export { ReleaseManager }