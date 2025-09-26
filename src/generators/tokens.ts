/**
 * Генератор токенов подсветки синтаксиса
 * Поддержка как legacy syntax palette, так и новой расширенной палитры
 */
import { richSyntaxPalette, legacySyntaxMapping } from '../core/richSyntax'
import type { TokenColor, SemanticTokenStyle } from '../types/theme'

/**
 * Генерация расширенных tokenColors для современных языков
 */
export const generateTokenColors = (): TokenColor[] => [
  // Комментарии с детализацией
  {
    name: 'Comment - Line',
    scope: ['comment.line', 'punctuation.definition.comment'],
    settings: {
      foreground: richSyntaxPalette.comments.line,
      fontStyle: 'italic',
    },
  },
  {
    name: 'Comment - Block',
    scope: ['comment.block'],
    settings: {
      foreground: richSyntaxPalette.comments.block,
      fontStyle: 'italic',
    },
  },
  {
    name: 'Comment - Documentation',
    scope: ['comment.block.documentation', 'comment.line.documentation'],
    settings: {
      foreground: richSyntaxPalette.comments.doc,
      fontStyle: 'italic',
    },
  },
  {
    name: 'Comment - TODO/FIXME',
    scope: ['comment keyword.codetag'],
    settings: {
      foreground: richSyntaxPalette.comments.todo,
      fontStyle: 'bold',
    },
  },
  {
    name: 'Comment - JSDoc Tags',
    scope: ['storage.type.class.jsdoc', 'entity.name.type.instance.jsdoc'],
    settings: { foreground: richSyntaxPalette.comments.tag },
  },

  // Ключевые слова с группировкой
  {
    name: 'Keyword - Control Flow',
    scope: [
      'keyword.control.flow',
      'keyword.control.conditional',
      'keyword.control.loop',
      'keyword.control.switch',
    ],
    settings: { foreground: richSyntaxPalette.keywords.control },
  },
  {
    name: 'Keyword - Declaration',
    scope: [
      'keyword.control.declare',
      'storage.type',
      'storage.modifier.declare',
      'keyword.other.definitelytyped',
    ],
    settings: { foreground: richSyntaxPalette.keywords.declaration },
  },
  {
    name: 'Keyword - Import/Export',
    scope: [
      'keyword.control.import',
      'keyword.control.export',
      'keyword.control.from',
      'keyword.control.as',
    ],
    settings: { foreground: richSyntaxPalette.keywords.import },
  },
  {
    name: 'Keyword - Type System',
    scope: [
      'keyword.control.type',
      'keyword.interface',
      'keyword.class',
      'keyword.extends',
      'keyword.implements',
    ],
    settings: { foreground: richSyntaxPalette.keywords.type },
  },
  {
    name: 'Keyword - Access Modifiers',
    scope: [
      'storage.modifier.access',
      'storage.modifier.static',
      'storage.modifier.abstract',
      'storage.modifier.readonly',
    ],
    settings: { foreground: richSyntaxPalette.keywords.access },
  },
  {
    name: 'Keyword - Async/Await',
    scope: [
      'storage.modifier.async',
      'keyword.control.flow.await',
      'keyword.other.await',
    ],
    settings: { foreground: richSyntaxPalette.keywords.async },
  },

  // Литералы с типизацией
  {
    name: 'String Literal',
    scope: ['string.quoted', 'string.interpolated'],
    settings: { foreground: richSyntaxPalette.literals.string },
  },
  {
    name: 'Template String',
    scope: ['string.template', 'string.quasi'],
    settings: { foreground: richSyntaxPalette.literals.template },
  },
  {
    name: 'Template Expression',
    scope: [
      'meta.embedded.expression',
      'punctuation.definition.template-expression',
    ],
    settings: { foreground: richSyntaxPalette.literals.template },
  },
  {
    name: 'Number Literal',
    scope: ['constant.numeric'],
    settings: { foreground: richSyntaxPalette.literals.number },
  },
  {
    name: 'Boolean Literal',
    scope: ['constant.language.boolean'],
    settings: { foreground: richSyntaxPalette.literals.boolean },
  },
  {
    name: 'Null/Undefined Literal',
    scope: ['constant.language.null', 'constant.language.undefined'],
    settings: { foreground: richSyntaxPalette.literals.null },
  },
  {
    name: 'Regular Expression',
    scope: ['string.regexp'],
    settings: { foreground: richSyntaxPalette.literals.regex },
  },

  // Идентификаторы с контекстом
  {
    name: 'Variable',
    scope: ['variable.other', 'variable.language'],
    settings: { foreground: richSyntaxPalette.identifiers.variable },
  },
  {
    name: 'Function Parameter',
    scope: ['variable.parameter', 'meta.parameters variable'],
    settings: { foreground: richSyntaxPalette.identifiers.parameter },
  },
  {
    name: 'Object Property',
    scope: ['variable.other.property', 'meta.object-literal.key'],
    settings: { foreground: richSyntaxPalette.identifiers.property },
  },
  {
    name: 'Method Call',
    scope: ['variable.function', 'entity.name.function.member'],
    settings: { foreground: richSyntaxPalette.identifiers.method },
  },
  {
    name: 'Function Declaration',
    scope: ['entity.name.function', 'meta.function-call entity.name.function'],
    settings: { foreground: richSyntaxPalette.identifiers.function },
  },
  {
    name: 'Class Name',
    scope: ['entity.name.class', 'entity.name.type.class'],
    settings: { foreground: richSyntaxPalette.identifiers.class },
  },
  {
    name: 'Interface Name',
    scope: ['entity.name.type.interface'],
    settings: { foreground: richSyntaxPalette.identifiers.interface },
  },
  {
    name: 'Enum Name',
    scope: ['entity.name.type.enum'],
    settings: { foreground: richSyntaxPalette.identifiers.enum },
  },
  {
    name: 'Namespace',
    scope: ['entity.name.namespace', 'entity.name.type.module'],
    settings: { foreground: richSyntaxPalette.identifiers.namespace },
  },

  // Типы данных
  {
    name: 'Primitive Type',
    scope: ['support.type.primitive', 'keyword.type'],
    settings: { foreground: richSyntaxPalette.types.primitive },
  },
  {
    name: 'Generic Type Parameter',
    scope: ['entity.name.type.parameter'],
    settings: { foreground: richSyntaxPalette.types.generic },
  },
  {
    name: 'Union Type Operator',
    scope: ['keyword.operator.type.union'],
    settings: { foreground: richSyntaxPalette.types.union },
  },
  {
    name: 'Built-in Type',
    scope: ['support.type.builtin'],
    settings: { foreground: richSyntaxPalette.types.builtin },
  },
  {
    name: 'Custom Type',
    scope: ['entity.name.type'],
    settings: { foreground: richSyntaxPalette.types.custom },
  },

  // Операторы с группировкой
  {
    name: 'Arithmetic Operator',
    scope: ['keyword.operator.arithmetic'],
    settings: { foreground: richSyntaxPalette.operators.arithmetic },
  },
  {
    name: 'Comparison Operator',
    scope: ['keyword.operator.comparison', 'keyword.operator.relational'],
    settings: { foreground: richSyntaxPalette.operators.comparison },
  },
  {
    name: 'Logical Operator',
    scope: ['keyword.operator.logical'],
    settings: { foreground: richSyntaxPalette.operators.logical },
  },
  {
    name: 'Assignment Operator',
    scope: ['keyword.operator.assignment'],
    settings: { foreground: richSyntaxPalette.operators.assignment },
  },
  {
    name: 'Ternary Operator',
    scope: ['keyword.operator.ternary'],
    settings: { foreground: richSyntaxPalette.operators.ternary },
  },
  {
    name: 'Spread Operator',
    scope: ['keyword.operator.spread', 'keyword.operator.rest'],
    settings: { foreground: richSyntaxPalette.operators.spread },
  },

  // Современные языковые возможности
  {
    name: 'Decorator',
    scope: ['entity.name.function.decorator', 'punctuation.decorator'],
    settings: { foreground: richSyntaxPalette.modern.decorator },
  },
  {
    name: 'Annotation',
    scope: ['storage.type.annotation'],
    settings: { foreground: richSyntaxPalette.modern.annotation },
  },
  {
    name: 'Attribute',
    scope: ['entity.other.attribute-name.attribute'],
    settings: { foreground: richSyntaxPalette.modern.attribute },
  },
  {
    name: 'Pragma/Directive',
    scope: ['meta.preprocessor', 'keyword.other.directive'],
    settings: { foreground: richSyntaxPalette.modern.pragma },
  },

  // Разметка (HTML/Markdown)
  {
    name: 'HTML Tag',
    scope: ['entity.name.tag'],
    settings: { foreground: richSyntaxPalette.markup.tag },
  },
  {
    name: 'HTML Attribute',
    scope: ['entity.other.attribute-name'],
    settings: { foreground: richSyntaxPalette.markup.attribute },
  },
  {
    name: 'Markdown Heading',
    scope: ['markup.heading', 'entity.name.section.markdown'],
    settings: {
      foreground: richSyntaxPalette.markup.heading,
      fontStyle: 'bold',
    },
  },
  {
    name: 'Markdown Emphasis',
    scope: ['markup.italic', 'markup.bold'],
    settings: { foreground: richSyntaxPalette.markup.emphasis },
  },
  {
    name: 'Markdown Link',
    scope: ['markup.underline.link', 'string.other.link'],
    settings: { foreground: richSyntaxPalette.markup.link },
  },
  {
    name: 'Markdown Code',
    scope: ['markup.inline.raw', 'markup.fenced_code'],
    settings: { foreground: richSyntaxPalette.markup.code },
  },

  // Пунктуация с детализацией
  {
    name: 'Bracket',
    scope: ['punctuation.section.group', 'punctuation.section.brackets'],
    settings: { foreground: richSyntaxPalette.punctuation.bracket },
  },
  {
    name: 'Delimiter',
    scope: ['punctuation.separator', 'punctuation.terminator'],
    settings: { foreground: richSyntaxPalette.punctuation.delimiter },
  },
  {
    name: 'Accessor',
    scope: ['punctuation.accessor', 'punctuation.separator.method'],
    settings: { foreground: richSyntaxPalette.punctuation.accessor },
  },

  // Состояния и диагностика
  {
    name: 'Invalid Code',
    scope: ['invalid', 'invalid.illegal'],
    settings: { foreground: richSyntaxPalette.states.error },
  },
  {
    name: 'Deprecated Code',
    scope: ['invalid.deprecated'],
    settings: {
      foreground: richSyntaxPalette.states.deprecated,
      fontStyle: 'strikethrough',
    },
  },

  // Обратная совместимость - fallback правила
  {
    name: 'Legacy Keyword',
    scope: ['keyword'],
    settings: { foreground: legacySyntaxMapping.keyword },
  },
  {
    name: 'Legacy String',
    scope: ['string'],
    settings: { foreground: legacySyntaxMapping.string },
  },
  {
    name: 'Legacy Operator',
    scope: ['keyword.operator'],
    settings: { foreground: legacySyntaxMapping.operator },
  },
]

/**
 * Генерация расширенных семантических токенов
 */
export const generateSemanticTokens = (): Record<
  string,
  SemanticTokenStyle
> => ({
  // Переменные с ролями
  variable: { foreground: richSyntaxPalette.identifiers.variable },
  'variable.readonly': { foreground: richSyntaxPalette.literals.boolean },
  'variable.defaultLibrary': { foreground: richSyntaxPalette.types.builtin },
  'variable.declaration': {
    foreground: richSyntaxPalette.identifiers.variable,
  },

  // Функции и методы
  function: { foreground: richSyntaxPalette.identifiers.function },
  'function.declaration': {
    foreground: richSyntaxPalette.identifiers.function,
  },
  'function.defaultLibrary': { foreground: richSyntaxPalette.types.builtin },
  method: { foreground: richSyntaxPalette.identifiers.method },
  'method.declaration': { foreground: richSyntaxPalette.identifiers.method },

  // Типы и классы
  class: { foreground: richSyntaxPalette.identifiers.class },
  'class.declaration': { foreground: richSyntaxPalette.identifiers.class },
  'class.defaultLibrary': { foreground: richSyntaxPalette.types.builtin },
  interface: { foreground: richSyntaxPalette.identifiers.interface },
  type: { foreground: richSyntaxPalette.types.custom },
  typeParameter: { foreground: richSyntaxPalette.types.generic },
  enum: { foreground: richSyntaxPalette.identifiers.enum },
  enumMember: { foreground: richSyntaxPalette.identifiers.property },

  // Свойства и параметры
  property: { foreground: richSyntaxPalette.identifiers.property },
  'property.declaration': {
    foreground: richSyntaxPalette.identifiers.property,
  },
  'property.readonly': { foreground: richSyntaxPalette.identifiers.property },
  parameter: { foreground: richSyntaxPalette.identifiers.parameter },
  'parameter.declaration': {
    foreground: richSyntaxPalette.identifiers.parameter,
  },

  // Пространства имен и модули
  namespace: { foreground: richSyntaxPalette.identifiers.namespace },
  module: { foreground: richSyntaxPalette.identifiers.namespace },

  // Макросы и атрибуты
  macro: { foreground: richSyntaxPalette.modern.macro },
  decorator: { foreground: richSyntaxPalette.modern.decorator },
  attribute: { foreground: richSyntaxPalette.modern.attribute },

  // Состояния
  deprecated: {
    foreground: richSyntaxPalette.states.deprecated,
    strikethrough: true,
  },
  unused: {
    foreground: richSyntaxPalette.states.unused,
  },

  // Комментарии
  comment: {
    foreground: richSyntaxPalette.comments.line,
    italic: true,
  },

  // Строки и числа
  string: { foreground: richSyntaxPalette.literals.string },
  number: { foreground: richSyntaxPalette.literals.number },
  regexp: { foreground: richSyntaxPalette.literals.regex },

  // Ключевые слова
  keyword: { foreground: richSyntaxPalette.keywords.control },
  operator: { foreground: richSyntaxPalette.operators.arithmetic },
})
