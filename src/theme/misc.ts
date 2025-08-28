import { palette } from '../palette'
import {
  toolbarHoverBackground,
  toolbarActiveBackground,
} from '../palette'

export const getMiscColors = () => ({
  // Панели
  'panel.background': palette.bg.base,
  'panel.border': palette.line.border,
  'panelTitle.activeForeground': palette.fg.activeTitle,
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
  'toolbar.hoverBackground': toolbarHoverBackground, // Фон при наведении на кнопки тулбара
  'toolbar.activeBackground': toolbarActiveBackground, // Фон активной кнопки тулбара

  // Хлебные крошки
  'breadcrumb.background': palette.bg.base,
  'breadcrumbPicker.background': palette.bg.elevated, // Немного отличается от основного фона
  'breadcrumb.foreground': palette.ui.breadcrumb, // Контрастный серый
  'breadcrumb.focusForeground': palette.fg.selectionText, // Белый для фокуса
  'breadcrumb.activeSelectionForeground': palette.fg.selectionText, // Белый для активного выбора
})
