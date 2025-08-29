#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import { PropertyValidator } from '../src/validation/propertyValidator'
import { ThemeValidator } from '../src/validation/themeValidator'
import type { ValidationIssue } from '../src/types/theme'

/**
 * CLI utility for validating VS Code themes
 */

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`
}

function printHelp(): void {
  console.log(`
${colorize('VS Code Tokyo Night Theme Validator', 'bold')}

${colorize('USAGE:', 'cyan')}
  npm run validate [theme-file.json]
  node dist/scripts/validate-theme.js [theme-file.json]

${colorize('OPTIONS:', 'cyan')}
  -h, --help              Show this help
  -v, --verbose           Verbose output
  -f, --fix               Automatically fix invalid properties
  -o, --output <file>     Save fixed theme to file
  -a, --all               Validate all themes in themes/ folder
  -s, --summary           Show summary only without details

${colorize('EXAMPLES:', 'cyan')}
  npm run validate themes/tokyo-night-dark-color-theme.json
  npm run validate --all
  npm run validate --fix --output fixed-theme.json theme.json

${colorize('EXIT CODES:', 'cyan')}
  0  - Validation passed successfully
  1  - Errors found
  2  - Invalid arguments or file error
`)
}

interface ValidateOptions {
  verbose: boolean
  fix: boolean
  output?: string
  all: boolean
  summary: boolean
}

async function validateThemeFile(
  filePath: string,
  options: ValidateOptions
): Promise<boolean> {
  if (!fs.existsSync(filePath)) {
    console.error(colorize(`❌ File not found: ${filePath}`, 'red'))
    return false
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const theme = JSON.parse(content)

    console.log(colorize(`\n🔍 Validating: ${path.basename(filePath)}`, 'bold'))

    // Property validation
    const propertyValidator = new PropertyValidator()
    const propertyResult = propertyValidator.validateThemeProperties(theme)

    // Quality validation
    const qualityValidator = new ThemeValidator()
    const qualityResult = qualityValidator.validateTheme(theme)

    const allPassed = propertyResult.passed && qualityResult.passed
    const totalIssues =
      propertyResult.issues.length + qualityResult.issues.length

    // Summary
    if (options.summary) {
      const status = allPassed
        ? colorize('✅ PASSED', 'green')
        : colorize('❌ FAILED', 'red')
      const issues =
        totalIssues > 0 ? colorize(`(${totalIssues} issues)`, 'yellow') : ''
      console.log(`  ${status} ${issues}`)
      return allPassed
    }

    // Property reports
    if (propertyResult.issues.length > 0) {
      console.log(colorize('\n📋 THEME PROPERTIES:', 'cyan'))
      console.log(propertyValidator.generateReport(propertyResult))
    } else {
      console.log(colorize('✅ All theme properties are valid', 'green'))
    }

    // Quality reports
    if (qualityResult.issues.length > 0) {
      console.log(colorize('\n🎨 THEME QUALITY:', 'cyan'))
      qualityResult.issues.forEach((issue: ValidationIssue) => {
        const severity =
          issue.severity === 'error'
            ? colorize('🔴 ERROR', 'red')
            : issue.severity === 'warning'
            ? colorize('🟡 WARNING', 'yellow')
            : colorize('🔵 INFO', 'blue')
        console.log(`  ${severity}: ${issue.message}`)
        if (issue.suggestion && options.verbose) {
          console.log(`    💡 ${issue.suggestion}`)
        }
      })
    } else {
      console.log(colorize('✅ Theme quality meets standards', 'green'))
    }

    // Auto-fix
    if (options.fix && !propertyResult.passed) {
      const { fixedTheme, fixes } =
        propertyValidator.fixInvalidProperties(theme)

      if (fixes.length > 0) {
        console.log(
          colorize(`\n🔧 Automatically fixed ${fixes.length} issues:`, 'cyan')
        )
        fixes.forEach(
          (fix: {
            property: string
            action: string
            oldValue?: string
            newValue?: string
          }) => {
            console.log(`  • ${fix.property}: ${fix.action}`)
          }
        )

        const outputPath =
          options.output || filePath.replace('.json', '.fixed.json')
        fs.writeFileSync(
          outputPath,
          JSON.stringify(fixedTheme, null, 2) + '\n',
          'utf8'
        )
        console.log(colorize(`💾 Fixed theme saved: ${outputPath}`, 'green'))
      }
    }

    return allPassed
  } catch (error) {
    console.error(
      colorize(
        `❌ Error processing file: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        'red'
      )
    )
    return false
  }
}

async function validateAllThemes(options: ValidateOptions): Promise<boolean> {
  const themesDir = path.join(process.cwd(), 'themes')

  if (!fs.existsSync(themesDir)) {
    console.error(colorize('❌ themes/ folder not found', 'red'))
    return false
  }

  const themeFiles = fs
    .readdirSync(themesDir)
    .filter((file) => file.endsWith('.json'))

  if (themeFiles.length === 0) {
    console.error(colorize('❌ No JSON files found in themes/ folder', 'red'))
    return false
  }

  console.log(
    colorize(`🔍 Found ${themeFiles.length} themes for validation:`, 'bold')
  )

  let allPassed = true
  let totalIssues = 0

  for (const file of themeFiles) {
    const filePath = path.join(themesDir, file)
    const result = await validateThemeFile(filePath, options)
    if (!result) allPassed = false
  }

  // Overall summary
  console.log(colorize('\n📊 OVERALL SUMMARY:', 'bold'))
  if (allPassed) {
    console.log(
      colorize('🎉 All themes passed validation successfully!', 'green')
    )
  } else {
    console.log(colorize('⚠️  Some themes have issues', 'yellow'))
  }

  return allPassed
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)

  const options: ValidateOptions = {
    verbose: false,
    fix: false,
    all: false,
    summary: false,
  }

  let filePath: string | undefined

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
      case '-h':
      case '--help':
        printHelp()
        process.exit(0)

      case '-v':
      case '--verbose':
        options.verbose = true
        break

      case '-f':
      case '--fix':
        options.fix = true
        break

      case '-o':
      case '--output':
        options.output = args[++i]
        break

      case '-a':
      case '--all':
        options.all = true
        break

      case '-s':
      case '--summary':
        options.summary = true
        break

      default:
        if (!arg.startsWith('-')) {
          filePath = arg
        } else {
          console.error(colorize(`❌ Unknown option: ${arg}`, 'red'))
          console.error('Use --help for help')
          process.exit(2)
        }
    }
  }

  // Validation
  let success = false

  if (options.all) {
    success = await validateAllThemes(options)
  } else if (filePath) {
    success = await validateThemeFile(filePath, options)
  } else {
    console.error(colorize('❌ No theme file specified for validation', 'red'))
    console.error('Use --help for help')
    process.exit(2)
  }

  process.exit(success ? 0 : 1)
}

// Run only if file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error(
      colorize(
        `❌ Critical error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        'red'
      )
    )
    process.exit(2)
  })
}

export { validateThemeFile, validateAllThemes }
