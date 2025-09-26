/**
 * Base test class with common utilities
 */

import type { VSCodeTheme } from '../../src/types/theme'
import type { MockConsole, ValidationResult } from '../types/test.types'

export abstract class BaseTest {
  protected mockConsole: MockConsole | null = null

  protected setupConsole(): void {
    this.mockConsole = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    }
    console.log = this.mockConsole.log
    console.warn = this.mockConsole.warn
    console.error = this.mockConsole.error
  }

  protected restoreConsole(): void {
    if (this.mockConsole) {
      jest.restoreAllMocks()
      this.mockConsole = null
    }
  }

  protected validateHexColor(color: string): boolean {
    return /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(color)
  }

  protected validateTheme(theme: VSCodeTheme): ValidationResult {
    const errors: string[] = []

    if (!theme.name) errors.push('Theme name is required')
    if (!theme.type) errors.push('Theme type is required')
    if (!theme.colors) errors.push('Theme colors are required')
    if (!theme.tokenColors) errors.push('Theme tokenColors are required')

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  protected expectValidTheme(theme: VSCodeTheme): void {
    const validation = this.validateTheme(theme)
    expect(validation.isValid).toBe(true)
    if (!validation.isValid) {
      throw new Error(`Invalid theme: ${validation.errors.join(', ')}`)
    }
  }
}