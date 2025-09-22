/**
 * Генератор финальной темы VS Code с улучшенной архитектурой
 */
import { interfacePalette } from '../core/interface'
import { generateTokenColors, generateSemanticTokens } from './tokens'
import { SURFACE_FOREGROUND_MAP } from './surfaceForeground'
import { createTokens } from './modernInterfaceMapping'
import { warmupColorCache } from '../core/colorEngine'
import type { VSCodeTheme } from '../types/theme'

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
  const themeType = env.THEME_TYPE || 'dark'

  return {
    THEME_NAME: env.THEME_NAME || 'tokyo-night-modern',
    THEME_DISPLAY_NAME: env.THEME_DISPLAY_NAME || 'Tokyo Night Modern',
    THEME_DESCRIPTION:
      env.THEME_DESCRIPTION ||
      'Beautiful modern dark theme for VS Code with carefully crafted colors and contemporary design',
    THEME_VERSION: env.THEME_VERSION || '1.14.54',
    THEME_AUTHOR: env.THEME_AUTHOR || 'lod',
    THEME_PUBLISHER: env.THEME_PUBLISHER || 'lod-inc',
    THEME_LICENSE: env.THEME_LICENSE || 'MIT',
    THEME_REPOSITORY_URL:
      env.THEME_REPOSITORY_URL ||
      'https://github.com/darqus/tokyo-night-modern-vscode-theme',
    THEME_BUGS_URL:
      env.THEME_BUGS_URL ||
      'https://github.com/darqus/tokyo-night-modern-vscode-theme/issues',
    THEME_CATEGORIES: env.THEME_CATEGORIES || 'Themes',
    THEME_KEYWORDS: env.THEME_KEYWORDS || 'theme,tokyo,night,dark',
    THEME_FILENAME: env.THEME_FILENAME || 'tokyo-night-modern-color-theme',
    THEME_TYPE: themeType === 'light' ? 'light' : 'dark',
  }
}

/**
 * Генерация всех цветов интерфейса VS Code с использованием нового DSL
 */
const generateInterfaceColors = () => {
  // Прогрев кэша для производительности с базовыми цветами интерфейса
  const baseColors = [
    interfacePalette.bg.base,
    interfacePalette.text.primary,
    interfacePalette.text.muted,
    interfacePalette.border.default,
    interfacePalette.state.info,
    interfacePalette.state.error,
    interfacePalette.state.warning,
    interfacePalette.state.success,
  ]
  warmupColorCache(baseColors)

  // Создаем цвета через новый декларативный DSL
  const colors = createTokens(interfacePalette)

  // Применяем единый маппинг для surface-aware foreground-токенов (legacy совместимость)
  for (const [key, resolver] of Object.entries(SURFACE_FOREGROUND_MAP)) {
    // Только если токен не был определен через DSL
    if (!(key in colors)) {
      colors[key] = resolver(interfacePalette)
    }
  }

  return colors
}

/**
 * Генерация финальной темы
 */
export const generateTheme = (config: ThemeEnvVars): VSCodeTheme => {
  return {
    name: config.THEME_DISPLAY_NAME,
    type: config.THEME_TYPE,
    colors: generateInterfaceColors(),
    tokenColors: generateTokenColors(),
    semanticTokenColors: generateSemanticTokens(),
  }
}
