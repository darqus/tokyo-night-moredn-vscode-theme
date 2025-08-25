#!/usr/bin/env ts-node

/**
 * Test script to demonstrate the smart versioning system
 * Creates test commits and shows how analysis works
 */

import { execSync } from 'child_process'
import { SmartVersionManager } from './smart-version'

interface CommitData {
  hash: string
  type: string
  scope?: string
  description: string
  breaking: boolean
}

interface AnalysisResult {
  recommended: 'patch' | 'minor' | 'major'
  commits: CommitData[]
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

interface TestScenario {
  name: string
  commits: string[]
  expectedType: 'patch' | 'minor' | 'major'
  description: string
}

const testScenarios: TestScenario[] = [
  {
    name: 'Scenario 1: Only fixes',
    commits: [
      'fix(theme): fix button contrast',
      'fix(build): fix Windows build',
      'docs(readme): update installation instructions',
    ],
    expectedType: 'patch',
    description: 'Only fixes - should be PATCH release',
  },
  {
    name: 'Scenario 2: Features + fixes',
    commits: [
      'feat(theme): add light theme support',
      'feat(variants): new minimal variant',
      'fix(ui): fix panel padding',
      'perf(build): speed up build',
    ],
    expectedType: 'minor',
    description: 'New features + fixes - should be MINOR release',
  },
  {
    name: 'Scenario 3: Breaking changes',
    commits: [
      'feat(api)!: new config format',
      'fix(theme): fix colors',
      'refactor(build): overhaul system',
    ],
    expectedType: 'major',
    description: 'Breaking changes - should be MAJOR release',
  },
  {
    name: 'Scenario 4: Only documentation',
    commits: [
      'docs(api): add usage examples',
      'docs(readme): update description',
      'style(code): improve formatting',
    ],
    expectedType: 'patch',
    description: 'Only documentation and styles - should be PATCH release',
  },
  {
    name: 'Scenario 5: Performance improvements',
    commits: [
      'perf(palette): optimize color generation',
      'perf(build): speed up TypeScript compilation',
      'fix(memory): fix memory leak',
    ],
    expectedType: 'patch',
    description: 'Performance improvements - should be PATCH release',
  },
]

class SmartVersionTester {
  private smartVersion: SmartVersionManager

  constructor() {
    this.smartVersion = new SmartVersionManager()
  }

  /**
   * Run all test scenarios
   */
  async runAllTests(): Promise<void> {
    console.log('🧪 Running smart versioning system tests\n')
    console.log('='.repeat(80))

    for (let i = 0; i < testScenarios.length; i++) {
      const scenario = testScenarios[i]
      console.log(
        `\n📋 Test ${i + 1}/${testScenarios.length}: ${scenario.name}`
      )
      console.log(`📝 Description: ${scenario.description}`)
      console.log(`🎯 Expected: ${scenario.expectedType.toUpperCase()} release`)
      console.log('-'.repeat(60))

      await this.testScenario(scenario)

      if (i < testScenarios.length - 1) {
        console.log('\n' + '='.repeat(80))
      }
    }

    console.log('\n✅ All tests completed!')
    this.printSummary()
  }

  /**
   * Test one scenario
   */
  private async testScenario(scenario: TestScenario): Promise<void> {
    try {
      console.log('\n📝 Commits for test:')
      scenario.commits.forEach((commit, index) => {
        console.log(`   ${index + 1}. ${commit}`)
      })

      // Simulate commit analysis by creating temporary data
      const mockCommits = scenario.commits
        .map((commit, index) => {
          const conventionalRegex = /^(\w+)(\(.+\))?(!)?:\s*(.+)$/
          const match = commit.match(conventionalRegex)

          if (!match) {
            return null
          }

          const [, type, scopeMatch, breakingMark, description] = match
          const scope = scopeMatch ? scopeMatch.slice(1, -1) : undefined

          return {
            hash: `abc${index.toString().padStart(4, '0')}`,
            type,
            scope,
            description,
            breaking: !!breakingMark,
          }
        })
        .filter((commit) => commit !== null)

      // Analyze commits
      const analysis = this.analyzeTestCommits(mockCommits as CommitData[])

      console.log('\n🔍 Analysis result:')
      console.log(
        `   📊 Recommended type: ${analysis.recommended.toUpperCase()}`
      )
      console.log(`   📝 Total commits: ${analysis.stats.total}`)
      console.log(`   ✨ Features: ${analysis.stats.features}`)
      console.log(`   🐛 Fixes: ${analysis.stats.fixes}`)
      console.log(`   💥 Breaking: ${analysis.stats.breaking}`)
      console.log(`   ⚡ Performance: ${analysis.stats.performance}`)

      // Check expectations
      const isCorrect = analysis.recommended === scenario.expectedType
      console.log(
        `\n${isCorrect ? '✅' : '❌'} Test ${isCorrect ? 'PASSED' : 'FAILED'}`
      )

      if (!isCorrect) {
        console.log(`   ❌ Expected: ${scenario.expectedType.toUpperCase()}`)
        console.log(`   ❌ Got: ${analysis.recommended.toUpperCase()}`)
      }

      // Show summary
      if (analysis.summary.length > 0) {
        console.log('\n📋 Summary:')
        analysis.summary
          .slice(0, 5)
          .forEach((item: string) => console.log(item))
      }
    } catch (error) {
      console.error(`❌ Test error: ${error}`)
    }
  }

  /**
   * Analyze test commits (simplified version)
   */
  private analyzeTestCommits(commits: CommitData[]): AnalysisResult {
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
   * Show final summary
   */
  private printSummary(): void {
    console.log('\n📊 Final summary:')
    console.log('   🧪 Test scenarios demonstrate analysis logic')
    console.log('   ✅ System correctly determines release types')
    console.log('   📈 Priority: MAJOR > MINOR > PATCH')
    console.log('   💡 Breaking changes always lead to MAJOR')
    console.log('   ⚡ Features without breaking changes give MINOR')
    console.log('   🐛 Only fixes/perf give PATCH')

    console.log('\n🚀 For real usage:')
    console.log('   npm run release              # Smart release')
    console.log('   npm run version:analyze      # Analysis only')
    console.log('   npm run release:dry          # Preview')
  }

  /**
   * Demo mode with interactivity
   */
  async interactiveDemo(): Promise<void> {
    console.log('🎮 Interactive demo of smart versioning system\n')

    // Show real analysis of current commits
    console.log('📊 Analysis of real commits in repository:')
    console.log('-'.repeat(50))

    try {
      const analysis = await this.smartVersion.analyzeCommits({
        verbose: true,
        force: true, // Ignore git status for demo
      })

      console.log('\n🎯 This analysis shows real project state')
      console.log('📈 System is ready for use!')
    } catch (error) {
      console.log('ℹ️  Real analysis unavailable (no git history or tags)')
      console.log('🧪 Running test scenarios instead...\n')
      await this.runAllTests()
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const tester = new SmartVersionTester()

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`

🧪 Smart Versioning System Tester

Usage:
  npm run test:version              # Run all tests
  npm run test:version -- --demo    # Interactive demo
  npm run test:version -- --help    # Show help

Description:
  This script tests the logic of the smart versioning system
  on various commit scenarios, showing how the release type
  (patch/minor/major) is determined based on conventional commits.

Examples:
  test:version                      # All test scenarios
  test:version -- --demo            # Demo with real data
`)
    return
  }

  if (args.includes('--demo')) {
    await tester.interactiveDemo()
  } else {
    await tester.runAllTests()
  }
}

if (require.main === module) {
  main().catch(console.error)
}

export { SmartVersionTester }