import type { Hex } from './types/palette'
import { palette } from './palette'

export type SemanticTokenStyle = {
  foreground?: Hex
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
}

// Группировка селекторов по стилям для устранения дублирования
const tokenMappings: { style: SemanticTokenStyle; selectors: string[] }[] = [
  // Акцентные цвета
  {
    style: { foreground: palette.accent.yellow },
    selectors: [
      'parameter.declaration',
      'enum.declaration',
      'enumMember:typescript',
      'lifetime:rust',
      'regexp.characterClass',
      'formatSpecifier',
      'number',
      'number:json',
      'constant',
    ],
  },
  {
    style: { foreground: palette.accent.yellow, bold: true },
    selectors: ['constant.readonly'],
  },
  {
    style: { foreground: palette.accent.teal },
    selectors: [
      'property.declaration',
      'interface.declaration',
      'typeParameter',
      'generic:rust',
      'trait:rust',
      'interface:typescript',
      'interface:go',
      'template:cpp',
      'interface:java',
      'interface:csharp',
      'variable:scss',
      'link:markdown',
      'reference',
    ],
  },
  {
    style: { foreground: palette.accent.cyan },
    selectors: [
      'property.defaultLibrary',
      '*.defaultLibrary',
      'variable.defaultLibrary',
      'variable',
      'variable.readonly',
      'variable.mutable',
      'variable.local',
      'namespace.declaration',
      'module',
      'package:go',
      'namespace:cpp',
      'package:java',
      'namespace:csharp',
      'anchor:yaml',
      'alias:yaml',
      'keyword.modifier',
      'regexp.escape',
      'escapeSequence',
      'parameter.type',
      'argument',
      'codeBlock:markdown',
    ],
  },
  {
    style: { foreground: palette.accent.magenta },
    selectors: [
      'variable.declaration',
      'function.async',
      'attribute:rust',
      'magicFunction:python',
      'id:css',
      'pseudoClass:css',
      'pseudoElement:css',
      'mixin:scss',
      'code:markdown',
      'boolean',
      'null',
      'undefined',
      'operator',
      'keyword',
      'keyword.operator',
      'punctuation.special',
      'attribute:html',
    ],
  },
  {
    style: { foreground: palette.accent.magenta, bold: true },
    selectors: ['variable.static', 'keyword.control'],
  },
  {
    style: { foreground: palette.accent.blue },
    selectors: [
      'function.declaration',
      'method.declaration',
      'namespace',
      'decorator:python',
      'decorator:typescript',
      'annotation:java',
      'attribute:csharp',
      'property:json',
      'property:css',
      'property:yaml',
      'keyword.type',
      'decorator',
      'annotation',
      'label',
      'class:css',
    ],
  },
  {
    style: { foreground: palette.accent.blue, bold: true },
    selectors: ['method.static', 'heading:markdown', 'strong:markdown'],
  },
  {
    style: { foreground: palette.accent.orange },
    selectors: [
      'class.declaration',
      'type.declaration',
      'struct',
      'union:rust',
      'type:typescript',
      'type:go',
      'struct:go',
      'class:cpp',
      'class:java',
      'class:csharp',
    ],
  },
  {
    style: { foreground: palette.accent.red },
    selectors: [
      'variable.global',
      'macro',
      'selfParameter:python',
      'clsParameter:python',
      'tag:html',
      'element:xml',
      'regexp',
    ],
  },
  {
    style: { foreground: palette.accent.red, bold: true },
    selectors: ['macro.declaration', 'selfKeyword:rust'],
  },
  // Основные токены
  {
    style: { foreground: palette.fg.muted },
    selectors: ['parameter', 'punctuation.delimiter'],
  },
  {
    style: { foreground: palette.token.comment },
    selectors: ['comment'],
  },
  {
    style: { foreground: palette.token.comment, italic: true },
    selectors: ['comment.documentation'],
  },
  {
    style: { foreground: palette.accent.blue, italic: true },
    selectors: ['comment.keyword'],
  },
  {
    style: { foreground: palette.token.error, underline: true },
    selectors: ['error'],
  },
  {
    style: { foreground: palette.token.warning, underline: true },
    selectors: ['warning'],
  },
  {
    style: { foreground: palette.fg.inactive, strikethrough: true },
    selectors: ['deprecated'],
  },
  {
    style: { foreground: palette.token.string },
    selectors: ['string', 'string:json'],
  },
  {
    style: { foreground: palette.token.operator },
    selectors: ['punctuation'],
  },
  {
    style: { foreground: palette.accent.cyan, italic: true },
    selectors: ['emphasis:markdown'],
  },
  // Скобки и пунктуация
  {
    style: { foreground: palette.brackets.curly },
    selectors: ['punctuation.bracket', 'punctuation.bracket.curly'],
  },
  {
    style: { foreground: palette.brackets.round },
    selectors: ['punctuation.bracket.round'],
  },
  {
    style: { foreground: palette.brackets.square },
    selectors: ['punctuation.bracket.square'],
  },
  {
    style: { foreground: palette.brackets.angle },
    selectors: ['punctuation.bracket.angle'],
  },
  {
    style: { foreground: palette.punctuation.comma },
    selectors: ['punctuation.separator', 'punctuation.separator.comma'],
  },
  {
    style: { foreground: palette.punctuation.dot },
    selectors: ['punctuation.separator.dot'],
  },
  {
    style: { foreground: palette.punctuation.colon },
    selectors: ['punctuation.separator.colon'],
  },
  {
    style: { foreground: palette.punctuation.semicolon },
    selectors: ['punctuation.separator.semicolon'],
  },
  {
    style: { foreground: palette.punctuation.operator },
    selectors: ['punctuation.operator'],
  },
]

// Генерация финального объекта semanticTokenColors
export const semanticTokenColors: Record<string, SemanticTokenStyle> = {}
for (const { style, selectors } of tokenMappings) {
  for (const selector of selectors) {
    semanticTokenColors[selector] = style
  }
}
