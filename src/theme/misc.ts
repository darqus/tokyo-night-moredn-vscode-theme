import { palette, core, basePalette } from '../palette'
import {
  getAdaptiveBaseBackground,
  getAdaptiveWidgetBackground,
} from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export const getMiscColors = (context?: ThemeContext) => {
  // Адаптивные фоны для панелей и заголовков
  const baseBackground = getAdaptiveBaseBackground(context)
  const widgetBackground = getAdaptiveWidgetBackground(context)

  return {
    // Панели - соответствует оригинальной Tokyo Night
    'panel.background': basePalette.panelBg, // #16161e как в оригинале
    'panel.border': palette.line.border,
    'panelTitle.activeForeground': palette.fg.muted, // #787c99 как в оригинале
    'panelTitle.inactiveForeground': palette.fg.inactive,
    'panelTitle.activeBorder': palette.line.border,
    'panelInput.border': palette.line.border,
    'panelSection.border': palette.line.border,
    'panelSectionHeader.foreground': palette.fg.primary,
    'panelSectionHeader.background': baseBackground, // АДАПТИВНЫЙ фон заголовков панелей
    'panelSectionHeader.border': palette.line.border,
    'panelStickyScroll.background': widgetBackground, // АДАПТИВНЫЙ фон для sticky scroll
    'panelStickyScroll.border': palette.line.border,

    // Кнопки в контролах (поиск, замена и т.д.)
    'toolbar.hoverBackground': core.tokens.toolbarHoverBackground, // Фон при наведении на кнопки тулбара
    'toolbar.activeBackground': core.tokens.toolbarActiveBackground, // Фон активной кнопки тулбара

    // Хлебные крошки - АДАПТИВНЫЕ фоны
    'breadcrumb.background': widgetBackground, // АДАПТИВНЫЙ фон хлебных крошек
    'breadcrumbPicker.background': widgetBackground, // АДАПТИВНЫЙ фон выборщика хлебных крошек
    'breadcrumb.foreground': palette.ui.breadcrumb, // Контрастный серый
    'breadcrumb.focusForeground': palette.fg.selectionText, // Белый для фокуса
    'breadcrumb.activeSelectionForeground': palette.fg.selectionText, // Белый для активного выбора
  }
}
