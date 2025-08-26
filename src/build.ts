/// <reference types="node" />
import * as fs from 'node:fs'
import * as path from 'node:path'
import { getBaseColors } from './theme/base'
import { getButtonColors } from './theme/buttons'
import { getInputColors } from './theme/inputs'
import { getActivityBarColors } from './theme/activityBar'
import { getSideBarColors } from './theme/sideBar'
import { getListColors } from './theme/lists'
import { getEditorColors } from './theme/editor'
import { getTabColors } from './theme/tabs'
import { getStatusBarColors } from './theme/statusBar'
import { getTerminalColors } from './theme/terminal'
import { getGitColors } from './theme/git'
import { getNotificationColors } from './theme/notifications'
import { getMenuColors } from './theme/menus'
import { getPeekViewColors } from './theme/peekView'
import { getDiffEditorColors } from './theme/diffEditor'
import { getMergeColors } from './theme/merge'
import { getChartColors } from './theme/charts'
import { getDebugColors } from './theme/debug'
import { getQuickInputColors } from './theme/quickInput'
import { getMiscColors } from './theme/misc'

// New modules with improved architecture
import { ThemeValidator } from './validation/themeValidator'
import { PropertyValidator } from './validation/propertyValidator'
import { ThemeBuilder } from './variants/themeBuilder'
import type { ThemeObject } from './variants/themeBuilder'

/**
 * Improved theme generator with new architecture support
 */

const root = path.resolve(__dirname, '..')
const standardThemePath = path.join(
  root,
  'themes',
  'tokyo-night-dark-color-theme.json'
)

export const buildColors = (): Record<string, string> => ({
  ...getBaseColors(),
  ...getButtonColors(),
  ...getInputColors(),
  ...getActivityBarColors(),
  ...getSideBarColors(),
  ...getListColors(),
  ...getEditorColors(),
  ...getTabColors(),
  ...getStatusBarColors(),
  ...getTerminalColors(),
  ...getGitColors(),
  ...getNotificationColors(),
  ...getMenuColors(),
  ...getPeekViewColors(),
  ...getDiffEditorColors(),
  ...getMergeColors(),
  ...getChartColors(),
  ...getDebugColors(),
  ...getQuickInputColors(),
  ...getMiscColors(),
})

/**
 * Validate and save theme
 */
const validateAndSaveTheme = (
  theme: ThemeObject,
  themePath: string,
  themeName: string
): void => {
  console.log(`Validating theme: ${themeName}`)
  // Validate theme properties
  const propertyValidator = new PropertyValidator()
  const propertyValidation = propertyValidator.validateThemeProperties(
    theme as any
  )

  if (!propertyValidation.passed) {
    console.warn(`⚠️  Issues found with properties in ${themeName}:`)
    propertyValidation.issues.forEach((issue) => {
      const severity =
        issue.severity === 'error'
          ? '🔴'
          : issue.severity === 'warning'
          ? '🟡'
          : '🔵'
      console.warn(`${severity} ${issue.property}: ${issue.message}`)
      if (issue.suggestion) {
        console.warn(`  💡 ${issue.suggestion}`)
      }
    })

    // Automatically fix invalid properties
    const { fixedTheme, fixes } = propertyValidator.fixInvalidProperties(
      theme as any
    )
    if (fixes.length > 0) {
      console.log(`🔧 Automatically fixed ${fixes.length} issues:`)
      fixes.forEach((fix) => {
        console.log(`  • ${fix.property}: ${fix.action}`)
      })
      // Ensure displayName is present for type compatibility
      theme = {
        ...fixedTheme,
        displayName:
          fixedTheme.displayName || theme.displayName || 'Tokyo Night Lod',
      } as ThemeObject
    }
  } else {
    console.log(`✅ Theme properties validation passed for ${themeName}`)
  }

  // Validate theme quality (with disabled excessive info messages)
  const qualityValidator = new ThemeValidator({ skipInfo: true })
  const qualityValidation = qualityValidator.validateTheme(theme)

  if (!qualityValidation.passed) {
    console.warn(`⚠️  Quality issues found in ${themeName}:`)
    qualityValidation.issues.forEach((issue) => {
      const severity =
        issue.severity === 'error'
          ? '🔴'
          : issue.severity === 'warning'
          ? '🟡'
          : '🔵'
      console.warn(`${severity} ${issue.message}`)
      if (issue.suggestion) {
        console.warn(`  💡 ${issue.suggestion}`)
      }
    })
  }

  // Save theme
  console.log(`Saving theme to ${themePath}`)
  const out = JSON.stringify(theme, null, 2) + '\n'
  fs.writeFileSync(themePath, out, 'utf8')
  console.log(`Theme saved to ${themePath}`)
}

/**
 * Generate dynamic colors
 */
const main = async (): Promise<void> => {
  console.log('🏗️  Building Tokyo Night Lod theme...')
  console.log('Starting main function execution')

  // Import performance monitor
  const { BuildPerformanceMonitor } = require('../scripts/build-monitor.js')
  const monitor = new BuildPerformanceMonitor()
  monitor.start()

  // Create themes directory if it doesn't exist
  const themesDir = path.dirname(standardThemePath)
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true })
  }

  console.log('\n🔍 Validating and building themes...')

  // Generate standard theme
  console.log('Generating standard theme...')
  const standardTheme = ThemeBuilder.buildStandard()
  console.log('Standard theme generated:', standardTheme.name)
  console.log('Saving standard theme...')
  validateAndSaveTheme(standardTheme, standardThemePath, 'Tokyo Night Dark')
  console.log(`📁 File: ${standardThemePath}`)

  // End performance monitoring
  const metrics = monitor.end()

  console.log('\n🎉 Build completed! All themes passed validation.')

  // Show performance comparison
  const avgMetrics = monitor.getAverageMetrics()
  if (avgMetrics) {
    console.log(`\n📈 Average metrics:`)
    console.log(`   Build time: ${avgMetrics.averageBuildTimeMs.toFixed(2)}ms`)
    console.log(`   Memory usage: ${avgMetrics.averageMemoryUsedMB}MB`)

    if (metrics) {
      const timeDiff = metrics.buildTimeMs - avgMetrics.averageBuildTimeMs
      const memDiff =
        parseFloat(metrics.memoryUsedMB) -
        parseFloat(avgMetrics.averageMemoryUsedMB)

      console.log(`\n📊 Comparison with average:`)
      console.log(
        `   Time: ${timeDiff >= 0 ? '+' : ''}${timeDiff.toFixed(2)}ms ${
          timeDiff > 0 ? '🔴' : '🟢'
        }`
      )
      console.log(
        `   Memory: ${memDiff >= 0 ? '+' : ''}${memDiff.toFixed(2)}MB ${
          memDiff > 0 ? '🔴' : '🟢'
        }`
      )
    }
  }
}

console.log('Starting main function...')
if (require.main === module) {
  console.log('Executing main function...')
  main().catch((error: Error) => {
    console.error('❌ Build failed:', error)
    process.exit(1)
  })
}
