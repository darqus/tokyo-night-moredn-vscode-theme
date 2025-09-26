/**
 * Test utilities for theme generation
 */

import { ThemeGenerator, ConfigManager } from '../../src/core/simplified'
import type { VSCodeTheme } from '../../src/types/theme'

/**
 * Generate theme with default test configuration
 */
export function generateTestTheme(): VSCodeTheme {
  const config = ConfigManager.getDefault()
  return ThemeGenerator.generate({
    name: config.theme.name,
    displayName: config.theme.displayName,
    type: config.theme.type
  })
}

/**
 * Get default theme config for tests
 */
export function getTestConfig() {
  return ConfigManager.getDefault()
}

/**
 * Mock console methods for cleaner test output
 */
export function mockConsole() {
  const original = { log: console.log, warn: console.warn }
  console.log = jest.fn()
  console.warn = jest.fn()
  return () => {
    console.log = original.log
    console.warn = original.warn
  }
}

/**
 * Validate theme structure
 */
export function validateThemeStructure(theme: VSCodeTheme): boolean {
  return !!(theme.name && theme.type && theme.colors && theme.tokenColors)
}
