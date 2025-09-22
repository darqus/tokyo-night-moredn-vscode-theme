/**
 * Test utilities for theme generation
 */

import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import type { VSCodeTheme } from '../../src/types/theme'

/**
 * Generate theme with default test configuration
 */
export function generateTestTheme(): VSCodeTheme {
  const defaultConfig = loadEnvVars()
  return generateTheme(defaultConfig)
}

/**
 * Get default theme config for tests
 */
export function getTestConfig() {
  return loadEnvVars()
}
