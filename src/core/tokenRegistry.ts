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
export interface ContrastHints {
  // advisory минимальные пороги для текста на поверхности
  primaryMin?: number
  mutedMin?: number
  subtleMin?: number
}

export interface TokenMeta {
  key: string
  surface?: Surface
  alpha?: AlphaPolicy
  deprecated?: boolean
  // если ключ является алиасом другого токена (для обратной совместимости)
  aliasOf?: string
  // рекомендованные пороги контраста (advisory)
  contrastHints?: ContrastHints
  // ключ фоновой поверхности, относительно которой измеряется контраст
  bgKey?: string
  // дополнительная заметка для документации (пояснение порогов/причин)
  notes?: string
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
  // selection/focus/active семейство — допускаем прозрачность (лучше восприятие слоёв)
  { key: 'editor.selectionBackground', surface: 'base', alpha: 'transparent' },
  {
    key: 'list.activeSelectionBackground',
    surface: 'list',
    alpha: 'transparent',
  },
  {
    key: 'list.inactiveSelectionBackground',
    surface: 'list',
    alpha: 'transparent',
  },
  {
    key: 'editor.inactiveSelectionBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  { key: 'menubar.selectionBackground', surface: 'menu', alpha: 'transparent' },
  { key: 'menu.selectionBackground', surface: 'menu', alpha: 'transparent' },
  { key: 'scrollbarSlider.background', surface: 'base', alpha: 'transparent' },
  {
    key: 'scrollbarSlider.hoverBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'scrollbarSlider.activeBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  { key: 'minimapSlider.background', surface: 'base', alpha: 'transparent' },
  {
    key: 'minimapSlider.hoverBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'minimapSlider.activeBackground',
    surface: 'base',
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
  // Peek View highlights should be non-opaque as well
  {
    key: 'peekViewEditor.matchHighlightBackground',
    surface: 'overlay',
    alpha: 'transparent',
  },
  {
    key: 'peekViewResult.matchHighlightBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'peekViewResult.selectionBackground',
    surface: 'base',
    alpha: 'transparent',
  },

  // Word/Range highlights: мягкие подложки — прозрачные
  {
    key: 'editor.wordHighlightBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'editor.wordHighlightStrongBackground',
    surface: 'base',
    alpha: 'transparent',
  },
  {
    key: 'editor.rangeHighlightBackground',
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

  // Text roles on overlay: задать advisory пороги контраста
  {
    key: 'editorHoverWidget.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5, mutedMin: 3.0 },
    bgKey: 'editorHoverWidget.background',
    notes:
      'Overlay widgets: primary text should reach ~WCAG AA (4.5) over overlay bg; muted at least 3.0',
  },
  {
    key: 'editorSuggestWidgetStatus.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'editorSuggestWidget.background',
  },
  {
    key: 'editorSuggestWidget.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'editorSuggestWidget.background',
  },

  // Base surface text
  {
    key: 'activityBar.inactiveForeground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'activityBar.background',
  },
  {
    key: 'tab.unfocusedInactiveForeground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'tab.unfocusedInactiveBackground',
  },
  {
    key: 'editorWidget.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'editorWidget.background',
  },
  {
    key: 'quickInput.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'quickInput.background',
  },
  {
    key: 'menu.foreground',
    surface: 'menu',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'menu.background',
  },
  {
    key: 'menu.selectionForeground',
    surface: 'menu',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'menu.background',
  },
  {
    key: 'panelTitle.inactiveForeground',
    surface: 'panel',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'panel.background',
  },
  {
    key: 'panelTitle.activeForeground',
    surface: 'panel',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'panel.background',
  },
  // PeekView title text
  {
    key: 'peekViewTitleLabel.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'peekViewTitle.background',
    notes: 'Title label should remain readable over overlay title background',
  },
  {
    key: 'peekViewTitleDescription.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'peekViewTitle.background',
    notes: 'Description text can be muted but should stay >=3.0',
  },
  // SideBar section header
  {
    key: 'sideBarSectionHeader.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.0 },
    bgKey: 'sideBarSectionHeader.background',
    notes: 'Headers over elevated background should be clearly readable',
  },
  // Notifications header
  {
    key: 'notificationCenterHeader.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'notificationCenterHeader.background',
  },
  // Terminal initial hint (placeholder-style)
  {
    key: 'terminal.initialHintForeground',
    surface: 'terminal',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'terminal.background',
  },
  {
    key: 'breadcrumb.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'breadcrumb.background',
  },
  {
    key: 'statusBar.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'statusBar.background',
  },
  {
    key: 'activityBar.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'activityBar.background',
  },
  {
    key: 'sideBar.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.0 },
    bgKey: 'sideBar.background',
  },
  {
    key: 'sideBarTitle.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'sideBar.background',
  },
  {
    key: 'editor.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { primaryMin: 7.0 },
    bgKey: 'editor.background',
    notes:
      'Editor text vs editor background: aim higher (~7.0) for code readability',
  },
  {
    key: 'statusBar.foreground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { mutedMin: 3.0 },
    bgKey: 'statusBar.background',
  },
  {
    key: 'statusBarItem.hoverForeground',
    surface: 'base',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'statusBar.background',
  },
  {
    key: 'quickInput.foreground',
    surface: 'overlay',
    alpha: 'opaque',
    contrastHints: { primaryMin: 4.5 },
    bgKey: 'quickInput.background',
  },

  // Aliases / legacy (пример): нет в текущей теме, но оставим как образец поля aliasOf
  {
    key: 'editorIndentGuide.background',
    aliasOf: 'editorIndentGuide.background1',
    deprecated: true,
  },
  {
    key: 'editorIndentGuide.activeBackground',
    aliasOf: 'editorIndentGuide.activeBackground1',
    deprecated: true,
  },
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
