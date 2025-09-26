/**
 * Common types for tests
 */

export interface MockConsole {
  log: jest.MockedFunction<typeof console.log>
  warn: jest.MockedFunction<typeof console.warn>
  error: jest.MockedFunction<typeof console.error>
}

export interface TestThemeConfig {
  name: string
  displayName: string
  type: 'dark' | 'light'
  overrides?: Record<string, string>
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

export interface ColorTestCase {
  input: string
  expected: string
  description: string
}

export interface ContrastTestCase {
  foreground: string
  background: string
  expectedRatio: number
  tolerance?: number
}