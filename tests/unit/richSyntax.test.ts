/**
 * Тесты для расширенной синтаксической палитры
 */

import {
  richSyntaxPalette,
  legacySyntaxMapping,
} from '../../src/core/richSyntax'

describe('RichSyntaxPalette', () => {
  test('should have all required keyword groups', () => {
    expect(richSyntaxPalette.keywords).toBeDefined()
    expect(richSyntaxPalette.keywords.control).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.keywords.declaration).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.keywords.import).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.keywords.type).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.keywords.access).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.keywords.async).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should have all required literal types', () => {
    expect(richSyntaxPalette.literals).toBeDefined()
    expect(richSyntaxPalette.literals.string).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.literals.number).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.literals.boolean).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.literals.null).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.literals.regex).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.literals.template).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should have modern language features', () => {
    expect(richSyntaxPalette.modern).toBeDefined()
    expect(richSyntaxPalette.modern.decorator).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.modern.annotation).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.modern.attribute).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should have identifiers with context', () => {
    expect(richSyntaxPalette.identifiers).toBeDefined()
    expect(richSyntaxPalette.identifiers.variable).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.identifiers.function).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.identifiers.class).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.identifiers.interface).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should have comprehensive comment system', () => {
    expect(richSyntaxPalette.comments).toBeDefined()
    expect(richSyntaxPalette.comments.line).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.comments.block).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.comments.doc).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.comments.todo).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(richSyntaxPalette.comments.tag).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should provide legacy syntax mapping', () => {
    expect(legacySyntaxMapping).toBeDefined()
    expect(legacySyntaxMapping.keyword).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(legacySyntaxMapping.string).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(legacySyntaxMapping.number).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(legacySyntaxMapping.comment).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should have distinct colors for different categories', () => {
    // Keywords должны отличаться
    expect(richSyntaxPalette.keywords.control).not.toBe(
      richSyntaxPalette.keywords.declaration
    )
    expect(richSyntaxPalette.keywords.import).not.toBe(
      richSyntaxPalette.keywords.type
    )

    // Literals должны отличаться
    expect(richSyntaxPalette.literals.string).not.toBe(
      richSyntaxPalette.literals.number
    )
    expect(richSyntaxPalette.literals.boolean).not.toBe(
      richSyntaxPalette.literals.null
    )

    // Comments должны отличаться
    expect(richSyntaxPalette.comments.line).not.toBe(
      richSyntaxPalette.comments.todo
    )
  })
})
