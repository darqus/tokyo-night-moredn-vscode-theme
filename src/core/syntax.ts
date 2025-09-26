/**
 * Палитра подсветки синтаксиса
 * Прямой маппинг токенов на базовые цвета
 */
import { basePalette } from './palette'
import { mix } from './utils'
import type { SyntaxPalette } from '../types/theme'

export const syntaxPalette: SyntaxPalette = {
  // Основные токены
  keyword: basePalette.magenta, // Ключевые слова (const, function, class)
  string: basePalette.stateSuccess, // Строки
  number: basePalette.orange, // Числа
  comment: basePalette.gray, // Комментарии

  // Идентификаторы
  variable: basePalette.cyan, // Переменные
  function: basePalette.blue, // Функции и методы
  class: basePalette.yellow, // Классы и типы
  type: basePalette.teal, // Типы данных

  // Операторы и пунктуация
  operator: basePalette.purple, // Операторы (+, -, =, &&)
  punctuation: basePalette.light, // Скобки, точки, запятые

  // Специальные
  constant: basePalette.yellow, // Константы (true, false, null)
  property: basePalette.cyan, // Свойства объектов
  tag: basePalette.stateError, // HTML теги
  attribute: basePalette.magenta, // HTML атрибуты

  // Состояния
  invalid: basePalette.stateError, // Ошибки в коде
  deprecated: mix(basePalette.light, basePalette.gray, 0.7), // Устаревший код
}
