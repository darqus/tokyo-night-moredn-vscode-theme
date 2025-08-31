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
// Соответствует оригинальной Tokyo Night теме
const tokenMappings: { style: SemanticTokenStyle; selectors: string[] }[] = [
  // Числа, константы, параметры - розоватый (#d081b7 в оригинале)
  {
    style: { foreground: '#d081b7' as Hex },
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
    style: { foreground: '#d081b7' as Hex, bold: true },
    selectors: ['constant.readonly'],
  },

  // Свойства, интерфейсы - светло-бирюзовый (#76d7d7 в оригинале)
  {
    style: { foreground: '#76d7d7' as Hex },
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

  // Переменные, импорты - голубой (#7dcfff в оригинале)
  {
    style: { foreground: '#7dcfff' as Hex },
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

  // Ключевые слова, операторы - фиолетовый (#bb9af7 в оригинале)
  {
    style: { foreground: '#bb9af7' as Hex },
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
    style: { foreground: '#bb9af7' as Hex, bold: true },
    selectors: ['variable.static', 'keyword.control'],
  },

  // Функции, методы - синий (#7aa2f7 в оригинале)
  {
    style: { foreground: '#7aa2f7' as Hex },
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
    style: { foreground: '#7aa2f7' as Hex, bold: true },
    selectors: ['method.static', 'heading:markdown', 'strong:markdown'],
  },

  // Классы, типы - светло-фиолетовый (#8c8fe8 в оригинале)
  {
    style: { foreground: '#8c8fe8' as Hex },
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

  // Макросы, HTML теги - красный (#e46876 в оригинале)
  {
    style: { foreground: '#e46876' as Hex },
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
    style: { foreground: '#e46876' as Hex, bold: true },
    selectors: ['macro.declaration', 'selfKeyword:rust'],
  },

  // Основные токены - серый (#bababc в оригинале)
  {
    style: { foreground: '#bababc' as Hex },
    selectors: ['parameter', 'punctuation.delimiter'],
  },

  // Комментарии - темно-серый (#4d4f55 в оригинале)
  {
    style: { foreground: '#4d4f55' as Hex },
    selectors: ['comment'],
  },
  {
    style: { foreground: '#4d4f55' as Hex, italic: true },
    selectors: ['comment.documentation'],
  },
  {
    style: { foreground: '#7aa2f7' as Hex, italic: true },
    selectors: ['comment.keyword'],
  },

  // Ошибки и предупреждения
  {
    style: { foreground: '#d76c88' as Hex, underline: true },
    selectors: ['error'],
  },
  {
    style: { foreground: '#7cc7fe' as Hex, underline: true },
    selectors: ['warning'],
  },
  {
    style: { foreground: '#a4a5a7' as Hex, strikethrough: true },
    selectors: ['deprecated'],
  },

  // Строки - зеленый (#9ece6a в оригинале)
  {
    style: { foreground: '#9ece6a' as Hex },
    selectors: ['string', 'string:json'],
  },

  // Пунктуация - серый
  {
    style: { foreground: '#bababc' as Hex },
    selectors: ['punctuation'],
  },

  // Выделения в markdown - курсив голубой
  {
    style: { foreground: '#7dcfff' as Hex, italic: true },
    selectors: ['emphasis:markdown'],
  },

  // Скобки разных типов (как в оригинале)
  {
    style: { foreground: '#b493ef' as Hex },
    selectors: ['punctuation.bracket', 'punctuation.bracket.curly'],
  },
  {
    style: { foreground: '#7dc8fe' as Hex },
    selectors: ['punctuation.bracket.round'],
  },
  {
    style: { foreground: '#76d7d7' as Hex },
    selectors: ['punctuation.bracket.square'],
  },
  {
    style: { foreground: '#7bb2fa' as Hex },
    selectors: ['punctuation.bracket.angle'],
  },

  // Пунктуация разных типов (как в оригинале)
  {
    style: { foreground: '#7cbbfb' as Hex },
    selectors: ['punctuation.separator', 'punctuation.separator.comma'],
  },
  {
    style: { foreground: '#7badf9' as Hex },
    selectors: ['punctuation.separator.dot'],
  },
  {
    style: { foreground: '#76d7da' as Hex },
    selectors: ['punctuation.separator.colon'],
  },
  {
    style: { foreground: '#a584e0' as Hex },
    selectors: ['punctuation.separator.semicolon'],
  },
  {
    style: { foreground: '#77d6df' as Hex },
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
