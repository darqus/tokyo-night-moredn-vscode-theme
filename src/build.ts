/// <reference types="node" />
import * as fs from 'node:fs'
import * as path from 'node:path'

import { ThemeValidator, PropertyValidator } from './validation'
import { ThemeBuilder } from './variants/themeBuilder'
import type { ThemeObject } from './types/theme'

// Paths
const root = path.resolve(__dirname, '..')
const standardThemePath = path.join(
  root,
  'themes',
  'tokyo-night-dark-color-theme.json'
)

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
    theme
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
      theme
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
 * Build single dark theme
 */
const main = async (): Promise<void> => {
  console.log('🏗️  Building Tokyo Night Lod (single dark theme)...')

  // Import performance monitor lazily
  const { BuildPerformanceMonitor } = require('../scripts/build-monitor.js')
  const monitor = new BuildPerformanceMonitor()
  monitor.start()

  // Ensure output dir exists
  const themesDir = path.dirname(standardThemePath)
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true })
  }

  console.log('\n🔍 Validating and building theme...')

  // Build only one standard theme
  const standardTheme = ThemeBuilder.buildStandard()
  console.log('Generated:', standardTheme.name)

  validateAndSaveTheme(standardTheme, standardThemePath, 'Tokyo Night Dark')
  console.log(`📁 File: ${standardThemePath}`)

  // End performance monitoring
  const metrics = monitor.end()
  console.log('\n🎉 Build completed!')

  const avgMetrics = monitor.getAverageMetrics()
  if (avgMetrics && metrics) {
    const timeDiff = metrics.buildTimeMs - avgMetrics.averageBuildTimeMs
    const memDiff =
      parseFloat(metrics.memoryUsedMB) -
      parseFloat(avgMetrics.averageMemoryUsedMB)

    console.log(`\n📈 Average metrics:`)
    console.log(`   Build time: ${avgMetrics.averageBuildTimeMs.toFixed(2)}ms`)
    console.log(`   Memory usage: ${avgMetrics.averageMemoryUsedMB}MB`)

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

if (require.main === module) {
  main().catch((error: Error) => {
    console.error('❌ Build failed:', error)
    process.exit(1)
  })
}
