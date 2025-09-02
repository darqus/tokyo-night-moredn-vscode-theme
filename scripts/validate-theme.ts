#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'

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
    unknownProperties: []
  }

  if (!theme.colors) {
    console.error('❌ Тема не содержит секцию colors')
    return result
  }

  // Проверка каждого свойства
  for (const [property, value] of Object.entries(theme.colors)) {
    const stringValue = String(value)

    // Проверка на устаревшие свойства
    if (DEPRECATED_PROPERTIES.includes(property)) {
      result.deprecated.push({
        property,
        replacement: PROPERTY_REPLACEMENTS[property]
      })
    }

    // Проверка на недопустимые значения
    if (INVALID_VALUES.includes(stringValue)) {
      result.invalidValues.push({ property, value: stringValue })
    }

    // Проверка корректности цветовых значений
    if (!COLOR_REGEX.test(stringValue) && !INVALID_VALUES.includes(stringValue)) {
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
    result.deprecated.forEach(({ property, replacement }) => {
      console.log(`   • ${property}${replacement ? ` → ${replacement}` : ' (нет замены)'}`)
    })
    console.log()
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

  const totalIssues = result.deprecated.length + result.invalidValues.length + result.invalidColors.length
  
  if (totalIssues === 0) {
    console.log('✅ Проблем не найдено! Тема соответствует стандартам VS Code.')
  } else {
    console.log(`📈 Найдено проблем: ${totalIssues}`)
    console.log('   - Устаревших свойств:', result.deprecated.length)
    console.log('   - Недопустимых значений:', result.invalidValues.length)
    console.log('   - Некорректных цветов:', result.invalidColors.length)
  }
}

// Основная функция
function main() {
  const themePath = path.join(__dirname, '../themes/tokyo-night-dark-color-theme.json')
  
  if (!fs.existsSync(themePath)) {
    console.error('❌ Файл темы не найден:', themePath)
    process.exit(1)
  }

  console.log('🔍 Валидация темы Tokyo Night...\n')
  
  const result = validateTheme(themePath)
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