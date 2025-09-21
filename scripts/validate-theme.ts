#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { TOKEN_REGISTRY } from '../src/core/tokenRegistry'

// Устаревшие свойства VS Code
const DEPRECATED_PROPERTIES = [
  'editorIndentGuide.background',
  'editorIndentGuide.activeBackground',
  'editorCodeLens.foreground',
  'editorOverviewRuler.currentContentForeground',
  'editorOverviewRuler.incomingContentForeground',
  'editorOverviewRuler.commonContentForeground',
  'merge.currentHeaderBackground',
  'merge.currentContentBackground',
  'merge.incomingHeaderBackground',
  'merge.incomingContentBackground',
  'merge.commonHeaderBackground',
  'merge.commonContentBackground',
]

// Современные замены для устаревших свойств
const PROPERTY_REPLACEMENTS: Record<string, string> = {
  'editorIndentGuide.background': 'editorIndentGuide.background1',
  'editorIndentGuide.activeBackground': 'editorIndentGuide.activeBackground1',
}

// Недопустимые значения
const INVALID_VALUES = ['transparent', 'inherit', 'initial', 'unset']

// Валидные цветовые форматы
const COLOR_REGEX = /^(#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?|rgba?\([^)]+\))$/

// Набор известных допустимых ключей, чтобы отлавливать опечатки.
// Список неполный, но включает проблемные зоны: toolbar и inlineChat.
const KNOWN_KEYS_PREFIXES: string[] = [
  // глобально допустимые префиксы, не будем перечислять все ключи VS Code
  'foreground',
  'descriptionForeground',
  'disabledForeground',
  'focusBorder',
  'errorForeground',
  'selection.background',
  'widget.shadow',
  'titleBar.',
  'menubar.',
  'menu.',
  'commandCenter.',
  'quickInput',
  'editor',
  'editorGroup',
  'activityBar',
  'activityBarBadge',
  'sideBar',
  'statusBar',
  'statusBarItem',
  'tab',
  'list',
  'tree.',
  'input',
  'inputOption',
  'inputValidation',
  'button',
  'dropdown',
  'badge',
  'progressBar.',
  'panel',
  'panelTitle',
  'panelSection',
  'terminal',
  'terminalCommandDecoration',
  'terminalOverviewRuler',
  'textLink',
  'textBlockQuote',
  'scrollbar',
  'scrollbarSlider',
  'notifications',
  'notificationCenter',
  'notificationCenterHeader',
  'notificationToast',
  'extensionButton',
  'extensionBadge',
  'gitDecoration',
  'scmGraph',
  'diffEditor',
  'settings.',
  'breadcrumb',
  'breadcrumbPicker',
  'widget.',
  'peekView',
  'editorWidget',
  'editorSuggestWidget',
  'editorHoverWidget',
  'debugExceptionWidget',
  'editorMarkerNavigation',
  'merge.',
  'editorOverviewRuler.',
  'minimap',
  'minimapSlider',
  'minimapGutter',
  'searchEditor',
  'problems',
  'charts',
  'checkbox',
  'toolbar', // важно оставить только допустимые toolbar.*
  'icon.',
  'keybindingLabel',
  'welcomePage',
  'walkThrough',
  'debugToolBar',
  'debugIcon',
  'debugConsole',
  'testing.',
  'ports.',
  // Inline Chat раздел (важные префиксы)
  'inlineChat.',
  'inlineChatInput.',
  'inlineChatDiff.',
]

interface ValidationResult {
  deprecated: Array<{ property: string; replacement?: string }>
  invalidValues: Array<{ property: string; value: string }>
  invalidColors: Array<{ property: string; value: string }>
  unknownProperties: Array<string>
}

function validateTheme(themePath: string): ValidationResult {
  const themeContent = fs.readFileSync(themePath, 'utf8')
  const theme = JSON.parse(themeContent)

  const result: ValidationResult = {
    deprecated: [],
    invalidValues: [],
    invalidColors: [],
    unknownProperties: [],
  }

  if (!theme.colors) {
    console.error('❌ Тема не содержит секцию colors')
    return result
  }

  // KNOWN_KEYS_PREFIXES — в модульной области

  // Проверка каждого свойства
  for (const [property, value] of Object.entries(theme.colors)) {
    const stringValue = String(value)

    // Проверка неизвестных свойств (грубая эвристика по префиксам)
    const known = KNOWN_KEYS_PREFIXES.some(
      (p) => property === p || property.startsWith(p)
    )
    if (!known) {
      result.unknownProperties.push(property)
    }

    // Специальная строгая проверка для toolbar.* (раздел Action colors)
    if (property.startsWith('toolbar.')) {
      const allowed = new Set<
        'hoverBackground' | 'hoverOutline' | 'activeBackground'
      >(['hoverBackground', 'hoverOutline', 'activeBackground'])
      const key = property.split('.')[1] as any
      if (!allowed.has(key)) {
        result.unknownProperties.push(property)
      }
    }

    // Специальная строгая проверка для inlineChat.* (только базовые ключи)
    if (property.startsWith('inlineChat.')) {
      const allowed = new Set<
        'background' | 'foreground' | 'border' | 'shadow'
      >(['background', 'foreground', 'border', 'shadow'])
      const key = property.split('.')[1] as any
      if (!allowed.has(key)) {
        result.unknownProperties.push(property)
      }
    }

    // Проверка на устаревшие свойства
    if (DEPRECATED_PROPERTIES.includes(property)) {
      result.deprecated.push({
        property,
        replacement: PROPERTY_REPLACEMENTS[property],
      })
    }

    // Проверка на недопустимые значения
    if (INVALID_VALUES.includes(stringValue)) {
      result.invalidValues.push({ property, value: stringValue })
    }

    // Проверка корректности цветовых значений
    if (
      !COLOR_REGEX.test(stringValue) &&
      !INVALID_VALUES.includes(stringValue)
    ) {
      result.invalidColors.push({ property, value: stringValue })
    }
  }

  return result
}

function fixTheme(themePath: string, result: ValidationResult): void {
  const themeContent = fs.readFileSync(themePath, 'utf8')
  const theme = JSON.parse(themeContent)

  let hasChanges = false

  // Исправление устаревших свойств
  for (const { property, replacement } of result.deprecated) {
    if (replacement && theme.colors[property]) {
      theme.colors[replacement] = theme.colors[property]
      delete theme.colors[property]
      hasChanges = true
      console.log(`🔄 Заменено: ${property} → ${replacement}`)
    }
  }

  // Удаление недопустимых значений (заменяем на null или удаляем)
  for (const { property } of result.invalidValues) {
    if (theme.colors[property]) {
      delete theme.colors[property]
      hasChanges = true
      console.log(`🗑️  Удалено недопустимое значение: ${property}`)
    }
  }

  if (hasChanges) {
    fs.writeFileSync(themePath, JSON.stringify(theme, null, 2))
    console.log('✅ Тема исправлена и сохранена')
  }
}

function printReport(result: ValidationResult): void {
  console.log('\n📊 Отчет валидации темы\n')

  if (result.deprecated.length > 0) {
    console.log('⚠️  Устаревшие свойства:')
    const aliasMap = new Map<string, string>()
    TOKEN_REGISTRY.forEach((m) => {
      if (m.aliasOf) aliasMap.set(m.key, m.aliasOf)
    })
    result.deprecated.forEach(({ property, replacement }) => {
      const aliasOf = aliasMap.get(property)
      const repl = replacement || aliasOf
      console.log(
        `   • ${property}${repl ? ` → ${repl}` : ' (нет замены)'}${
          aliasOf && !replacement ? ' (из реестра aliasOf)' : ''
        }`
      )
    })
  }

  if (result.invalidValues.length > 0) {
    console.log('❌ Недопустимые значения:')
    result.invalidValues.forEach(({ property, value }) => {
      console.log(`   • ${property}: "${value}"`)
    })
    console.log()
  }

  if (result.invalidColors.length > 0) {
    console.log('🎨 Некорректные цветовые значения:')
    result.invalidColors.forEach(({ property, value }) => {
      console.log(`   • ${property}: "${value}"`)
    })
    console.log()
  }

  if (result.unknownProperties.length > 0) {
    console.log('❓ Неизвестные ключи (возможны опечатки или устаревшие ID):')
    const known = new Set<string>()
    // собираем известные ключи из префиксов и популярных токенов
    KNOWN_KEYS_PREFIXES.forEach((p) => known.add(p))
    // Добавим часть специфических полных ключей, которые часто путают
    ;[
      'editorIndentGuide.background1',
      'editorIndentGuide.activeBackground1',
      'textBlockQuote.background',
      'textBlockQuote.border',
    ].forEach((k) => known.add(k))

    const distance = (a: string, b: string) => {
      const dp = Array.from({ length: a.length + 1 }, () =>
        new Array<number>(b.length + 1).fill(0)
      )
      for (let i = 0; i <= a.length; i++) dp[i][0] = i
      for (let j = 0; j <= b.length; j++) dp[0][j] = j
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          )
        }
      }
      return dp[a.length][b.length]
    }

    result.unknownProperties.forEach((property) => {
      // ищем ближайшие 3 подсказки
      const suggestions = Array.from(known)
        .map((k) => ({ k, d: distance(property, k) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 3)
        .map((x) => x.k)
      const hint = suggestions.length
        ? `  → Возможно: ${suggestions.join(', ')}`
        : ''
      console.log(`   • ${property}${hint}`)
    })
    console.log()
  }

  const totalIssues =
    result.deprecated.length +
    result.invalidValues.length +
    result.invalidColors.length +
    result.unknownProperties.length

  if (totalIssues === 0) {
    console.log('✅ Проблем не найдено! Тема соответствует стандартам VS Code.')
  } else {
    console.log(`📈 Найдено проблем: ${totalIssues}`)
    console.log('   - Устаревших свойств:', result.deprecated.length)
    console.log('   - Недопустимых значений:', result.invalidValues.length)
    console.log('   - Некорректных цветов:', result.invalidColors.length)
    console.log('   - Неизвестных ключей:', result.unknownProperties.length)
  }
}

// Основная функция
function main() {
  const themePath = path.join(
    __dirname,
    '../themes/tokyo-night-modern-color-theme.json'
  )

  if (!fs.existsSync(themePath)) {
    console.error('❌ Файл темы не найден:', themePath)
    process.exit(1)
  }

  console.log('🔍 Валидация темы Tokyo Night Modern...\n')

  const result = validateTheme(themePath)

  // Режим подсказок: печатаем только неизвестные и их близкие варианты
  if (process.argv.includes('--suggest')) {
    const onlyUnknown: ValidationResult = {
      deprecated: [],
      invalidValues: [],
      invalidColors: [],
      unknownProperties: result.unknownProperties,
    }
    printReport(onlyUnknown)
    return
  }

  printReport(result)

  // Предложение исправления
  const totalIssues = result.deprecated.length + result.invalidValues.length
  if (totalIssues > 0) {
    console.log('\n🔧 Запустите с флагом --fix для автоматического исправления')

    if (process.argv.includes('--fix')) {
      console.log('\n🔄 Исправление проблем...')
      fixTheme(themePath, result)
    }
  }
}

if (require.main === module) {
  main()
}
