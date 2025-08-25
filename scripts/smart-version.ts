#!/usr/bin/env ts-node

/**
 * Smart Automatic Versioning System
 * Analyzes conventional commits and determines the correct version type
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

interface CommitInfo {
  hash: string
  type: string
  scope?: string
  description: string
  body?: string
  footer?: string
  breaking: boolean
}

interface VersionAnalysis {
  recommended: 'patch' | 'minor' | 'major'
  commits: CommitInfo[]
  stats: {
    total: number
    features: number
    fixes: number
    breaking: number
    performance: number
    others: number
  }
  summary: string[]
  hasBreaking: boolean
}

interface SmartVersionOptions {
  dryRun?: boolean
  force?: boolean
  verbose?: boolean
  since?: string
  patch?: boolean
  minor?: boolean
  major?: boolean
}

class SmartVersionManager {
  private packagePath: string

  constructor() {
    this.packagePath = join(process.cwd(), 'package.json')
  }

  /**
   * Analyze commits and determine version type
   */
  async analyzeCommits(
    options: SmartVersionOptions = {}
  ): Promise<VersionAnalysis> {
    console.log('🔍 Analyzing commits to determine version...\n')

    const commits = this.getCommitsSinceLastRelease(options.since)
    const analysis = this.analyzeCommitTypes(commits)

    if (options.verbose) {
      this.printDetailedAnalysis(analysis)
    } else {
      this.printAnalysisSummary(analysis)
    }

    return analysis
  }

  /**
   * Execute smart release
   */
  async smartRelease(options: SmartVersionOptions = {}): Promise<void> {
    try {
      console.log('🤖 Starting smart release system...\n')

      if (!options.force) {
        this.checkGitStatus()
      }

      // Determine release type
      let releaseType: 'patch' | 'minor' | 'major'

      if (options.patch) {
        releaseType = 'patch'
      } else if (options.minor) {
        releaseType = 'minor'
      } else if (options.major) {
        releaseType = 'major'
      } else {
        // Smart analysis mode
        const analysis = await this.analyzeCommits(options)

        if (analysis.commits.length === 0) {
          console.log('ℹ️  No commits for release since last version')
          return
        }

        releaseType = analysis.recommended
      }

      const currentVersion = this.getCurrentVersion()
      const nextVersion = this.calculateNextVersion(currentVersion, releaseType)

      console.log(`\n📊 Release Information:`)
      console.log(`   🏷️  Current version: ${currentVersion}`)
      console.log(`   🏷️  New version: ${nextVersion}`)
      console.log(`   📈 Release type: ${releaseType.toUpperCase()}`)

      if (options.dryRun) {
        console.log('\n🧪 Preview mode - changes not applied')
        return
      }

      // Execute release
      await this.executeRelease(releaseType, options)

      console.log('\n✅ Smart release successfully completed!')
      this.printNextSteps(nextVersion)
    } catch (error) {
      console.error('❌ Smart release error:', error)
      process.exit(1)
    }
  }

  /**
   * Get commits since last release
   */
  private getCommitsSinceLastRelease(since?: string): CommitInfo[] {
    try {
      // Determine commit range
      let range = since || this.getLastReleaseTag()
      if (!range) {
        range = '--all' // If no tags, take all commits
      } else {
        range = `${range}..HEAD`
      }

      const command = `git log ${range} --pretty=format:"%H|%s|%b" --no-merges`
      const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' })

      if (!output.trim()) {
        return []
      }

      return output
        .trim()
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => this.parseCommit(line))
        .filter((commit) => commit !== null) as CommitInfo[]
    } catch (error) {
      console.warn(`⚠️  Failed to get commits: ${error}`)
      return []
    }
  }

  /**
   * Get last release tag
   */
  private getLastReleaseTag(): string | null {
    try {
      const output = execSync('git describe --tags --abbrev=0', {
        encoding: 'utf8',
        stdio: 'pipe',
      })
      return output.trim()
    } catch (error) {
      return null // No tags
    }
  }

  /**
   * Parse conventional commit
   */
  private parseCommit(line: string): CommitInfo | null {
    const parts = line.split('|')
    if (parts.length < 2) {
      return null
    }

    const [hash, subject, body = ''] = parts

    if (!subject) {
      return null
    }

    // Parse conventional commit format
    const conventionalRegex = /^(\w+)(\(.+\))?(!)?:\s*(.+)$/
    const match = subject.match(conventionalRegex)

    if (!match) {
      // If it doesn't match conventional commits, skip
      return null
    }

    const [, type, scopeMatch, breakingMark, description] = match
    const scope = scopeMatch ? scopeMatch.slice(1, -1) : undefined

    // Check for breaking changes
    const breaking = !!(
      breakingMark ||
      body.includes('BREAKING CHANGE:') ||
      body.includes('BREAKING-CHANGE:')
    )

    return {
      hash: hash.substring(0, 7),
      type,
      scope,
      description,
      body: body.trim() || undefined,
      breaking,
    }
  }

  /**
   * Analyze commit types
   */
  private analyzeCommitTypes(commits: CommitInfo[]): VersionAnalysis {
    const stats = {
      total: commits.length,
      features: 0,
      fixes: 0,
      breaking: 0,
      performance: 0,
      others: 0,
    }

    const summary: string[] = []
    let hasFeatures = false
    let hasBreaking = false

    for (const commit of commits) {
      // Count statistics
      switch (commit.type) {
        case 'feat':
          stats.features++
          hasFeatures = true
          summary.push(`   • ✨ ${commit.description}`)
          break
        case 'fix':
          stats.fixes++
          summary.push(`   • 🐛 ${commit.description}`)
          break
        case 'perf':
          stats.performance++
          summary.push(`   • ⚡ ${commit.description}`)
          break
        case 'docs':
          stats.others++
          summary.push(`   • 📚 ${commit.description}`)
          break
        case 'style':
          stats.others++
          summary.push(`   • 💄 ${commit.description}`)
          break
        case 'refactor':
          stats.others++
          summary.push(`   • ♻️  ${commit.description}`)
          break
        case 'test':
          stats.others++
          summary.push(`   • 🧪 ${commit.description}`)
          break
        case 'build':
          stats.others++
          summary.push(`   • 🏗️  ${commit.description}`)
          break
        case 'ci':
          stats.others++
          summary.push(`   • 👷 ${commit.description}`)
          break
        case 'chore':
          stats.others++
          summary.push(`   • 🔧 ${commit.description}`)
          break
        default:
          stats.others++
          summary.push(`   • 📝 ${commit.description}`)
      }

      if (commit.breaking) {
        stats.breaking++
        hasBreaking = true
      }
    }

    // Determine recommended release type
    let recommended: 'patch' | 'minor' | 'major' = 'patch'

    if (hasBreaking) {
      recommended = 'major'
    } else if (hasFeatures) {
      recommended = 'minor'
    } else if (stats.fixes > 0 || stats.performance > 0) {
      recommended = 'patch'
    }

    return {
      recommended,
      commits,
      stats,
      summary,
      hasBreaking,
    }
  }

  /**
   * Print brief analysis
   */
  private printAnalysisSummary(analysis: VersionAnalysis): void {
    console.log('🔍 Commit analysis completed:')
    console.log(`   📝 Commits analyzed: ${analysis.stats.total}`)
    console.log(`   ✨ Features: ${analysis.stats.features > 0 ? '✅' : '❌'}`)
    console.log(`   🐛 Fixes: ${analysis.stats.fixes > 0 ? '✅' : '❌'}`)
    console.log(`   💥 Breaking: ${analysis.stats.breaking > 0 ? '✅' : '❌'}`)
    console.log(
      `   ⚡ Performance: ${analysis.stats.performance > 0 ? '✅' : '❌'}`
    )

    console.log(
      `\n📈 Recommended release type: ${analysis.recommended.toUpperCase()}`
    )

    if (analysis.summary.length > 0) {
      console.log('\n📋 Summary of changes:')
      analysis.summary.slice(0, 10).forEach((item) => console.log(item))
      if (analysis.summary.length > 10) {
        console.log(`   ... and ${analysis.summary.length - 10} more changes`)
      }
    }

    const currentVersion = this.getCurrentVersion()
    const nextVersion = this.calculateNextVersion(
      currentVersion,
      analysis.recommended
    )
    console.log(`\n📊 Version: ${currentVersion} → ${nextVersion}`)
  }

  /**
   * Print detailed analysis
   */
  private printDetailedAnalysis(analysis: VersionAnalysis): void {
    console.log('📊 Detailed commit statistics:')
    console.log(`   Total commits: ${analysis.stats.total}`)
    console.log(`   Features: ${analysis.stats.features}`)
    console.log(`   Bug fixes: ${analysis.stats.fixes}`)
    console.log(`   Breaking changes: ${analysis.stats.breaking}`)
    console.log(`   Others: ${analysis.stats.others}`)

    console.log('\n📝 All commits:')
    analysis.commits.forEach((commit) => {
      const breaking = commit.breaking ? ' 💥' : ''
      const scope = commit.scope ? `(${commit.scope})` : ''
      console.log(
        `   ${commit.hash} ${commit.type}${scope}: ${commit.description}${breaking}`
      )
    })

    this.printAnalysisSummary(analysis)
  }

  /**
   * Get current version
   */
  private getCurrentVersion(): string {
    const pkg = JSON.parse(readFileSync(this.packagePath, 'utf8'))
    return pkg.version
  }

  /**
   * Calculate next version
   */
  private calculateNextVersion(
    current: string,
    type: 'patch' | 'minor' | 'major'
  ): string {
    const [major, minor, patch] = current.split('.').map(Number)

    switch (type) {
      case 'major':
        return `${major + 1}.0.0`
      case 'minor':
        return `${major}.${minor + 1}.0`
      case 'patch':
        return `${major}.${minor}.${patch + 1}`
      default:
        return current
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
   * Execute release
   */
  private async executeRelease(
    type: string,
    options: SmartVersionOptions
  ): Promise<void> {
    console.log('\n🏗️  Executing release...')

    // Run tests
    console.log('🧪 Running tests...')
    try {
      execSync('npm run test', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Tests failed')
    }

    // Build project
    console.log('🏗️  Building project...')
    try {
      execSync('npm run build', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Project build error')
    }

    // Create release with standard-version
    console.log(`📦 Creating ${type} release...`)
    try {
      const command = `npx standard-version --release-as ${type}`
      execSync(command, { stdio: 'inherit' })
    } catch (error) {
      throw new Error(`Error creating release: ${error}`)
    }

    // Create package
    console.log('📦 Creating VSIX package...')
    try {
      execSync('npm run package', { stdio: 'inherit' })
    } catch (error) {
      throw new Error('Package creation error')
    }

    // Create GitHub release
    console.log('🚀 Creating GitHub release...')
    try {
      const latestTag = execSync('git describe --tags --abbrev=0', {
        encoding: 'utf8',
      }).trim()
      execSync(`gh release create ${latestTag} --generate-notes`, {
        stdio: 'inherit',
      })
    } catch (error) {
      throw new Error('Error creating GitHub release')
    }
  }

  /**
   * Show next steps
   */
  private printNextSteps(version: string): void {
    console.log('\n📋 Next steps:')
    console.log('1. Publish package: npm run publish')
    console.log(
      `🎉 New version ${version} is released and available on GitHub!`
    )
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const smartVersion = new SmartVersionManager()

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`

🤖 Tokyo Night Lod Smart Version Manager

Usage:
  npm run version:smart              # Smart release (analysis + release)
  npm run version:analyze            # Commit analysis only
  npm run version:smart --dry-run    # Preview

Options:
  --dry-run                          # Show what would be done
  --force                            # Ignore git checks
  --verbose                          # Detailed analysis output
  --since <tag>                      # Analysis from specific tag
  --patch                            # Explicitly specify patch version
  --minor                            # Explicitly specify minor version
  --major                            # Explicitly specify major version
  --help, -h                         # Show this help

Examples:
  npm run version:smart              # Automatic release
  npm run version:analyze            # Analysis only
  npm run version:smart -- --verbose # Detailed analysis + release
  npm run version:smart -- --since v1.0.0  # Analysis from version 1.0.0
  npm run version:smart -- --patch   # Explicitly specify patch version
  npm run version:smart -- --minor   # Explicitly specify minor version
  npm run version:smart -- --major   # Explicitly specify major version

Version determination logic:
  - MAJOR: if there are breaking changes (feat!: or BREAKING CHANGE:)
  - MINOR: if there are new features (feat:)
  - PATCH: if there are only fixes (fix:, perf:)
`)
    return
  }

  const options: SmartVersionOptions = {
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    verbose: args.includes('--verbose'),
    since: args.includes('--since')
      ? args[args.indexOf('--since') + 1]
      : undefined,
    patch: args.includes('--patch'),
    minor: args.includes('--minor'),
    major: args.includes('--major'),
  }

  // Determine mode of operation
  const scriptName = process.env.npm_lifecycle_event

  if (scriptName === 'version:analyze' || args.includes('--analyze-only')) {
    await smartVersion.analyzeCommits(options)
  } else {
    await smartVersion.smartRelease(options)
  }
}

if (require.main === module) {
  main().catch(console.error)
}

export { SmartVersionManager }
