/**
 * Реестр токенов VS Code с метаданными и валидатором.
 */

export type Surface =
  | 'base'
  | 'elevated'
  | 'overlay'
  | 'terminal'
  | 'panel'
  | 'menu'
  | 'list'
  | 'statusBar'
  | 'tabs'
  | 'editor'
  | 'quickInput'
export type AlphaPolicy = 'opaque' | 'transparent' | 'either'

export interface TokenMeta {
  key: string
  surface?: Surface
  alpha?: AlphaPolicy
  deprecated?: boolean
}

// Минимальный набор чувствительных токенов + примеры групп
export const TOKEN_REGISTRY: TokenMeta[] = [
  // Transparent-only overlays
  { key: 'editorGroup.dropBackground', surface: 'base', alpha: 'transparent' },
  {
    key: 'panelSection.dropBackground',
    surface: 'panel',
    alpha: 'transparent',
  },
  { key: 'terminal.dropBackground', surface: 'terminal', alpha: 'transparent' },
  { key: 'list.dropBackground', surface: 'list', alpha: 'transparent' },
  {
    key: 'editor.hoverHighlightBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'terminal.hoverHighlightBackground',
    surface: 'terminal',
    alpha: 'transparent',
  },
  // Matches and search in lists/editors should be non-opaque
  { key: 'list.filterMatchBackground', surface: 'list', alpha: 'transparent' },
  {
    key: 'searchEditor.findMatchBackground',
    surface: 'editor',
    alpha: 'transparent',
  },

  // Find/search highlights should be non-opaque
  {
    key: 'editor.findMatchHighlightBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'terminal.findMatchHighlightBackground',
    surface: 'terminal',
    alpha: 'transparent',
  },
  {
    key: 'searchEditor.findMatchBackground',
    surface: 'base',
    alpha: 'transparent',
  },

  // Examples of opaque-allowed
  { key: 'editor.background', surface: 'base', alpha: 'opaque' },
  { key: 'panel.background', surface: 'panel', alpha: 'opaque' },
  { key: 'menu.background', surface: 'menu', alpha: 'opaque' },
  // Overlay widgets (opaque backgrounds)
  { key: 'editorHoverWidget.background', surface: 'overlay', alpha: 'opaque' },
  {
    key: 'editorSuggestWidget.background',
    surface: 'overlay',
    alpha: 'opaque',
  },
  { key: 'quickInput.background', surface: 'quickInput', alpha: 'opaque' },
]

// Простая проверка альфа-политики для hex (#RRGGBB[AA])
export const isTransparentHex = (hex: string) =>
  /^#?[0-9a-fA-F]{8}$/.test(hex) && !hex.toLowerCase().endsWith('ff')
export const isOpaqueHex = (hex: string) =>
  /^#?[0-9a-fA-F]{6}$/.test(hex) || hex.toLowerCase().endsWith('ff')

export const validateTokenAlpha = (
  key: string,
  value: string,
  policy: AlphaPolicy
): boolean => {
  if (policy === 'either') return true
  if (policy === 'transparent') return isTransparentHex(value)
  if (policy === 'opaque') return isOpaqueHex(value)
  return true
}

// Coverage helper (optional use in tests): check presence
export const hasToken = (
  colors: Record<string, string>,
  key: string
): boolean => Object.prototype.hasOwnProperty.call(colors, key)
