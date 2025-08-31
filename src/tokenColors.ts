import type { Hex } from './types/palette'

type TokenSettings = {
  fontStyle?: string
  foreground?: Hex
  background?: Hex
}

export type TokenColor = {
  name: string
  scope: string | string[]
  settings: TokenSettings
}

export const getTokenColors = (): TokenColor[] => [
  {
    name: 'Italics - Comments, Storage, Keyword Flow, Vue attributes, Decorators',
    scope: [
      'comment',
      'meta.var.expr storage.type',
      'keyword.control.flow',
      'keyword.control.return',
      'meta.directive.vue punctuation.separator.key-value.html',
      'meta.directive.vue entity.other.attribute-name.html',
      'tag.decorator.js entity.name.tag.js',
      'tag.decorator.js punctuation.definition.tag.js',
      'storage.modifier',
    ],
    settings: {
      fontStyle: 'italic',
    },
  },
  {
    name: 'Comment',
    scope: [
      'comment',
      'comment.block.documentation',
      'punctuation.definition.comment',
    ],
    settings: {
      foreground: '#51597d' as Hex,
    },
  },
  {
    name: 'String, Symbols',
    scope: [
      'string',
      'constant.other.symbol',
      'constant.other.key',
      'meta.attribute-selector',
    ],
    settings: {
      foreground: '#9ece6a' as Hex,
    },
  },
  {
    name: 'Number, Boolean, Undefined, Null',
    scope: [
      'variable.other.constant',
      'punctuation.definition.constant',
      'constant.language',
      'constant.numeric',
      'support.constant',
      'constant.other.caps',
    ],
    settings: {
      foreground: '#ff9e64' as Hex,
    },
  },
  {
    name: 'Keyword, Modifier, Control, Operator',
    scope: ['keyword.control', 'keyword.operator', 'keyword.other.unit'],
    settings: {
      foreground: '#bb9af7' as Hex,
    },
  },
  {
    name: 'Storage Type',
    scope: 'storage.type',
    settings: {
      foreground: '#bb9af7' as Hex,
    },
  },
  {
    name: 'Storage - modifier, var, const, let',
    scope: ['meta.var.expr storage.type', 'storage.modifier'],
    settings: {
      foreground: '#9d7cd8' as Hex,
    },
  },
  {
    name: 'Function',
    scope: [
      'entity.name.function',
      'meta.function-call',
      'variable.function',
      'support.function',
      'keyword.other.special-method',
    ],
    settings: {
      foreground: '#7aa2f7' as Hex,
    },
  },
  {
    name: 'Block Level Variables',
    scope: ['meta.block variable.other'],
    settings: {
      foreground: '#c0caf5' as Hex,
    },
  },
  {
    name: 'Other Variable, String Link',
    scope: ['support.other.variable', 'string.other.link'],
    settings: {
      foreground: '#f7768e' as Hex,
    },
  },
  {
    name: 'Operator, Misc',
    scope: [
      'punctuation',
      'meta.tag',
      'punctuation.definition.tag',
      'punctuation.section.embedded',
      'keyword.other.template',
      'keyword.other.substitution',
    ],
    settings: {
      foreground: '#89ddff' as Hex,
    },
  },
  {
    name: 'Tag',
    scope: ['entity.name.tag', 'meta.tag.sgml'],
    settings: {
      foreground: '#f7768e' as Hex,
    },
  },
  {
    name: 'Function Argument, Tag Attribute, Embedded',
    scope: [
      'variable.parameter',
      'keyword.other.type',
      'storage.type.generic.php',
      'meta.function-call.arguments',
    ],
    settings: {
      foreground: '#e0af68' as Hex,
    },
  },
  {
    name: 'Library function',
    scope: ['support.function', 'support.macro'],
    settings: {
      foreground: '#0db9d7' as Hex,
    },
  },
  {
    name: 'Library class/type',
    scope: ['support.type', 'support.class'],
    settings: {
      foreground: '#0db9d7' as Hex,
    },
  },
  {
    name: 'CSS Properties',
    scope: ['support.type.property-name'],
    settings: {
      foreground: '#73daca' as Hex,
    },
  },
  {
    name: 'Invalid',
    scope: ['invalid', 'invalid.illegal'],
    settings: {
      foreground: '#f7768e' as Hex,
    },
  },
  {
    name: 'Invalid deprecated',
    scope: 'invalid.deprecated',
    settings: {
      foreground: '#bb9af7' as Hex,
    },
  },
  {
    name: 'Markup heading',
    scope: ['markup.heading', 'markup.heading entity.name'],
    settings: {
      fontStyle: 'bold',
      foreground: '#89ddff' as Hex,
    },
  },
  {
    name: 'Markup links',
    scope: ['markup.underline.link', 'string.other.link'],
    settings: {
      foreground: '#73daca' as Hex,
    },
  },
  {
    name: 'Markup Italic',
    scope: 'markup.italic',
    settings: {
      fontStyle: 'italic',
      foreground: '#f7768e' as Hex,
    },
  },
  {
    name: 'Markup Bold',
    scope: 'markup.bold',
    settings: {
      fontStyle: 'bold',
      foreground: '#f7768e' as Hex,
    },
  },
]
