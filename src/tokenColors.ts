import type { Hex } from './types/palette'
import { palette } from './palette/index'

export type TokenColor = {
  name: string
  scope: string | string[]
  settings: {
    fontStyle?: string
    foreground?: Hex
    background?: Hex
  }
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
    name: 'Fix YAML block scalar',
    scope: 'keyword.control.flow.block-scalar.literal',
    settings: {
      fontStyle: '',
    },
  },
  {
    name: 'Comment',
    scope: [
      'comment',
      'comment.block.documentation',
      'punctuation.definition.comment',
      'comment.block.documentation punctuation',
    ],
    settings: {
      foreground: palette.token.ignored,
    },
  },
  {
    name: 'Comment Doc',
    scope: [
      'comment.block.documentation variable',
      'comment.block.documentation storage',
      'comment.block.documentation keyword',
      'comment.block.documentation support',
      'comment.block.documentation markup',
      'comment.block.documentation markup.inline.raw.string.markdown',
      'meta.other.type.phpdoc.php keyword.other.type.php',
      'meta.other.type.phpdoc.php support.other.namespace.php',
      'meta.other.type.phpdoc.php punctuation.separator.inheritance.php',
      'meta.other.type.phpdoc.php support.class',
      'keyword.other.phpdoc.php',
      'log.date',
    ],
    settings: {
      foreground: palette.token.commentDoc,
    },
  },
  {
    name: 'Comment Doc Emphasized',
    scope: [
      'meta.other.type.phpdoc.php support.class',
      'comment.block.documentation storage.type',
      'comment.block.documentation punctuation.definition.block.tag',
      'comment.block.documentation entity.name.type.instance',
    ],
    settings: {
      foreground: palette.token.commentDocEmphasized,
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
    ],
    settings: {
      foreground: palette.token.number,
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
      fontStyle: '',
      foreground: palette.token.string,
    },
  },
  {
    name: 'Colors',
    scope: [
      'constant.other.color',
      'constant.other.color.rgb-value.hex punctuation.definition.constant',
    ],
    settings: {
      foreground: palette.token.constant,
    },
  },
  {
    name: 'Invalid',
    scope: ['invalid', 'invalid.illegal'],
    settings: {
      foreground: palette.token.invalid,
    },
  },
  {
    name: 'Invalid deprecated',
    scope: 'invalid.deprecated',
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Storage Type',
    scope: 'storage.type',
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Storage - modifier, var, const, let',
    scope: ['meta.var.expr storage.type', 'storage.modifier'],
    settings: {
      foreground: palette.accent.purple,
    },
  },
  {
    name: 'Interpolation, PHP tags, Smarty tags',
    scope: [
      'punctuation.definition.template-expression',
      'punctuation.section.embedded',
      'meta.embedded.line.tag.smarty',
      'support.constant.handlebars',
      'punctuation.section.tag.twig',
    ],
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Blade, Twig, Smarty Handlebars keywords',
    scope: [
      'keyword.control.smarty',
      'keyword.control.twig',
      'support.constant.handlebars keyword.control',
      'keyword.operator.comparison.twig',
      'keyword.blade',
      'entity.name.function.blade',
    ],
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'Spread',
    scope: ['keyword.operator.spread', 'keyword.operator.rest'],
    settings: {
      foreground: palette.token.spread,
      fontStyle: 'bold',
    },
  },
  {
    name: 'Round Brackets ()',
    scope: [
      'punctuation.section.parens.begin',
      'punctuation.section.parens.end',
      'punctuation.section.group.begin',
      'punctuation.section.group.end',
    ],
    settings: {
      foreground: palette.brackets.round,
    },
  },
  {
    name: 'Square Brackets []',
    scope: [
      'punctuation.section.brackets.begin',
      'punctuation.section.brackets.end',
      'punctuation.section.array.begin',
      'punctuation.section.array.end',
    ],
    settings: {
      foreground: palette.brackets.square,
    },
  },
  {
    name: 'Curly Brackets {}',
    scope: [
      'punctuation.section.braces.begin',
      'punctuation.section.braces.end',
      'punctuation.section.object.begin',
      'punctuation.section.object.end',
      'punctuation.definition.block',
      'punctuation.definition.switch-expression.begin.bracket',
      'punctuation.definition.switch-expression.end.bracket',
      'punctuation.definition.section.switch-block.begin.bracket',
      'punctuation.definition.section.switch-block.end.bracket',
    ],
    settings: {
      foreground: palette.brackets.curly,
    },
  },
  {
    name: 'Angle Brackets <>',
    scope: [
      'punctuation.definition.generic.begin',
      'punctuation.definition.generic.end',
      'punctuation.definition.type.begin',
      'punctuation.definition.type.end',
      'punctuation.definition.tag',
      'punctuation.definition.arguments',
      'punctuation.definition.parameters',
      'punctuation.definition.dictionary',
      'punctuation.definition.array',
    ],
    settings: {
      foreground: palette.brackets.angle,
    },
  },
  {
    name: 'Commas',
    scope: [
      'punctuation.separator.comma',
      'punctuation.separator.list',
      'punctuation.separator.sequence',
    ],
    settings: {
      foreground: palette.punctuation.comma,
    },
  },
  {
    name: 'Dots',
    scope: [
      'punctuation.separator.dot',
      'punctuation.accessor.dot',
      'punctuation.separator.period',
    ],
    settings: {
      foreground: palette.punctuation.dot,
    },
  },
  {
    name: 'Colons',
    scope: [
      'punctuation.separator.colon',
      'punctuation.separator.key-value',
      'punctuation.separator.type',
    ],
    settings: {
      foreground: palette.punctuation.colon,
    },
  },
  {
    name: 'Semicolons',
    scope: [
      'punctuation.terminator.statement',
      'punctuation.separator.statement',
      'punctuation.terminator.rule',
    ],
    settings: {
      foreground: palette.punctuation.semicolon,
    },
  },
  {
    name: 'Operators',
    scope: [
      'keyword.operator',
      'keyword.control.as',
      'keyword.other',
      'keyword.operator.bitwise.shift',
      'keyword.other.template',
      'keyword.other.substitution',
      'entity.name.operator',
    ],
    settings: {
      foreground: palette.punctuation.operator,
    },
  },
  {
    name: 'Other Punctuation',
    scope: [
      'text.html.twig meta.tag.inline.any.html',
      'meta.tag.template.value.twig meta.function.arguments.twig',
      'meta.directive.vue punctuation.separator.key-value.html',
      'punctuation.definition.constant.markdown',
      'punctuation.definition.string',
      'punctuation.support.type.property-name',
      'text.html.vue-html meta.tag',
      'punctuation.definition.keyword',
      'punctuation.definition.entity',
      'punctuation.separator.inheritance.php',
      'meta.property-list punctuation.separator.key-value',
      'meta.at-rule.mixin punctuation.separator.key-value',
      'meta.at-rule.function variable.parameter.url',
    ],
    settings: {
      foreground: palette.token.operator,
    },
  },
  {
    name: 'Import, Export, From, Default',
    scope: [
      'keyword.control.import',
      'keyword.control.export',
      'keyword.control.from',
      'keyword.control.default',
      'meta.import keyword.other',
    ],
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Keyword',
    scope: ['keyword', 'keyword.control', 'keyword.other.important'],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Keyword SQL',
    scope: 'keyword.other.DML',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Keyword Operator Logical, Arrow, Ternary, Comparison',
    scope: [
      'keyword.operator.logical',
      'storage.type.function',
      'keyword.operator.bitwise',
      'keyword.operator.ternary',
      'keyword.operator.comparison',
      'keyword.operator.relational',
      'keyword.operator.or.regexp',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Tag',
    scope: 'entity.name.tag',
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Tag Component',
    scope: ['entity.name.tag support.class.component', 'meta.tag'],
    settings: {
      foreground: palette.token.tagComponent,
    },
  },
  {
    name: 'Tag Punctuation',
    scope: 'punctuation.definition.tag',
    settings: {
      foreground: palette.token.tagPunctuation,
    },
  },
  {
    name: 'Globals, PHP Constants, etc',
    scope: [
      'constant.other.php',
      'variable.other.global.safer',
      'variable.other.global.safer punctuation.definition.variable',
      'variable.other.global',
      'variable.other.global punctuation.definition.variable',
      'constant.other',
    ],
    settings: {
      foreground: palette.token.spread,
    },
  },
  {
    name: 'Variables',
    scope: [
      'variable',
      'support.variable',
      'string constant.other.placeholder',
      'variable.parameter.handlebars',
    ],
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Object Variable',
    scope: 'variable.other.object',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Variable Array Key',
    scope: 'meta.array.literal variable',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Object Key',
    scope: [
      'meta.object-literal.key',
      'string.alias.graphql',
      'string.unquoted.graphql',
      'string.unquoted.alias.graphql',
      'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      'meta.field.declaration.ts variable.object.property',
    ],
    settings: {
      foreground: palette.token.objectKey,
    },
  },
  {
    name: 'Object Property',
    scope: [
      'variable.other.property',
      'support.variable.property',
      'support.variable.property.dom',
      'meta.function-call variable.other.object.property',
    ],
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Object Property',
    scope: 'variable.other.object.property',
    settings: {
      foreground: palette.accent.cyan,
    },
  }, // More specific override for object properties
  {
    name: 'Object Literal Member lvl 3 (Vue Prop Validation)',
    scope:
      'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
    settings: {
      foreground: palette.token.objectKeyLevel3,
    },
  },
  {
    name: 'C-related Block Level Variables',
    scope: 'source.cpp meta.block variable.other',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Other Variable',
    scope: 'support.other.variable',
    settings: {
      foreground: palette.accent.red,
    },
  },
  {
    name: 'Methods',
    scope: [
      'meta.class-method.js entity.name.function.js',
      'entity.name.method.js',
      'variable.function.constructor',
      'keyword.other.special-method',
      'storage.type.cs',
    ],
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Function Definition',
    scope: [
      'entity.name.function',
      'meta.function-call',
      'meta.function-call entity.name.function',
      'variable.function',
      'meta.definition.method entity.name.function',
      'meta.object-literal entity.name.function',
    ],
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Function Argument',
    scope: [
      'variable.parameter.function.language.special',
      'variable.parameter',
      'meta.function.parameters punctuation.definition.variable',
      'meta.function.parameter variable',
    ],
    settings: {
      foreground: palette.token.spread,
    },
  },
  {
    name: 'Constant, Tag Attribute',
    scope: [
      'keyword.other.type.php',
      'storage.type.php',
      'constant.character',
      'constant.escape',
      'keyword.other.unit',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Variable Definition',
    scope: [
      'meta.definition.variable variable.other.constant',
      'meta.definition.variable variable.other.readwrite',
      'variable.other.declaration',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Inherited Class',
    scope: 'entity.other.inherited-class',
    settings: {
      fontStyle: '',
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Class, Support, DOM, etc',
    scope: [
      'support.class',
      'support.type',
      'variable.other.readwrite.alias',
      'support.orther.namespace.use.php',
      'meta.use.php',
      'support.other.namespace.php',
      'support.type.sys-types',
      'support.variable.dom',
      'support.constant.math',
      'support.type.object.module',
      'support.constant.json',
      'entity.name.namespace',
      'meta.import.qualifier',
    ],
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'Class Name',
    scope: 'entity.name',
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Support Function',
    scope: 'support.function',
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'CSS Class and Support',
    scope: [
      'source.css support.type.property-name',
      'source.sass support.type.property-name',
      'source.scss support.type.property-name',
      'source.less support.type.property-name',
      'source.stylus support.type.property-name',
      'source.postcss support.type.property-name',
      'support.type.property-name.css',
      'support.type.vendored.property-name',
      'support.type.map.key',
    ],
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'CSS Font',
    scope: ['support.constant.font-name', 'meta.definition.variable'],
    settings: {
      foreground: palette.token.string,
    },
  },
  {
    name: 'CSS Class',
    scope: [
      'entity.other.attribute-name.class',
      'meta.at-rule.mixin.scss entity.name.function.scss',
    ],
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'CSS ID',
    scope: 'entity.other.attribute-name.id',
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'CSS Tag',
    scope: 'entity.name.tag.css',
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'CSS Tag Reference, Pseudo & Class Punctuation',
    scope: [
      'entity.other.attribute-name.pseudo-class punctuation.definition.entity',
      'entity.other.attribute-name.pseudo-element punctuation.definition.entity',
      'entity.other.attribute-name.class punctuation.definition.entity',
      'entity.name.tag.reference',
    ],
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'CSS Punctuation',
    scope: 'meta.property-list',
    settings: {
      foreground: palette.token.cssPunctuation,
    },
  },
  {
    name: 'CSS at-rule fix',
    scope: [
      'meta.property-list meta.at-rule.if',
      'meta.at-rule.return variable.parameter.url',
      'meta.property-list meta.at-rule.else',
    ],
    settings: {
      foreground: palette.accent.orange,
    },
  },
  {
    name: 'CSS Parent Selector Entity',
    scope: [
      'entity.other.attribute-name.parent-selector-suffix punctuation.definition.entity.css',
    ],
    settings: {
      foreground: palette.token.objectKey,
    },
  },
  {
    name: 'CSS Punctuation comma fix',
    scope: 'meta.property-list meta.property-list',
    settings: {
      foreground: palette.token.cssPunctuation,
    },
  },
  {
    name: 'SCSS @',
    scope: [
      'meta.at-rule.mixin keyword.control.at-rule.mixin',
      'meta.at-rule.include entity.name.function.scss',
      'meta.at-rule.include keyword.control.at-rule.include',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'SCSS Mixins, Extends, Include Keyword',
    scope: [
      'keyword.control.at-rule.include punctuation.definition.keyword',
      'keyword.control.at-rule.mixin punctuation.definition.keyword',
      'meta.at-rule.include keyword.control.at-rule.include',
      'keyword.control.at-rule.extend punctuation.definition.keyword',
      'meta.at-rule.extend keyword.control.at-rule.extend',
      'entity.other.attribute-name.placeholder.css punctuation.definition.entity.css',
      'meta.at-rule.media keyword.control.at-rule.media',
      'meta.at-rule.mixin keyword.control.at-rule.mixin',
      'meta.at-rule.function keyword.control.at-rule.function',
      'keyword.control punctuation.definition.keyword',
    ],
    settings: {
      foreground: palette.accent.purple,
    },
  },
  {
    name: 'SCSS Include Mixin Argument',
    scope: 'meta.property-list meta.at-rule.include',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'CSS value',
    scope: 'support.constant.property-value',
    settings: {
      foreground: palette.token.cssValue,
    },
  },
  {
    name: 'Sub-methods',
    scope: [
      'entity.name.module.js',
      'variable.import.parameter.js',
      'variable.other.class.js',
    ],
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Language methods',
    scope: 'variable.language',
    settings: {
      foreground: palette.accent.red,
    },
  },
  {
    name: 'Variable punctuation',
    scope: 'variable.other punctuation.definition.variable',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Keyword this with Punctuation, ES7 Bind Operator',
    scope: [
      'source.js constant.other.object.key.js string.unquoted.label.js',
      'variable.language.this punctuation.definition.variable',
      'keyword.other.this',
    ],
    settings: {
      foreground: palette.accent.red,
    },
  },
  {
    name: 'HTML Attributes',
    scope: [
      'entity.other.attribute-name',
      'text.html.basic entity.other.attribute-name.html',
      'text.html.basic entity.other.attribute-name',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'HTML Character Entity',
    scope: 'text.html constant.character.entity',
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'Vue Template attributes',
    scope: [
      'entity.other.attribute-name.id.html',
      'meta.directive.vue entity.other.attribute-name.html',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: "CSS ID's",
    scope: 'source.sass keyword.control',
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'CSS psuedo selectors',
    scope: [
      'entity.other.attribute-name.pseudo-class',
      'entity.other.attribute-name.pseudo-element',
      'entity.other.attribute-name.placeholder',
      'meta.property-list meta.property-value',
    ],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Inserted',
    scope: 'markup.inserted',
    settings: {
      foreground: palette.token.markup,
    },
  },
  {
    name: 'Deleted',
    scope: 'markup.deleted',
    settings: {
      foreground: palette.token.error,
    },
  },
  {
    name: 'Changed',
    scope: 'markup.changed',
    settings: {
      foreground: palette.token.regexQuantifier,
    },
  },
  {
    name: 'Regular Expressions',
    scope: 'string.regexp',
    settings: {
      foreground: palette.token.escapeChar,
    },
  },
  {
    name: 'Regular Expressions - Punctuation',
    scope: 'punctuation.definition.group',
    settings: {
      foreground: palette.accent.red,
    },
  },
  {
    name: 'Regular Expressions - Character Class',
    scope: ['constant.other.character-class.regexp'],
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Regular Expressions - Character Class Set',
    scope: [
      'constant.other.character-class.set.regexp',
      'punctuation.definition.character-class.regexp',
    ],
    settings: {
      foreground: palette.accent.yellow,
    },
  },
  {
    name: 'Regular Expressions - Quantifier',
    scope: 'keyword.operator.quantifier.regexp',
    settings: {
      foreground: palette.token.operator,
    },
  },
  {
    name: 'Regular Expressions - Backslash',
    scope: 'constant.character.escape.backslash',
    settings: {
      foreground: palette.accent.cyan,
    },
  },
  {
    name: 'Escape Characters',
    scope: 'constant.character.escape',
    settings: {
      foreground: palette.token.operator,
    },
  },
  {
    name: 'Decorators',
    scope: [
      'tag.decorator.js entity.name.tag.js',
      'tag.decorator.js punctuation.definition.tag.js',
    ],
    settings: {
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'CSS Units',
    scope: 'keyword.other.unit',
    settings: {
      foreground: palette.accent.red,
    },
  },
  // JSON Key Scopes (Optimized)
  ...Array.from({ length: 4 }).map((_, i) => {
    const baseScope = 'source.json meta.structure.dictionary.json'
    const levelScope = Array.from({ length: i })
      .map(
        () =>
          'meta.structure.dictionary.value.json meta.structure.dictionary.json'
      )
      .join(' ')
    const fullScope = `${baseScope}${
      levelScope ? ' ' + levelScope : ''
    } support.type.property-name.json`

    const colors = [
      palette.accent.blue,
      palette.token.templateKeyword,
      palette.accent.cyan,
      palette.accent.magenta,
    ]

    return {
      name: `JSON Key - Level ${i}`,
      scope: [fullScope],
      settings: {
        foreground: colors[i],
      },
    }
  }),
  {
    name: 'Plain Punctuation',
    scope: 'punctuation.definition.list_item.markdown',
    settings: {
      foreground: palette.token.cssPunctuation,
    },
  },
  {
    name: 'Block Punctuation',
    scope: [
      'meta.block',
      'meta.brace',
      'punctuation.definition.block',
      'punctuation.definition.use',
      'punctuation.definition.class',
      'punctuation.definition.begin.bracket',
      'punctuation.definition.end.bracket',
      'punctuation.definition.switch-expression.begin.bracket',
      'punctuation.definition.switch-expression.end.bracket',
      'punctuation.definition.section.switch-block.begin.bracket',
      'punctuation.definition.section.switch-block.end.bracket',
      'punctuation.definition.group.shell',
      'punctuation.definition.parameters',
      'punctuation.definition.arguments',
      'punctuation.definition.dictionary',
      'punctuation.definition.array',
      'punctuation.section',
    ],
    settings: {
      foreground: palette.token.cssPunctuation,
    },
  },
  {
    name: 'Markdown - Plain',
    scope: ['meta.jsx.children', 'meta.embedded.block'],
    settings: {
      foreground: palette.token.markdownContent,
    },
  },
  {
    name: 'HTML text',
    scope: ['text.html', 'text.log'],
    settings: {
      foreground: palette.token.constant,
    },
  },
  {
    name: 'Markdown - Markup Raw Inline',
    scope: 'text.html.markdown markup.inline.raw.markdown',
    settings: {
      foreground: palette.accent.magenta,
    },
  },
  {
    name: 'Markdown - Markup Raw Inline Punctuation',
    scope:
      'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
    settings: {
      foreground: palette.token.comment,
    },
  },
  {
    name: 'Markdown - Heading 1',
    scope: [
      'heading.1.markdown entity.name',
      'heading.1.markdown punctuation.definition.heading.markdown',
    ],
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.operator,
    },
  },
  {
    name: 'Markdown - Heading 2',
    scope: [
      'heading.2.markdown entity.name',
      'heading.2.markdown punctuation.definition.heading.markdown',
    ],
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.codeBlock,
    },
  },
  {
    name: 'Markdown - Heading 3',
    scope: [
      'heading.3.markdown entity.name',
      'heading.3.markdown punctuation.definition.heading.markdown',
    ],
    settings: {
      fontStyle: 'bold',
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Markdown - Heading 4',
    scope: [
      'heading.4.markdown entity.name',
      'heading.4.markdown punctuation.definition.heading.markdown',
    ],
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.linkText,
    },
  },
  {
    name: 'Markdown - Heading 5',
    scope: [
      'heading.5.markdown entity.name',
      'heading.5.markdown punctuation.definition.heading.markdown',
    ],
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.constant,
    },
  },
  {
    name: 'Markdown - Heading 6',
    scope: [
      'heading.6.markdown entity.name',
      'heading.6.markdown punctuation.definition.heading.markdown',
    ],
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.quoteMark,
    },
  },
  {
    name: 'Markup - Italic',
    scope: ['markup.italic', 'markup.italic punctuation'],
    settings: {
      fontStyle: 'italic',
      foreground: palette.token.markupItalic,
    },
  },
  {
    name: 'Markup - Bold',
    scope: ['markup.bold', 'markup.bold punctuation'],
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.markupBold,
    },
  },
  {
    name: 'Markup - Bold-Italic',
    scope: [
      'markup.bold markup.italic',
      'markup.bold markup.italic punctuation',
    ],
    settings: {
      fontStyle: 'bold italic',
      foreground: palette.accent.blue,
    },
  },
  {
    name: 'Markup - Underline',
    scope: ['markup.underline', 'markup.underline punctuation'],
    settings: {
      fontStyle: 'underline',
    },
  },
  {
    name: 'Markdown - Blockquote',
    scope: 'markup.quote punctuation.definition.blockquote.markdown',
    settings: {
      foreground: palette.token.comment,
    },
  },
  {
    name: 'Markup - Quote',
    scope: 'markup.quote',
    settings: {
      fontStyle: 'italic',
    },
  },
  {
    name: 'Markdown - Link',
    scope: [
      'string.other.link',
      'markup.underline.link',
      'constant.other.reference.link.markdown',
      'string.other.link.description.title.markdown',
    ],
    settings: {
      foreground: palette.token.objectKey,
    },
  },
  {
    name: 'Markdown - Fenced Code Block',
    scope: [
      'markup.fenced_code.block.markdown',
      'markup.inline.raw.string.markdown',
      'variable.language.fenced.markdown',
    ],
    settings: {
      foreground: palette.token.operator,
    },
  },
  {
    name: 'Markdown - Separator',
    scope: 'meta.separator',
    settings: {
      fontStyle: 'bold',
      foreground: palette.token.ignored,
    },
  },
  {
    name: 'Markup - Table',
    scope: 'markup.table',
    settings: {
      foreground: palette.token.linkUrl,
    },
  },
  {
    name: 'Token - Info',
    scope: 'token.info-token',
    settings: {
      foreground: palette.token.templateKeyword,
    },
  },
  {
    name: 'Token - Warn',
    scope: 'token.warn-token',
    settings: {
      foreground: palette.token.warning,
    },
  },
  {
    name: 'Token - Error',
    scope: 'token.error-token',
    settings: {
      foreground: palette.token.deleted,
    },
  },
  {
    name: 'Token - Debug',
    scope: 'token.debug-token',
    settings: {
      foreground: palette.token.inserted,
    },
  },
  {
    name: 'Apache Tag',
    scope: 'entity.tag.apacheconf',
    settings: {
      foreground: palette.accent.red,
    },
  },
  {
    name: 'Preprocessor',
    scope: ['meta.preprocessor'],
    settings: {
      foreground: palette.token.objectKey,
    },
  },
  {
    name: 'ENV value',
    scope: 'source.env',
    settings: {
      foreground: palette.accent.blue,
    },
  },
]

// Экспорт для обратной совместимости
export const tokenColors = getTokenColors()
