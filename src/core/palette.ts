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
} as const

export type BaseColor = keyof typeof basePalette
