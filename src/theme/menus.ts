import { palette } from '../palette'
import { menuBorder } from '../palette'

export const getMenuColors = () => ({
  // Меню
  'menubar.selectionForeground': palette.fg.selectionText, // Текст выбранного элемента менюбара
  'menubar.selectionBackground': palette.brand.button.primary, // Фон выбранного элемента менюбара
  'menubar.selectionBorder': palette.line.menu, // Граница выбранного элемента менюбара
  'menu.foreground': palette.fg.soft, // Основной текст меню
  'menu.background': palette.bg.overlay, // Фон меню
  'menu.selectionForeground': palette.fg.selectionText, // Текст выбранного элемента меню
  'menu.selectionBackground': palette.brand.button.primary, // Фон выбранного элемента меню
  'menu.separatorBackground': palette.line.border, // Разделитель в меню
  'menu.border': menuBorder, // Граница меню (прозрачная)
})
