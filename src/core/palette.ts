/**
 * Базовая палитра Tokyo Night Modern
 * 12 основных цветов для генерации всей темы
 */
import { createHex } from '../types/palette'

export const basePalette = {
  // Нейтральные
  black: createHex('#1a1b26'), // Самый темный фон
  gray: createHex('#565f89'), // Средний серый для комментариев
  light: createHex('#c0caf5'), // Светлый текст
  white: createHex('#ffffff'), // Белый текст

  // Акцентные холодные (приоритет)
  blue: createHex('#7aa2f7'), // Функции, ключевые слова
  cyan: createHex('#7dcfff'), // Переменные, импорты
  teal: createHex('#73daca'), // Типы, свойства
  purple: createHex('#9d7cd8'), // Операторы, модификаторы

  // Акцентные теплые (минимум)
  green: createHex('#a7c785'), // Строки
  yellow: createHex('#f7de70'), // Классы, константы
  orange: createHex('#f0ac74'), // Числа (только)
  red: createHex('#f38095'), // Ошибки (только)
  magenta: createHex('#b18af8'), // Атрибуты, теги

  // --- Понятные алиасы и частые константы (для читабельности) ---
  // Текстовые роли (алиасы к существующим цветам и распространённые значения)
  textWhite: createHex('#ffffff'), // = white
  textPrimary: createHex('#afb9e2'), // Светлый текст
  textMuted: createHex('#99a3cc'), // часто используемое приглушённое
  textSubtle: createHex('#8991b3'), // ещё более приглушённое

  // Поверхности (часто встречающиеся фоновые значения в теме)
  surfaceBase: createHex('#1a1b26'), // = black
  surfaceSidebar: createHex('#181923'),
  surfacePanel: createHex('#1f2230'),
  surfaceOverlay: createHex('#232739'),

  // Разделители/границы (часто используемые стабильные значения)
  borderThin: createHex('#202230'),
  borderSeparator: createHex('#30344c'),

  // Брэнд/ссылки/инфо (алиасы на холодные акценты)
  primaryBlue: createHex('#7aa2f7'), // = blue
  infoCyan: createHex('#7dcfff'), // = cyan
  accentTeal: createHex('#73daca'), // = teal
  accentPurple: createHex('#9d7cd8'), // = purple
  link: createHex('#29acf8'), // используемый цвет ссылок

  badgeBlue: createHex('#007acc'),

  // CTA / Кнопки
  // Яркий синий для основной кнопки
  primaryButtonBlue: createHex('#007acc'),

  // Состояния (алиасы на тёплые акценты)
  success: createHex('#a7c785'), // = green
  warning: createHex('#f7de70'), // = yellow
  attention: createHex('#f0ac74'), // = orange
  danger: createHex('#f38095'), // = red
} as const

export type BaseColor = keyof typeof basePalette
