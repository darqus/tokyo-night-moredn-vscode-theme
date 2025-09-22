/**
 * Тесты для валидации токенов
 */

import {
  isValidToken,
  isValidSurface,
  validateColorMapping,
  validateThemeConstraints,
  createValidatedMapping,
  defaultThemeConstraints,
} from '../../src/types/validation'

describe('Token Validation', () => {
  test('should validate known VS Code tokens', () => {
    expect(isValidToken('editor.background')).toBe(true)
    expect(isValidToken('editor.foreground')).toBe(true)
    expect(isValidToken('sideBar.background')).toBe(true)
    expect(isValidToken('statusBar.background')).toBe(true)

    expect(isValidToken('invalid.token')).toBe(false)
    expect(isValidToken('unknown.element')).toBe(false)
  })

  test('should validate known surface types', () => {
    expect(isValidSurface('base')).toBe(true)
    expect(isValidSurface('elevated')).toBe(true)
    expect(isValidSurface('overlay')).toBe(true)
    expect(isValidSurface('editor')).toBe(true)
    expect(isValidSurface('terminal')).toBe(true)
    expect(isValidSurface('panel')).toBe(true)
    expect(isValidSurface('hover')).toBe(true)
    expect(isValidSurface('selection')).toBe(true)

    expect(isValidSurface('invalid-surface')).toBe(false)
    expect(isValidSurface('unknown')).toBe(false)
  })

  test('should validate color mappings correctly', () => {
    const validMapping = {
      foreground: '#c0caf5',
      'editor.background': '#1a1b26',
      'editor.foreground': '#c0caf5',
      'sideBar.background': '#16161e',
      'activityBar.background': '#16161e',
      'statusBar.background': '#16161e',
      'panel.background': '#1a1b26',
    }

    const result = validateColorMapping(validMapping)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test('should detect invalid color formats', () => {
    const invalidMapping = {
      foreground: '#c0caf5',
      'editor.background': 'not-a-color',
      'editor.foreground': 'blue',
      'sideBar.background': '#invalidhex',
      'activityBar.background': '#16161e',
      'statusBar.background': '#16161e',
      'panel.background': '#1a1b26',
    }

    const result = validateColorMapping(invalidMapping)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should detect missing essential tokens', () => {
    const incompleteMapping = {
      'editor.background': '#1a1b26',
      // Missing other essential tokens
    }

    const result = validateColorMapping(incompleteMapping)
    expect(result.isValid).toBe(false)
    expect(
      result.errors.some((error: string) =>
        error.includes('Missing essential token')
      )
    ).toBe(true)
  })

  test('should validate theme constraints', () => {
    const validMapping = {
      foreground: '#c0caf5',
      'editor.background': '#1a1b26',
      'editor.foreground': '#c0caf5',
      'sideBar.background': '#16161e',
      'activityBar.background': '#16161e',
      'statusBar.background': '#16161e',
      'panel.background': '#1a1b26',
    }

    const result = validateThemeConstraints(
      validMapping,
      defaultThemeConstraints
    )
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test('should detect constraint violations', () => {
    const invalidMapping = {
      foreground: 'rgb(192, 202, 245)', // RGB format not allowed
      'editor.background': '#1a1b26',
      // Missing required tokens
    }

    const customConstraints = {
      ...defaultThemeConstraints,
      allowedFormats: ['hex' as const], // Only hex allowed
    }

    const result = validateThemeConstraints(invalidMapping, customConstraints)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should work with validated mapping builder', () => {
    const builder = createValidatedMapping()
      .set('editor.background', '#1a1b26')
      .set('editor.foreground', '#c0caf5')
      .set('sideBar.background', '#16161e')

    const mapping = builder.build()
    expect(mapping['editor.background']).toBe('#1a1b26')
    expect(mapping['editor.foreground']).toBe('#c0caf5')

    const validation = builder.validate()
    expect(validation.warnings).toHaveLength(0) // No unknown tokens
  })

  test('should provide meaningful error messages', () => {
    const invalidMapping = {
      foreground: '#c0caf5', // Required token
      'editor.background': 'invalid-color',
    }

    const result = validateColorMapping(invalidMapping)
    expect(
      result.errors.some((error: string) =>
        error.includes('Invalid color format')
      )
    ).toBe(true)
    expect(
      result.errors.some((error: string) => error.includes('editor.background'))
    ).toBe(true)
  })

  test('should handle rgba colors correctly', () => {
    const rgbaMapping = {
      foreground: '#c0caf5',
      'editor.background': '#1a1b26',
      'editor.foreground': '#c0caf5',
      'sideBar.background': '#16161e',
      'activityBar.background': '#16161e',
      'statusBar.background': '#16161e',
      'panel.background': '#1a1b26',
      'list.inactiveSelectionBackground': '#3b4261cc', // With alpha
    }

    const constraints = {
      ...defaultThemeConstraints,
      allowedFormats: ['hex' as const, 'rgba' as const],
    }

    const result = validateThemeConstraints(rgbaMapping, constraints)
    expect(result.isValid).toBe(true)
  })

  test('should handle surface rules validation', () => {
    const mapping = {
      foreground: '#c0caf5',
      'editor.background': '#1a1b26',
      'editor.foreground': '#c0caf5',
      'sideBar.background': '#16161e',
      'activityBar.background': '#16161e',
      'statusBar.background': '#16161e',
      'panel.background': '#1a1b26',
      // Missing some surface-specific tokens
    }

    const result = validateThemeConstraints(mapping, defaultThemeConstraints)

    // Should validate basic requirements
    expect(result.isValid).toBe(true)
  })
})
