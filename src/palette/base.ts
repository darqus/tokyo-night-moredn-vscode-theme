import { Hex } from '../types'

/**
 * Основная (базовая) палитра — только фундаментальные цвета,
 * из которых строится вся остальная тема.
 * Соответствует оригинальной Tokyo Night theme.
 */
export const basePalette = {
  // Основные цвета
  black: '#1a1b26' as Hex, // Основной фон темы (исправлено!)
  white: '#c0caf5' as Hex, // Основной текст (исправлено!)

  // Дополнительные фоны
  activityBarBg: '#16161e' as Hex, // Фон активности-бара (как в оригинале)
  statusBarBg: '#16161e' as Hex, // Фон статус-бара (как в оригинале)
  statusBarBorder: '#101014' as Hex, // Граница статус-бара
  terminalBg: '#16161e' as Hex, // Фон терминала (как в оригинале)
  tabActiveBg: '#16161e' as Hex, // Фон активной вкладки (как в оригинале)
  panelBg: '#16161e' as Hex, // Фон панели (как в оригинале)

  // Акцентные цвета (точно как в оригинале)
  blue: '#7aa2f7' as Hex, // Функции, методы, теги
  cyan: '#7dcfff' as Hex, // Переменные, импорты
  teal: '#73daca' as Hex, // Типы, классы
  purple: '#9d7cd8' as Hex, // Классы, объявления типов
  magenta: '#bb9af7' as Hex, // Ключевые слова, операторы
  red: '#f7768e' as Hex, // Ошибки, теги HTML (исправлено!)
  green: '#9ece6a' as Hex, // Строки
  yellow: '#e0af68' as Hex, // Предупреждения, числа
  orange: '#ff9e64' as Hex, // Параметры, enum

  // Дополнительные цвета для пунктуации и деталей
  lightBlue: '#89ddff' as Hex, // Операторы, импорты
  lightTeal: '#0db9d7' as Hex, // Методы, свойства
  lightPurple: '#bb9af7' as Hex, // Ключевые слова
  lightRed: '#ff5370' as Hex, // Ошибки, invalid

  // Специальные цвета из оригинальной темы
  invalidRed: '#ff5370' as Hex, // Invalid tokens
  deprecatedPurple: '#bb9af7' as Hex, // Deprecated tokens
  storageModifier: '#9d7cd8' as Hex, // Storage modifiers

  // UI элементы
  buttonBg: '#3d59a1dd' as Hex, // Фон кнопки (как в оригинале)
  buttonFg: '#ffffff' as Hex, // Текст кнопки (как в оригинале)
  inputBg: '#14141b' as Hex, // Фон input поля (как в оригинале)
  inputFg: '#a9b1d6' as Hex, // Текст input поля (как в оригинале)

  // Серые оттенки для текста (точно как в оригинальной Tokyo Night)
  gray1: '#c0caf5' as Hex, // Основной текст переменных
  gray2: '#a9b1d6' as Hex, // Вторичный текст
  gray3: '#9aa5ce' as Hex, // Цвета констант
  gray4: '#787c99' as Hex, // Основной foreground интерфейса (ГЛАВНЫЙ!)
  gray5: '#51597d' as Hex, // Комментарии (исправлено!)
  gray6: '#5a638c' as Hex, // Комментарии документации
  gray7: '#646e9c' as Hex, // Подчеркнутые комментарии документации
} as const
