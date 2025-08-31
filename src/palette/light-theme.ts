/**
 * Специализированная палитра для светлой темы Tokyo Night Light
 * Обеспечивает правильную контрастность и читаемость
 */

import { Hex } from '../types'

/**
 * Цвета текста для светлой темы
 * Используем темные цвета для хорошего контраста на светлом фоне
 */
export const lightThemeTextColors = {
  // Основные цвета текста (более контрастные)
  primary: '#1f2328' as Hex, // Очень темно-серый для основного текста (улучшенный контраст)
  secondary: '#4c566a' as Hex, // Средний серый для второстепенного текста
  muted: '#3d4752' as Hex, // Приглушенный темно-серый (улучшенный контраст)
  disabled: '#8fbcbb' as Hex, // Светло-синий для отключенных элементов

  // Акцентные цвета (адаптированные для светлого фона)
  accent: '#5e81ac' as Hex, // Основной акцент (синий)
  accentHover: '#81a1c1' as Hex, // Акцент при наведении
  link: '#0969da' as Hex, // Ссылки (GitHub синий)
  linkHover: '#0550ae' as Hex, // Ссылки при наведении

  // Семантические цвета
  success: '#28a745' as Hex, // Успех (зеленый)
  warning: '#ffc107' as Hex, // Предупреждение (желтый)
  error: '#dc3545' as Hex, // Ошибка (красный)
  info: '#17a2b8' as Hex, // Информация (голубой)

  // Специальные элементы
  brand: '#0969da' as Hex, // Брендовый цвет
  selection: '#ffffff' as Hex, // Текст на выделенном фоне
  inverse: '#ffffff' as Hex, // Инвертированный текст
} as const

/**
 * Цвета фона для светлой темы
 */
export const lightThemeBackgroundColors = {
  // Основные фоны
  primary: '#ffffff' as Hex, // Белый основной фон
  secondary: '#f8f9fa' as Hex, // Очень светло-серый
  tertiary: '#f1f3f4' as Hex, // Светло-серый
  elevated: '#ffffff' as Hex, // Приподнятые элементы

  // Панели и боковые элементы
  sidebar: '#f8f9fa' as Hex, // Боковая панель
  activitybar: '#e9ecef' as Hex, // Панель активности
  statusbar: '#f1f3f4' as Hex, // Строка состояния
  titlebar: '#ffffff' as Hex, // Заголовок окна

  // Интерактивные элементы
  button: '#0969da' as Hex, // Кнопки
  buttonHover: '#0550ae' as Hex, // Кнопки при наведении
  buttonSecondary: '#f1f3f4' as Hex, // Вторичные кнопки
  input: '#ffffff' as Hex, // Поля ввода

  // Состояния
  hover: '#f1f3f4' as Hex, // Наведение
  active: '#e9ecef' as Hex, // Активное состояние
  selection: '#0969da' as Hex, // Выделение
  focus: '#0969da1a' as Hex, // Фокус (с прозрачностью)

  // Границы
  border: '#d1d5da' as Hex, // Основные границы
  borderLight: '#e1e4e8' as Hex, // Светлые границы
  borderDark: '#c6cbd1' as Hex, // Темные границы
} as const

/**
 * Создает адаптированную палитру для светлой темы
 */
export function createLightThemePalette() {
  return {
    text: lightThemeTextColors,
    background: lightThemeBackgroundColors,

    // Совместимость с существующей системой
    foreground: lightThemeTextColors.primary,
    'editor.background': lightThemeBackgroundColors.primary,
    'editor.foreground': lightThemeTextColors.primary,

    // Заголовки и панели
    'titleBar.activeForeground': lightThemeTextColors.primary,
    'titleBar.activeBackground': lightThemeBackgroundColors.titlebar,

    // Командный центр
    'commandCenter.foreground': lightThemeTextColors.primary,
    'commandCenter.background': lightThemeBackgroundColors.primary,

    // Баннеры и уведомления
    'banner.foreground': lightThemeTextColors.primary,
    'banner.background': lightThemeBackgroundColors.secondary,

    // Ссылки
    'textLink.foreground': lightThemeTextColors.link,
    'textLink.activeForeground': lightThemeTextColors.linkHover,

    // Настройки
    'settings.headerForeground': lightThemeTextColors.secondary,

    // Кнопки
    'button.foreground': lightThemeTextColors.inverse,
    'button.background': lightThemeBackgroundColors.button,

    // Расширения
    'extensionButton.prominentForeground': lightThemeTextColors.inverse,
    'extensionButton.prominentBackground': lightThemeBackgroundColors.button,

    // Панели
    'sideBar.foreground': lightThemeTextColors.primary,
    'sideBar.background': lightThemeBackgroundColors.sidebar,

    'activityBar.foreground': lightThemeTextColors.secondary,
    'activityBar.background': lightThemeBackgroundColors.activitybar,

    'statusBar.foreground': lightThemeTextColors.primary, // Максимально контрастный для светлой темы
    'statusBar.background': lightThemeBackgroundColors.statusbar,

    // Вкладки
    'tab.activeForeground': lightThemeTextColors.primary,
    'tab.activeBackground': lightThemeBackgroundColors.primary,
    'tab.inactiveForeground': lightThemeTextColors.muted,
    'tab.inactiveBackground': lightThemeBackgroundColors.secondary,
  }
}

export type LightThemePalette = ReturnType<typeof createLightThemePalette>
