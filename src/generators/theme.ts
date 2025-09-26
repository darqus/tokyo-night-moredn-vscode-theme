/**
 * Генератор финальной темы VS Code с улучшенной архитектурой
 */
import { interfacePalette } from '../core/interface'
import { generateTokenColors, generateSemanticTokens } from './tokens'
import { SURFACE_FOREGROUND_MAP } from './surfaceForeground'
import { createTokens } from './modernInterfaceMapping'
import { warmupColorCache } from '../core/colorEngine'
import type { VSCodeTheme } from '../types/theme'
import type { IPaletteManager } from '../core/interfaces/IPaletteManager'
import { readFileSync } from 'fs'
import { join } from 'path'

// Тип для переменных окружения темы
interface ThemeEnvVars {
  THEME_NAME: string
  THEME_DISPLAY_NAME: string
  THEME_DESCRIPTION: string
  THEME_VERSION: string
  THEME_AUTHOR: string
  THEME_PUBLISHER: string
  THEME_LICENSE: string
  THEME_REPOSITORY_URL: string
  THEME_BUGS_URL: string
  THEME_CATEGORIES: string
  THEME_KEYWORDS: string
  THEME_FILENAME: string
  THEME_TYPE: 'dark' | 'light'
}

// Загрузка переменных окружения
export const loadEnvVars = (): ThemeEnvVars => {
  const env = process.env
  const pkgPath = join(process.cwd(), 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  const themeType = env.THEME_TYPE || 'dark'

  return {
    THEME_NAME: env.THEME_NAME || pkg.name,
    THEME_DISPLAY_NAME: env.THEME_DISPLAY_NAME || pkg.displayName,
    THEME_DESCRIPTION: env.THEME_DESCRIPTION || pkg.description,
    THEME_VERSION: env.THEME_VERSION || pkg.version,
    THEME_AUTHOR: env.THEME_AUTHOR || pkg.author,
    THEME_PUBLISHER: env.THEME_PUBLISHER || pkg.publisher,
    THEME_LICENSE: env.THEME_LICENSE || pkg.license,
    THEME_REPOSITORY_URL: env.THEME_REPOSITORY_URL || pkg.repository?.url,
    THEME_BUGS_URL: env.THEME_BUGS_URL || pkg.bugs?.url,
    THEME_CATEGORIES: env.THEME_CATEGORIES || (pkg.categories || []).join(','),
    THEME_KEYWORDS: env.THEME_KEYWORDS || (pkg.keywords || []).join(','),
    THEME_FILENAME:
      env.THEME_FILENAME || 'tokyo-night-modern-color-theme',
    THEME_TYPE: themeType === 'light' ? 'light' : 'dark',
  }
}

/**
 * Генерация всех цветов интерфейса VS Code с использованием нового DSL
 */
const generateInterfaceColors = (paletteManager: IPaletteManager) => {
  // Получаем текущую интерфейсную палитру из менеджера
  const currentInterfacePalette = paletteManager.getInterfacePalette()
  
  // Прогрев кэша для производительности с базовыми цветами интерфейса
  const baseColors = [
    currentInterfacePalette.bg.base,
    currentInterfacePalette.text.primary,
    currentInterfacePalette.text.muted,
    currentInterfacePalette.border.default,
    currentInterfacePalette.state.info,
    currentInterfacePalette.state.error,
    currentInterfacePalette.state.warning,
    currentInterfacePalette.state.success,
  ]
  warmupColorCache(baseColors)

  // Создаем цвета через новый декларативный DSL
  const colors = createTokens(currentInterfacePalette)

  // Применяем единый маппинг для surface-aware foreground-токенов (legacy совместимость)
  for (const [key, resolver] of Object.entries(SURFACE_FOREGROUND_MAP)) {
    // Только если токен не был определен через DSL
    if (!(key in colors)) {
      colors[key] = resolver(currentInterfacePalette)
    }
  }

  return colors
}

/**
 * Генерация финальной темы
 */
export const generateTheme = (config: ThemeEnvVars, paletteManager?: IPaletteManager): VSCodeTheme => {
  // Если палитра не передана, используем стандартную
  const interfaceColors = paletteManager 
    ? generateInterfaceColors(paletteManager)
    : generateInterfaceColors(new (class implements IPaletteManager {
        getInterfacePalette() { return interfacePalette }
        getSyntaxPalette() { return { } as any }
        getRichSyntaxPalette() { return { } as any }
        updateInterfacePalette() {}
        updateSyntaxPalette() {}
        updateRichSyntaxPalette() {}
        validatePalette() { return true }
        getValidationErrors() { return [] }
        exportPalette() { return '' }
        importPalette() { return false }
        generateDerivedColors() {}
        optimizeForAccessibility() {}
      })())
      
  return {
    name: config.THEME_DISPLAY_NAME,
    type: config.THEME_TYPE,
    colors: interfaceColors,
    tokenColors: generateTokenColors(),
    semanticTokenColors: generateSemanticTokens(),
  }
}
