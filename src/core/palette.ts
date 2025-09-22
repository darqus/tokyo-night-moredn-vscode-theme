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

  skyblue: createHex('#007acc'), // Бейджи

  // Акцентные теплые (минимум)
  green: createHex('#9ece6a'), // Строки
  yellow: createHex('#e0af68'), // Классы, константы
  orange: createHex('#ff9e64'), // Числа (только)
  red: createHex('#f7768e'), // Ошибки (только)
  magenta: createHex('#bb9af7'), // Атрибуты, теги

  // --- Понятные алиасы и частые константы (для читабельности) ---
  // Текстовые роли (алисы к существующим цветам и распространённые значения)
  textWhite: createHex('#ffffff'), // = white
  textPrimary: createHex('#c0caf5'), // Светлый текст
  textMuted: createHex('#c0caf5'), // часто используемое приглушённое
  textSubtle: createHex('#8b95be'), // ещё более приглушённое

  // Поверхности (часто встречающиеся фоновые значения в теме)
  surfaceBase: createHex('#1a1b26'), // = black
  surfaceSidebar: createHex('#181923'),
  surfacePanel: createHex('#1f2230'),
  surfaceOverlay: createHex('#232739'),

  // Разделители/границы (часто используемые стабильные значения)
  borderThin: createHex('#202230'),
  borderSeparator: createHex('#30344c'),

  // Брэнд/ссылки/инфо (алисы на холодные акценты)
  primaryBlue: createHex('#7aa2f7'), // = blue
  infoCyan: createHex('#7dcfff'), // = cyan
  accentTeal: createHex('#73daca'), // = teal
  accentPurple: createHex('#9d7cd8'), // = purple
  link: createHex('#9adaff'), // используемый цвет ссылок
  badgeBlue: createHex('#007acc'), // = skyblue
  // CTA / Кнопки
  // Яркий синий для основной кнопки
  primaryButtonBlue: createHex('#007acc'),

  // Состояния (алисы на тёплые акценты)
  success: createHex('#9ece6a'), // = green
  warning: createHex('#e0af68'), // = yellow
  attention: createHex('#ff9e64'), // = orange
  danger: createHex('#f7768e'), // = red
} as const

export type BaseColor = keyof typeof basePalette
