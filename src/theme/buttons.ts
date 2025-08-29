import { palette, buttonBorder, buttonSeparator } from '../palette'

export const getButtonColors = () => ({
  // Кнопки / индикатор выполнения - улучшенный контраст
  'button.background': palette.brand.button.primary,
  'button.hoverBackground': palette.brand.button.hover,
  'button.foreground': palette.fg.selectionText,
  'button.border': buttonBorder, // Увеличена видимость границы
  'button.separator': buttonSeparator, // Увеличена видимость разделителя
  'button.secondaryBackground': palette.brand.button.primary,
  'button.secondaryHoverBackground': palette.brand.button.hover,
  'button.secondaryForeground': palette.fg.selectionText,
  'progressBar.background': palette.brand.primary,
})
