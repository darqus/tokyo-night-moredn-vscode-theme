/**
 * Декларативная конфигурация темы Tokyo Night
 * Реализует подход с централизованной настройкой всех аспектов темы
 */

import type { 
  InterfacePalette, 
  SyntaxPalette, 
  RichSyntaxPalette 
} from './types/theme'
import type { basePalette } from './core/palette'
type BasePalette = typeof basePalette
import { TokyoNightSchemeFactory } from './core/colorSchemeFactory'

// Типы для конфигурации
export interface ThemeConfig {
  name: string
  displayName: string
  type: 'dark' | 'light'
  description: string
  version: string
  base: BasePaletteConfig
  surfaces: SurfaceConfig[]
  tokens: TokenConfig[]
  plugins: PluginConfig[]
}

export interface BasePaletteConfig {
  primary: string
  secondary: string
  accent: string
  success: string
  warning: string
  error: string
  info: string
  // и другие цвета
  [key: string]: string
}

export interface SurfaceConfig {
  name: string
  background: string
  foreground: string
  border?: string
  active?: string
  hover?: string
}

export interface TokenConfig {
  name: string
  source: string
  condition?: string
  description?: string
}

export interface PluginConfig {
  id: string
  enabled: boolean
  options?: Record<string, any>
}

// Пример конфигурации для Tokyo Night
export const tokyoNightConfig: ThemeConfig = {
  name: 'tokyo-night',
  displayName: 'Tokyo Night Modern',
  type: 'dark',
  description: 'Beautiful dark theme with carefully crafted colors',
  version: '2.0.0',
  base: {
    primary: '#7aa2f7',
    secondary: '#bb9af7',
    accent: '#7dcfff',
    success: '#9ece6a',
    warning: '#e0af68',
    error: '#f7768e',
    info: '#7aa2f7',
    // Остальные базовые цвета...
    'bgBase': '#1a1b26',
    'bgElevated': '#16161e',
    'bgOverlay': '#16161e',
    'bgSurface': '#16161e',
    'textPrimary': '#a9b1d6',
    'textSecondary': '#787c99',
    'textMuted': '#414868',
    'textSubtle': '#565a74',
  },
  surfaces: [
    {
      name: 'base',
      background: 'bgBase',
      foreground: 'textPrimary',
      border: '#101014',
    },
    {
      name: 'panel',
      background: '#16161e',
      foreground: 'textPrimary',
      border: '#101014',
    },
    {
      name: 'overlay',
      background: '#16161e',
      foreground: 'textPrimary',
      border: '#101014',
    },
    // Другие поверхности...
  ],
  tokens: [
    {
      name: 'editor.background',
      source: 'bgBase',
      description: 'Background color of the editor',
    },
    {
      name: 'editor.foreground',
      source: 'textPrimary',
      description: 'Default foreground color of the editor',
    },
    {
      name: 'activityBar.background',
      source: 'bgElevated',
      description: 'Background color of the activity bar',
    },
    // Другие токены...
  ],
  plugins: [
    {
      id: 'custom-accent-plugin',
      enabled: true,
      options: {
        accentColor: '#ff6b6b',
      }
    },
    {
      id: 'high-contrast-plugin',
      enabled: false,
    }
  ]
}

// Конфигурация для светлой темы
export const tokyoNightLightConfig: ThemeConfig = {
  ...tokyoNightConfig,
  name: 'tokyo-night-light',
  displayName: 'Tokyo Night Light',
  type: 'light',
  description: 'Beautiful light theme with carefully crafted colors',
  base: {
    ...tokyoNightConfig.base,
    'bgBase': '#ffffff',
    'bgElevated': '#f8fafc',
    'bgOverlay': '#ffffff',
    'bgSurface': '#f1f5f9',
    'textPrimary': '#0f172a',
    'textSecondary': '#334155',
    'textMuted': '#64748b',
    'textSubtle': '#94a3b8',
  },
  surfaces: tokyoNightConfig.surfaces.map(surface => (surface.name === 'base' ? 
    { ...surface, background: 'bgBase', foreground: 'textPrimary' } : surface
  )),
}

// Функция для генерации палитры из конфигурации (упрощённая реализация)
export const generatePalettesFromConfig = (config: ThemeConfig): {
  base: BasePalette,
  interface: InterfacePalette,
  syntax: SyntaxPalette, 
  richSyntax: RichSyntaxPalette
} => {
  // В реальной реализации здесь будет логика преобразования строковых значений 
  // конфигурации в типизированные палитры с валидацией
  
  // Пока что возвращаем базовые палитры, т.к. в реальном сценарии
  // нужно будет реализовать систему валидации и преобразования строк в Hex-значения
  const factory = new TokyoNightSchemeFactory()
  return factory.createAllPalettes()
}

// Функция для загрузки конфигурации из внешнего источника (например, JSON файла)
export const loadConfig = (configName: string): ThemeConfig | null => {
  // В реальной реализации это может загружать конфигурацию из JSON файла или другого источника
  switch(configName) {
    case 'tokyo-night':
      return tokyoNightConfig
    case 'tokyo-night-light':
      return tokyoNightLightConfig
    default:
      return null
  }
}