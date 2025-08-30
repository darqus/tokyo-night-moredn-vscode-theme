import type { Hex } from './types/palette'
import { palette } from './palette/index'

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

// Группировка областей по общим настройкам для устранения дублирования
const tokenMappings: {
  name: string
  settings: TokenSettings
  scopes: string[]
}[] = [
  // --- Стили шрифта ---
  {
    name: 'Italics',
    settings: { fontStyle: 'italic' },
    scopes: [
      'comment',
      'meta.var.expr storage.type',
      'keyword.control.flow',
      'keyword.control.return',
      'meta.directive.vue punctuation.separator.key-value.html',
      'meta.directive.vue entity.other.attribute-name.html',
      'tag.decorator.js entity.name.tag.js',
      'tag.decorator.js punctuation.definition.tag.js',
      'storage.modifier',
      'markup.quote',
    ],
  },
  {
    name: 'Bold',
    settings: { fontStyle: 'bold' },
    scopes: ['keyword.operator.spread', 'keyword.operator.rest'],
  },
  {
    name: 'Bold Italic',
    settings: { fontStyle: 'bold italic' },
    scopes: [
      'markup.bold markup.italic',
      'markup.bold markup.italic punctuation',
    ],
  },
  {
    name: 'Underline',
    settings: { fontStyle: 'underline' },
    scopes: ['markup.underline', 'markup.underline punctuation'],
  },
  {
    name: 'No Font Style',
    settings: { fontStyle: '' },
    scopes: [
      'keyword.control.flow.block-scalar.literal',
      'string',
      'invalid.deprecated',
      'entity.other.inherited-class',
    ],
  },

  // --- Цвета токенов ---
  {
    name: 'Comments',
    settings: { foreground: palette.token.ignored },
    scopes: [
      'comment',
      'comment.block.documentation',
      'punctuation.definition.comment',
      'comment.block.documentation punctuation',
      'meta.separator',
    ],
  },
  {
    name: 'Comments: Doc',
    settings: { foreground: palette.token.commentDoc },
    scopes: [
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
  },
  {
    name: 'Comments: Doc Emphasized',
    settings: { foreground: palette.token.commentDocEmphasized },
    scopes: [
      'meta.other.type.phpdoc.php support.class',
      'comment.block.documentation storage.type',
      'comment.block.documentation punctuation.definition.block.tag',
      'comment.block.documentation entity.name.type.instance',
    ],
  },
  {
    name: 'Literals: Number, Boolean, Null',
    settings: { foreground: palette.token.number },
    scopes: [
      'variable.other.constant',
      'punctuation.definition.constant',
      'constant.language',
      'constant.numeric',
      'support.constant',
    ],
  },
  {
    name: 'Literals: String, Symbols',
    settings: { foreground: palette.token.string },
    scopes: [
      'string',
      'constant.other.symbol',
      'constant.other.key',
      'meta.attribute-selector',
      'support.constant.font-name',
      'meta.definition.variable',
    ],
  },
  {
    name: 'Literals: Colors, Constants',
    settings: { foreground: palette.token.constant },
    scopes: [
      'constant.other.color',
      'constant.other.color.rgb-value.hex punctuation.definition.constant',
      'text.html',
      'text.log',
    ],
  },
  {
    name: 'Invalid',
    settings: { foreground: palette.token.invalid },
    scopes: ['invalid', 'invalid.illegal'],
  },
  {
    name: 'Keywords: Magenta',
    settings: { foreground: palette.accent.magenta },
    scopes: [
      'invalid.deprecated',
      'storage.type',
      'keyword',
      'keyword.control',
      'keyword.other.important',
      'keyword.operator.logical',
      'storage.type.function',
      'keyword.operator.bitwise',
      'keyword.operator.ternary',
      'keyword.operator.comparison',
      'keyword.operator.relational',
      'keyword.operator.or.regexp',
      'keyword.other.type.php',
      'storage.type.php',
      'constant.character',
      'constant.escape',
      'keyword.other.unit',
      'meta.definition.variable variable.other.constant',
      'meta.definition.variable variable.other.readwrite',
      'variable.other.declaration',
      'entity.other.inherited-class',
      'entity.other.attribute-name',
      'text.html.basic entity.other.attribute-name.html',
      'text.html.basic entity.other.attribute-name',
      'entity.other.attribute-name.id.html',
      'meta.directive.vue entity.other.attribute-name.html',
      'entity.other.attribute-name.id',
      'entity.other.attribute-name.pseudo-class',
      'entity.other.attribute-name.pseudo-element',
      'entity.other.attribute-name.placeholder',
      'meta.property-list meta.property-value',
      'text.html.markdown markup.inline.raw.markdown',
      'constant.other.character-class.regexp',
      'meta.at-rule.mixin keyword.control.at-rule.mixin',
      'meta.at-rule.include entity.name.function.scss',
      'meta.at-rule.include keyword.control.at-rule.include',
    ],
  },
  {
    name: 'Keywords: Purple',
    settings: { foreground: palette.accent.purple },
    scopes: [
      'meta.var.expr storage.type',
      'storage.modifier',
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
  },
  {
    name: 'Keywords & Variables: Cyan',
    settings: { foreground: palette.accent.cyan },
    scopes: [
      'punctuation.definition.template-expression',
      'punctuation.section.embedded',
      'meta.embedded.line.tag.smarty',
      'support.constant.handlebars',
      'punctuation.section.tag.twig',
      'keyword.control.import',
      'keyword.control.export',
      'keyword.control.from',
      'keyword.control.default',
      'meta.import keyword.other',
      'keyword.other.DML',
      'variable',
      'support.variable',
      'string constant.other.placeholder',
      'variable.parameter.handlebars',
      'variable.other.object',
      'meta.array.literal variable',
      'variable.other.property',
      'support.variable.property',
      'support.variable.property.dom',
      'meta.function-call variable.other.object.property',
      'variable.other.object.property',
      'source.cpp meta.block variable.other',
      'meta.property-list meta.at-rule.include',
      'variable.other punctuation.definition.variable',
      'constant.character.escape.backslash',
    ],
  },
  {
    name: 'Template Keywords & Types',
    settings: { foreground: palette.token.templateKeyword },
    scopes: [
      'keyword.control.smarty',
      'keyword.control.twig',
      'support.constant.handlebars keyword.control',
      'keyword.operator.comparison.twig',
      'keyword.blade',
      'entity.name.function.blade',
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
      'support.function',
      'entity.name.tag.css',
      'entity.other.attribute-name.pseudo-class punctuation.definition.entity',
      'entity.other.attribute-name.pseudo-element punctuation.definition.entity',
      'entity.other.attribute-name.class punctuation.definition.entity',
      'entity.name.tag.reference',
      'text.html constant.character.entity',
      'token.info-token',
    ],
  },
  {
    name: 'Special Variables & Spread',
    settings: { foreground: palette.token.spread },
    scopes: [
      'keyword.operator.spread',
      'keyword.operator.rest',
      'constant.other.php',
      'variable.other.global.safer',
      'variable.other.global.safer punctuation.definition.variable',
      'variable.other.global',
      'variable.other.global punctuation.definition.variable',
      'constant.other',
      'variable.parameter.function.language.special',
      'variable.parameter',
      'meta.function.parameters punctuation.definition.variable',
      'meta.function.parameter variable',
    ],
  },
  {
    name: 'Brackets & Punctuation',
    settings: { foreground: palette.brackets.round },
    scopes: [
      'punctuation.section.parens.begin',
      'punctuation.section.parens.end',
      'punctuation.section.group.begin',
      'punctuation.section.group.end',
    ],
  },
  {
    name: 'Brackets: Square',
    settings: { foreground: palette.brackets.square },
    scopes: [
      'punctuation.section.brackets.begin',
      'punctuation.section.brackets.end',
      'punctuation.section.array.begin',
      'punctuation.section.array.end',
    ],
  },
  {
    name: 'Brackets: Curly',
    settings: { foreground: palette.brackets.curly },
    scopes: [
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
  },
  {
    name: 'Brackets: Angle & Tags',
    settings: { foreground: palette.brackets.angle },
    scopes: [
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
  },
  {
    name: 'Punctuation: Comma',
    settings: { foreground: palette.punctuation.comma },
    scopes: [
      'punctuation.separator.comma',
      'punctuation.separator.list',
      'punctuation.separator.sequence',
    ],
  },
  {
    name: 'Punctuation: Dot',
    settings: { foreground: palette.punctuation.dot },
    scopes: [
      'punctuation.separator.dot',
      'punctuation.accessor.dot',
      'punctuation.separator.period',
    ],
  },
  {
    name: 'Punctuation: Colon',
    settings: { foreground: palette.punctuation.colon },
    scopes: [
      'punctuation.separator.colon',
      'punctuation.separator.key-value',
      'punctuation.separator.type',
    ],
  },
  {
    name: 'Punctuation: Semicolon',
    settings: { foreground: palette.punctuation.semicolon },
    scopes: [
      'punctuation.terminator.statement',
      'punctuation.separator.statement',
      'punctuation.terminator.rule',
    ],
  },
  {
    name: 'Punctuation: Operators',
    settings: { foreground: palette.punctuation.operator },
    scopes: [
      'keyword.operator',
      'keyword.control.as',
      'keyword.other',
      'keyword.operator.bitwise.shift',
      'keyword.other.template',
      'keyword.other.substitution',
      'entity.name.operator',
    ],
  },
  {
    name: 'Punctuation: Other',
    settings: { foreground: palette.token.operator },
    scopes: [
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
      'keyword.operator.quantifier.regexp',
      'constant.character.escape',
      'markup.fenced_code.block.markdown',
      'markup.inline.raw.string.markdown',
      'variable.language.fenced.markdown',
    ],
  },
  {
    name: 'Tags & Functions: Blue',
    settings: { foreground: palette.accent.blue },
    scopes: [
      'entity.name.tag',
      'meta.class-method.js entity.name.function.js',
      'entity.name.method.js',
      'variable.function.constructor',
      'keyword.other.special-method',
      'storage.type.cs',
      'entity.name.function',
      'meta.function-call',
      'meta.function-call entity.name.function',
      'variable.function',
      'meta.definition.method entity.name.function',
      'meta.object-literal entity.name.function',
      'entity.name',
      'source.css support.type.property-name',
      'source.sass support.type.property-name',
      'source.scss support.type.property-name',
      'source.less support.type.property-name',
      'source.stylus support.type.property-name',
      'source.postcss support.type.property-name',
      'support.type.property-name.css',
      'support.type.vendored.property-name',
      'support.type.map.key',
      'entity.other.attribute-name.class',
      'meta.at-rule.mixin.scss entity.name.function.scss',
      'source.sass keyword.control',
      'tag.decorator.js entity.name.tag.js',
      'tag.decorator.js punctuation.definition.tag.js',
      'entity.name.module.js',
      'variable.import.parameter.js',
      'variable.other.class.js',
      'source.env',
    ],
  },
  {
    name: 'Tags: Component',
    settings: { foreground: palette.token.tagComponent },
    scopes: ['entity.name.tag support.class.component', 'meta.tag'],
  },
  {
    name: 'Tags: Punctuation',
    settings: { foreground: palette.token.tagPunctuation },
    scopes: ['punctuation.definition.tag'],
  },
  {
    name: 'Object Keys',
    settings: { foreground: palette.token.objectKey },
    scopes: [
      'meta.object-literal.key',
      'string.alias.graphql',
      'string.unquoted.graphql',
      'string.unquoted.alias.graphql',
      'meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js',
      'meta.field.declaration.ts variable.object.property',
      'entity.other.attribute-name.parent-selector-suffix punctuation.definition.entity.css',
      'string.other.link',
      'markup.underline.link',
      'constant.other.reference.link.markdown',
      'string.other.link.description.title.markdown',
      'meta.preprocessor',
    ],
  },
  {
    name: 'Object Keys: Level 3',
    settings: { foreground: palette.token.objectKeyLevel3 },
    scopes: [
      'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
    ],
  },
  {
    name: 'Object Keys: Level 1',
    settings: { foreground: palette.token.objectKeyLevel1 },
    scopes: [
      'meta.objectliteral meta.object.member meta.object-literal.key',
      'variable.other.object.property',
      'meta.property.object.js',
    ],
  },
  {
    name: 'Object Keys: Level 2',
    settings: { foreground: palette.token.objectKeyLevel2 },
    scopes: [
      'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
    ],
  },
  {
    name: 'Object Keys: Level 4',
    settings: { foreground: palette.token.objectKeyLevel4 },
    scopes: [
      'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
    ],
  },
  {
    name: 'Object Keys: Level 5',
    settings: { foreground: palette.token.objectKeyLevel5 },
    scopes: [
      'meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.objectliteral meta.object.member meta.object-literal.key',
    ],
  },
  {
    name: 'Property Chain Access: Level 1',
    settings: { foreground: palette.token.propertyChain1 },
    scopes: [
      'meta.property.object variable.other.property',
      'support.variable.property',
      'variable.other.object.property',
    ],
  },
  {
    name: 'Property Chain Access: Level 2',
    settings: { foreground: palette.token.propertyChain2 },
    scopes: [
      'meta.property.object meta.property.object variable.other.property',
    ],
  },
  {
    name: 'Property Chain Access: Level 3',
    settings: { foreground: palette.token.propertyChain3 },
    scopes: [
      'meta.property.object meta.property.object meta.property.object variable.other.property',
    ],
  },
  {
    name: 'Array Access: Level 1',
    settings: { foreground: palette.token.arrayAccess1 },
    scopes: [
      'meta.brace.square.js',
      'meta.array.literal variable.other.object.property',
      'variable.other.property.ts',
    ],
  },
  {
    name: 'Array Access: Level 2',
    settings: { foreground: palette.token.arrayAccess2 },
    scopes: [
      'meta.array.literal meta.array.literal variable.other.object.property',
    ],
  },
  {
    name: 'Variables: Red',
    settings: { foreground: palette.accent.red },
    scopes: [
      'support.other.variable',
      'variable.language',
      'source.js constant.other.object.key.js string.unquoted.label.js',
      'variable.language.this punctuation.definition.variable',
      'keyword.other.this',
      'keyword.other.unit',
      'punctuation.definition.group',
      'entity.tag.apacheconf',
    ],
  },
  {
    name: 'CSS: Punctuation',
    settings: { foreground: palette.token.cssPunctuation },
    scopes: [
      'meta.property-list',
      'meta.property-list meta.property-list',
      'punctuation.definition.list_item.markdown',
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
  },
  {
    name: 'CSS: At-rule fix',
    settings: { foreground: palette.accent.orange },
    scopes: [
      'meta.property-list meta.at-rule.if',
      'meta.at-rule.return variable.parameter.url',
      'meta.property-list meta.at-rule.else',
    ],
  },
  {
    name: 'CSS: Value',
    settings: { foreground: palette.token.cssValue },
    scopes: ['support.constant.property-value'],
  },
  {
    name: 'Markup: Inserted',
    settings: { foreground: palette.token.markup },
    scopes: ['markup.inserted'],
  },
  {
    name: 'Markup: Deleted',
    settings: { foreground: palette.token.error },
    scopes: ['markup.deleted'],
  },
  {
    name: 'Markup: Changed',
    settings: { foreground: palette.token.regexQuantifier },
    scopes: ['markup.changed'],
  },
  {
    name: 'Markup: Regex',
    settings: { foreground: palette.token.escapeChar },
    scopes: ['string.regexp'],
  },
  {
    name: 'Markup: Regex Quantifier',
    settings: { foreground: palette.accent.yellow },
    scopes: [
      'constant.other.character-class.set.regexp',
      'punctuation.definition.character-class.regexp',
    ],
  },
  {
    name: 'JSON Keys',
    settings: {}, // Settings are dynamic
    scopes: [], // Scopes are generated
  },
  {
    name: 'Markdown: Plain',
    settings: { foreground: palette.token.markdownContent },
    scopes: ['meta.jsx.children', 'meta.embedded.block'],
  },
  {
    name: 'Markdown: Raw Punctuation',
    settings: { foreground: palette.token.comment },
    scopes: [
      'text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown',
      'markup.quote punctuation.definition.blockquote.markdown',
    ],
  },
  {
    name: 'Markdown: Headings',
    settings: { fontStyle: 'bold', foreground: palette.token.operator },
    scopes: [
      'heading.1.markdown entity.name',
      'heading.1.markdown punctuation.definition.heading.markdown',
    ],
  },
  {
    name: 'Markdown: Heading 2',
    settings: { fontStyle: 'bold', foreground: palette.token.codeBlock },
    scopes: [
      'heading.2.markdown entity.name',
      'heading.2.markdown punctuation.definition.heading.markdown',
    ],
  },
  {
    name: 'Markdown: Heading 3',
    settings: { fontStyle: 'bold', foreground: palette.accent.blue },
    scopes: [
      'heading.3.markdown entity.name',
      'heading.3.markdown punctuation.definition.heading.markdown',
    ],
  },
  {
    name: 'Markdown: Heading 4',
    settings: { fontStyle: 'bold', foreground: palette.token.linkText },
    scopes: [
      'heading.4.markdown entity.name',
      'heading.4.markdown punctuation.definition.heading.markdown',
    ],
  },
  {
    name: 'Markdown: Heading 5',
    settings: { fontStyle: 'bold', foreground: palette.token.constant },
    scopes: [
      'heading.5.markdown entity.name',
      'heading.5.markdown punctuation.definition.heading.markdown',
    ],
  },
  {
    name: 'Markdown: Heading 6',
    settings: { fontStyle: 'bold', foreground: palette.token.quoteMark },
    scopes: [
      'heading.6.markdown entity.name',
      'heading.6.markdown punctuation.definition.heading.markdown',
    ],
  },
  {
    name: 'Markup: Italic',
    settings: { fontStyle: 'italic', foreground: palette.token.markupItalic },
    scopes: ['markup.italic', 'markup.italic punctuation'],
  },
  {
    name: 'Markup: Bold',
    settings: { fontStyle: 'bold', foreground: palette.token.markupBold },
    scopes: ['markup.bold', 'markup.bold punctuation'],
  },
  {
    name: 'Markup: Table',
    settings: { foreground: palette.token.linkUrl },
    scopes: ['markup.table'],
  },
  {
    name: 'Token: Warn',
    settings: { foreground: palette.token.warning },
    scopes: ['token.warn-token'],
  },
  {
    name: 'Token: Error',
    settings: { foreground: palette.token.deleted },
    scopes: ['token.error-token'],
  },
  {
    name: 'Token: Debug',
    settings: { foreground: palette.token.inserted },
    scopes: ['token.debug-token'],
  },
]

// Генерация динамических правил для JSON - расширенная система
const jsonColors = [
  palette.token.objectKeyLevel1, // Уровень 0
  palette.token.objectKeyLevel2, // Уровень 1
  palette.token.objectKeyLevel3, // Уровень 2
  palette.token.objectKeyLevel4, // Уровень 3
  palette.token.objectKeyLevel5, // Уровень 4
  palette.token.objectKeyLevel6, // Уровень 5
  palette.token.objectKeyLevel7, // Уровень 6
  palette.token.objectKeyLevel8, // Уровень 7
]
for (let i = 0; i < 8; i++) {
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

  tokenMappings.push({
    name: `JSON Key - Level ${i}`,
    settings: { foreground: jsonColors[i] },
    scopes: [fullScope],
  })
}

// Преобразование сгруппированных правил в формат TokenColor
export const getTokenColors = (): TokenColor[] => {
  const finalTokens: TokenColor[] = []
  const scopeMap: Record<string, { name: string; settings: TokenSettings }> = {}

  for (const { name, settings, scopes } of tokenMappings) {
    for (const scope of scopes) {
      if (scopeMap[scope]) {
        // Если область уже существует, объединяем настройки
        Object.assign(scopeMap[scope].settings, settings)
      } else {
        scopeMap[scope] = { name, settings: { ...settings } }
      }
    }
  }

  // Группируем области с одинаковыми настройками
  const settingsMap = new Map<string, { name: string; scopes: string[] }>()

  for (const scope in scopeMap) {
    const { name, settings } = scopeMap[scope]
    const settingsKey = JSON.stringify(settings)

    if (settingsMap.has(settingsKey)) {
      settingsMap.get(settingsKey)!.scopes.push(scope)
    } else {
      settingsMap.set(settingsKey, { name, scopes: [scope] })
    }
  }

  // Создаем финальный массив токенов
  for (const [settingsKey, { name, scopes }] of settingsMap.entries()) {
    finalTokens.push({
      name,
      scope: scopes,
      settings: JSON.parse(settingsKey),
    })
  }

  return finalTokens
}

// Экспорт для обратной совместимости
export const tokenColors = getTokenColors()
