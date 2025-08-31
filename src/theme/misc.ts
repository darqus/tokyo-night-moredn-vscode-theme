import { palette, core, basePalette } from '../palette'

export const getMiscColors = () => ({
  // Панели - соответствует оригинальной Tokyo Night
  'panel.background': basePalette.panelBg, // #16161e как в оригинале
  'panel.border': palette.line.border,
  'panelTitle.activeForeground': palette.fg.muted, // #787c99 как в оригинале
  'panelTitle.inactiveForeground': palette.fg.inactive,
  'panelTitle.activeBorder': palette.line.border,
  'panelInput.border': palette.line.border,
  'panelSection.border': palette.line.border,
  'panelSectionHeader.foreground': palette.fg.primary,
  'panelSectionHeader.background': palette.bg.elevated,
  'panelSectionHeader.border': palette.line.border,
  'panelStickyScroll.background': palette.bg.elevated,
  'panelStickyScroll.border': palette.line.border,

  // Кнопки в контролах (поиск, замена и т.д.)
  'toolbar.hoverBackground': core.tokens.toolbarHoverBackground, // Фон при наведении на кнопки тулбара
  'toolbar.activeBackground': core.tokens.toolbarActiveBackground, // Фон активной кнопки тулбара

  // Хлебные крошки
  'breadcrumb.background': palette.bg.base,
  'breadcrumbPicker.background': palette.bg.elevated, // Немного отличается от основного фона
  'breadcrumb.foreground': palette.ui.breadcrumb, // Контрастный серый
  'breadcrumb.focusForeground': palette.fg.selectionText, // Белый для фокуса
  'breadcrumb.activeSelectionForeground': palette.fg.selectionText, // Белый для активного выбора
})
