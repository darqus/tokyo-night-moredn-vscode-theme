import {
  ALLOWED_THEME_PROPERTIES,
  DEPRECATED_PROPERTIES,
  RENAMED_PROPERTIES,
} from './allowedProperties'
import type { ThemeData } from '../types/theme'
import type { TokenColor } from '../tokenColors'
import type { SemanticTokenStyle } from '../semanticTokenColors'

// Define a more flexible theme type for validation purposes
interface VSCodeThemeObject
  extends Omit<ThemeData, 'tokenColors' | 'semanticTokenColors'> {
  tokenColors?:
    | TokenColor[]
    | Array<{
        name?: string
        scope: string | string[]
        settings: {
          foreground?: string
          background?: string
          fontStyle?: string
        }
      }>
  semanticTokenColors?:
    | Record<string, SemanticTokenStyle>
    | Record<
        string,
        {
          foreground?: string
          background?: string
          fontStyle?: string
          bold?: boolean
          italic?: boolean
          underline?: boolean
          strikethrough?: boolean
        }
      >
  displayName?: string
  author?: string
  maintainers?: string[]
  semanticClass?: string
  [key: string]: unknown // Allow additional properties for validation
}

export interface PropertyValidationIssue {
  property: string
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  line?: number
}

export interface PropertyValidationResult {
  passed: boolean
  issues: PropertyValidationIssue[]
}

/**
 * Валидатор свойств цветовых тем VS Code
 * Проверяет соответствие официальной документации
 */
export class PropertyValidator {
  /**
   * Валидация объекта темы на допустимые свойства
   */
  validateThemeProperties(theme: ThemeData | VSCodeThemeObject): PropertyValidationResult {
    const issues: PropertyValidationIssue[] = []

    // Проверяем базовую структуру
    this.validateBasicStructure(theme, issues)

    // Проверяем свойства colors
    if (theme.colors) {
      this.validateColorProperties(theme.colors, issues)
    }

    // Проверяем tokenColors
    if (theme.tokenColors) {
      this.validateTokenColors(theme.tokenColors, issues)
    }

    // Проверяем semanticTokenColors
    if (theme.semanticTokenColors) {
      this.validateSemanticTokenColors(theme.semanticTokenColors, issues)
    }

    return {
      passed: issues.filter((issue) => issue.severity === 'error').length === 0,
      issues,
    }
  }

  /**
   * Валидация файла темы
   */
  validateThemeFile(filePath: string): PropertyValidationResult {
    try {
      const fs = require('fs')
      const themeContent = fs.readFileSync(filePath, 'utf8')
      const theme = JSON.parse(themeContent)

      const result = this.validateThemeProperties(theme)

      // Добавляем номера строк для issues
      this.addLineNumbers(themeContent, result.issues)

      return result
    } catch (error) {
      return {
        passed: false,
        issues: [
          {
            property: 'file',
            severity: 'error',
            message: `Ошибка чтения или парсинга файла: ${
              error instanceof Error ? error.message : 'Неизвестная ошибка'
            }`,
          },
        ],
      }
    }
  }

  /**
   * Проверка базовой структуры темы
   */
  private validateBasicStructure(
    theme: ThemeData | VSCodeThemeObject,
    issues: PropertyValidationIssue[]
  ): void {
    // Проверяем обязательные поля
    const requiredFields: Array<keyof ThemeData> = ['name', 'type']
    const t: any = theme as any
    for (const field of requiredFields) {
      if (!t[field]) {
        issues.push({
          property: String(field),
          severity: 'error',
          message: `Отсутствует обязательное поле "${String(field)}"`,
        })
      }
    }

    // Проверяем тип темы
    const themeType = t.type as string | undefined
    if (
      themeType &&
      !['dark', 'light', 'hc-dark', 'hc-light'].includes(themeType)
    ) {
      issues.push({
        property: 'type',
        severity: 'error',
        message: `Недопу��тимый тип темы: "${themeType}". Допустимые: dark, light, hc-dark, hc-light`,
      })
    }

    // Рекомендуемые поля
    const recommendedFields = ['displayName', 'author'] as const
    for (const field of recommendedFields) {
      if (!t[field]) {
        issues.push({
          property: field,
          severity: 'warning',
          message: `Рекомендуется добавить поле "${field}"`,
        })
      }
    }
  }

  /**
   * Проверка свойств colors
   */
  private validateColorProperties(
    colors: Record<string, string>,
    issues: PropertyValidationIssue[]
  ): void {
    for (const [property, value] of Object.entries(colors)) {
      // Проверяем на недопустимые свойства
      if (!ALLOWED_THEME_PROPERTIES.has(property)) {
        let suggestion: string | undefined

        // Проверяем на устаревшие свойства
        if (DEPRECATED_PROPERTIES.has(property)) {
          issues.push({
            property,
            severity: 'error',
            message: `Свойство "${property}" устарело и не поддерживается VS Code`,
            suggestion: 'Удалите это свойство',
          })
          continue
        }

        // Проверяем на переименованные свойства
        if (RENAMED_PROPERTIES.has(property)) {
          const newProperty = RENAMED_PROPERTIES.get(property)!
          issues.push({
            property,
            severity: 'error',
            message: `Свойство "${property}" было переименовано`,
            suggestion: `Используйте "${newProperty}" вместо "${property}"`,
          })
          continue
        }

        // Поиск похожих свойств
        const similarProperty = this.findSimilarProperty(property)
        if (similarProperty) {
          suggestion = `Возможно, вы имели в виду "${similarProperty}"?`
        }

        issues.push({
          property,
          severity: 'error',
          message: `Свойство "${property}" не найдено в официальной документации VS Code`,
          suggestion,
        })
      }

      // Проверяем формат значения цвета
      if (typeof value === 'string') {
        this.validateColorValue(property, value, issues)
      }
    }
  }

  /**
   * Проверка формата значения цвета
   */
  private validateColorValue(
    property: string,
    value: string,
    issues: PropertyValidationIssue[]
  ): void {
    // Допустимые форматы: #RGB, #RGBA, #RRGGBB, #RRGGBBAA, transparent
    const colorRegex =
      /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|transparent)$/

    if (!colorRegex.test(value)) {
      issues.push({
        property,
        severity: 'error',
        message: `Недопустимый формат цвета: "${value}"`,
        suggestion:
          'Используйте форматы: #RGB, #RGBA, #RRGGBB, #RRGGBBAA или "transparent"',
      })
    }

    // Предупреждение для очень коротких hex-цветов
    if (value.startsWith('#') && value.length === 4) {
      issues.push({
        property,
        severity: 'info',
        message: `Короткий hex-цвет "${value}" можно записать полностью для лучшей читаемости`,
        suggestion: `Например: ${this.expandShortHex(value)}`,
      })
    }
  }

  /**
   * Проверка tokenColors
   */
  private validateTokenColors(
    tokenColors:
      | TokenColor[]
      | Array<{
          name?: string
          scope: string | string[]
          settings: {
            foreground?: string
            background?: string
            fontStyle?: string
          }
        }>,
    issues: PropertyValidationIssue[]
  ): void {
    if (!Array.isArray(tokenColors)) {
      issues.push({
        property: 'tokenColors',
        severity: 'error',
        message: 'tokenColors должен быть массивом',
      })
      return
    }

    tokenColors.forEach((token, index) => {
      if (!token.scope && !token.name) {
        issues.push({
          property: `tokenColors[${index}]`,
          severity: 'error',
          message: 'Токен должен содержать поле "scope" или "name"',
        })
      }

      if (token.settings) {
        if (token.settings.foreground) {
          this.validateColorValue(
            `tokenColors[${index}].settings.foreground`,
            token.settings.foreground,
            issues
          )
        }
        if (token.settings.background) {
          this.validateColorValue(
            `tokenColors[${index}].settings.background`,
            token.settings.background,
            issues
          )
        }
      }
    })
  }

  /**
   * Проверка semanticTokenColors
   */
  private validateSemanticTokenColors(
    semanticTokenColors:
      | Record<string, SemanticTokenStyle>
      | Record<
          string,
          {
            foreground?: string
            background?: string
            fontStyle?: string
            bold?: boolean
            italic?: boolean
            underline?: boolean
            strikethrough?: boolean
          }
        >,
    issues: PropertyValidationIssue[]
  ): void {
    for (const [tokenType, settings] of Object.entries(semanticTokenColors)) {
      if (typeof settings === 'object' && settings !== null) {
        if (settings.foreground) {
          this.validateColorValue(
            `semanticTokenColors.${tokenType}.foreground`,
            settings.foreground,
            issues
          )
        }
        if (settings.background) {
          this.validateColorValue(
            `semanticTokenColors.${tokenType}.background`,
            settings.background,
            issues
          )
        }
      }
    }
  }

  /**
   * Поиск похожего свойства
   */
  private findSimilarProperty(property: string): string | null {
    const allProperties = Array.from(ALLOWED_THEME_PROPERTIES)

    // Точное совпадение без учета регистра
    const exactMatch = allProperties.find(
      (p) => p.toLowerCase() === property.toLowerCase()
    )
    if (exactMatch) return exactMatch

    // Поиск по подстроке
    const substringMatch = allProperties.find(
      (p) =>
        p.toLowerCase().includes(property.toLowerCase()) ||
        property.toLowerCase().includes(p.toLowerCase())
    )
    if (substringMatch) return substringMatch

    // Поиск по расстоянию Левенштейна
    let minDistance = Infinity
    let bestMatch: string | null = null

    for (const allowedProperty of allProperties) {
      const distance = this.levenshteinDistance(
        property.toLowerCase(),
        allowedProperty.toLowerCase()
      )
      if (distance < minDistance && distance <= 3) {
        // Максимум 3 изменения
        minDistance = distance
        bestMatch = allowedProperty
      }
    }

    return bestMatch
  }

  /**
   * Расчет расстояния Левенштейна
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // замена
            matrix[i][j - 1] + 1, // вставка
            matrix[i - 1][j] + 1 // удаление
          )
        }
      }
    }

    return matrix[str2.length][str1.length]
  }

  /**
   * Расширение короткого hex-цвета
   */
  private expandShortHex(shortHex: string): string {
    if (shortHex.length === 4) {
      const [, r, g, b] = shortHex
      return `#${r}${r}${g}${g}${b}${b}`
    }
    return shortHex
  }

  /**
   * Добавление номеров строк к issues
   */
  private addLineNumbers(
    content: string,
    issues: PropertyValidationIssue[]
  ): void {
    const lines = content.split('\n')

    for (const issue of issues) {
      if (issue.property && issue.property !== 'file') {
        // Ищем строку с данным свойством
        const propertyName = issue.property.split('.')[0].split('[')[0]
        const lineIndex = lines.findIndex(
          (line) => line.includes(`"${propertyName}"`) && line.includes(':')
        )

        if (lineIndex !== -1) {
          issue.line = lineIndex + 1
        }
      }
    }
  }

  /**
   * Генерация отчета валидации
   */
  generateReport(result: PropertyValidationResult): string {
    const { passed, issues } = result

    let report = passed
      ? '✅ Валидация свойств прошла успешно!\n\n'
      : '❌ Валидация свойств не пройдена!\n\n'

    if (issues.length === 0) {
      report += 'Проблем не найдено.'
      return report
    }

    const errorCount = issues.filter((i) => i.severity === 'error').length
    const warningCount = issues.filter((i) => i.severity === 'warning').length
    const infoCount = issues.filter((i) => i.severity === 'info').length

    report += `Найдено проблем: ${issues.length}\n`
    if (errorCount > 0) report += `🔴 Ошибки: ${errorCount}\n`
    if (warningCount > 0) report += `🟡 Предупреждения: ${warningCount}\n`
    if (infoCount > 0) report += `🔵 Информация: ${infoCount}\n`
    report += '\n'

    // Группируем по типу серьезности
    const groupedIssues = {
      error: issues.filter((i) => i.severity === 'error'),
      warning: issues.filter((i) => i.severity === 'warning'),
      info: issues.filter((i) => i.severity === 'info'),
    }

    for (const [severity, severityIssues] of Object.entries(groupedIssues)) {
      if (severityIssues.length === 0) continue

      const icon =
        severity === 'error' ? '🔴' : severity === 'warning' ? '🟡' : '🔵'
      const title =
        severity === 'error'
          ? 'ОШИБКИ'
          : severity === 'warning'
          ? 'ПРЕДУПРЕЖДЕНИЯ'
          : 'ИНФОРМАЦИЯ'

      report += `${icon} ${title}:\n`

      for (const issue of severityIssues) {
        const line = issue.line ? ` (строка ${issue.line})` : ''
        report += `  • ${issue.property}${line}: ${issue.message}\n`
        if (issue.suggestion) {
          report += `    💡 ${issue.suggestion}\n`
        }
      }
      report += '\n'
    }

    return report
  }

  /**
   * Исправление недопустимых свойств
   */
  fixInvalidProperties(theme: ThemeData | VSCodeThemeObject): {
    fixedTheme: VSCodeThemeObject
    fixes: Array<{
      property: string
      action: string
      oldValue?: string
      newValue?: string
    }>
  } {
    const fixes: Array<{
      property: string
      action: string
      oldValue?: string
      newValue?: string
    }> = []
    const fixedTheme = JSON.parse(JSON.stringify(theme)) // Глубокая копия

    if (fixedTheme.colors) {
      const colorsToRemove: string[] = []
      const colorsToRename: Array<{ old: string; new: string }> = []

      for (const [property, value] of Object.entries(fixedTheme.colors)) {
        // Удаляем устаревшие свойства
        if (DEPRECATED_PROPERTIES.has(property)) {
          colorsToRemove.push(property)
          fixes.push({
            property,
            action: 'removed',
            oldValue: value as string,
          })
          continue
        }

        // Переименовываем свойства
        if (RENAMED_PROPERTIES.has(property)) {
          const newProperty = RENAMED_PROPERTIES.get(property)!
          colorsToRename.push({ old: property, new: newProperty })
          fixes.push({
            property,
            action: 'renamed',
            oldValue: property,
            newValue: newProperty,
          })
          continue
        }

        // Удаляем неизвестные свойства
        if (!ALLOWED_THEME_PROPERTIES.has(property)) {
          colorsToRemove.push(property)
          fixes.push({
            property,
            action: 'removed',
            oldValue: value as string,
          })
        }
      }

      // Применяем исправления
      for (const property of colorsToRemove) {
        delete fixedTheme.colors[property]
      }

      for (const { old, new: newProp } of colorsToRename) {
        fixedTheme.colors[newProp] = fixedTheme.colors[old]
        delete fixedTheme.colors[old]
      }
    }

    return { fixedTheme, fixes }
  }
}

/**
 * Утилитарные функции для валидации
 */
export class PropertyValidationUtils {
  /**
   * Быстрая проверка одного свойства
   */
  static isValidProperty(property: string): boolean {
    return ALLOWED_THEME_PROPERTIES.has(property)
  }

  /**
   * Получить список всех допустимых свойств
   */
  static getAllowedProperties(): string[] {
    return Array.from(ALLOWED_THEME_PROPERTIES).sort()
  }

  /**
   * Получить список устаревших свойств
   */
  static getDeprecatedProperties(): string[] {
    return Array.from(DEPRECATED_PROPERTIES).sort()
  }

  /**
   * Получить маппинг переименованных свойств
   */
  static getRenamedProperties(): Map<string, string> {
    return new Map(RENAMED_PROPERTIES)
  }

  /**
   * Поиск свойств по категории
   */
  static findPropertiesByCategory(category: string): string[] {
    return Array.from(ALLOWED_THEME_PROPERTIES)
      .filter((prop) => prop.toLowerCase().includes(category.toLowerCase()))
      .sort()
  }
}
