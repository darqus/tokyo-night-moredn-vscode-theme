/**
 * Расширенная палитра подсветки синтаксиса для современных языков
 * Поддерживает детализированную подсветку для TypeScript, React, Vue, etc.
 */
import { basePalette } from './palette'
import { mix, withAlpha } from './utils'
import type { RichSyntaxPalette } from '../types/theme'

export const richSyntaxPalette: RichSyntaxPalette = {
  // Группы ключевых слов
  keywords: {
    control: basePalette.magenta, // if, for, while - яркий акцент
    declaration: basePalette.purple, // const, let - отличается от control
    import: basePalette.cyan, // import, export - логический поток
    type: basePalette.yellow, // interface, class - структуры
    access: mix(basePalette.magenta, basePalette.purple, 0.6), // public, private - модификаторы
    async: basePalette.blue, // async, await - асинхронность
  },

  // Типы значений и литералы
  literals: {
    string: basePalette.green, // строки - классический зеленый
    number: basePalette.orange, // числа - оранжевый
    boolean: basePalette.red, // true/false - красный для выделения
    null: mix(basePalette.red, basePalette.gray, 0.5), // null/undefined - приглушенный красный
    regex: mix(basePalette.green, basePalette.yellow, 0.3), // регулярки - желто-зеленый
    template: mix(basePalette.green, basePalette.cyan, 0.4), // template literals - голубо-зеленый
  },

  // Идентификаторы с контекстом
  identifiers: {
    variable: basePalette.light, // переменные - нейтральный белый
    parameter: mix(basePalette.light, basePalette.cyan, 0.3), // параметры - слегка голубой
    property: basePalette.cyan, // свойства - голубой
    method: basePalette.blue, // методы - синий
    function: basePalette.blue, // функции - синий
    class: basePalette.yellow, // классы - желтый
    interface: mix(basePalette.yellow, basePalette.cyan, 0.4), // интерфейсы - желто-голубой
    enum: mix(basePalette.yellow, basePalette.orange, 0.5), // перечисления - желто-оранжевый
    namespace: mix(basePalette.cyan, basePalette.purple, 0.3), // namespace - голубо-фиолетовый
    label: mix(basePalette.magenta, basePalette.light, 0.6), // метки - розово-белый
  },

  // Типы данных
  types: {
    primitive: basePalette.teal, // string, number, boolean
    generic: mix(basePalette.yellow, basePalette.light, 0.4), // <T> - светло-желтый
    union: basePalette.purple, // | в union types
    builtin: mix(basePalette.teal, basePalette.blue, 0.5), // Array, Object - сине-бирюзовый
    custom: basePalette.yellow, // пользовательские типы
  },

  // Операторы с группировкой
  operators: {
    arithmetic: basePalette.purple, // +, -, *, /
    comparison: mix(basePalette.purple, basePalette.magenta, 0.5), // ==, !=, <, >
    logical: basePalette.magenta, // &&, ||, !
    assignment: mix(basePalette.purple, basePalette.light, 0.3), // = - более нейтральный
    bitwise: mix(basePalette.purple, basePalette.orange, 0.4), // &, |, ^ - оранжево-фиолетовый
    ternary: basePalette.cyan, // ? : - выделяющийся
    spread: mix(basePalette.cyan, basePalette.blue, 0.4), // ... - голубо-синий
  },

  // Современные возможности языков
  modern: {
    decorator: basePalette.orange, // @Component - яркий оранжевый
    annotation: mix(basePalette.orange, basePalette.yellow, 0.5), // аннотации
    macro: mix(basePalette.cyan, basePalette.green, 0.6), // макросы - зелено-голубой
    attribute: mix(basePalette.yellow, basePalette.orange, 0.3), // атрибуты
    pragma: mix(basePalette.gray, basePalette.cyan, 0.4), // директивы препроцессора
    directive: mix(basePalette.gray, basePalette.purple, 0.3), // директивы
  },

  // Разметка и документация
  markup: {
    tag: basePalette.red, // HTML теги - красный
    attribute: basePalette.magenta, // HTML атрибуты
    heading: basePalette.blue, // заголовки Markdown
    emphasis: basePalette.yellow, // *italic*, **bold**
    link: basePalette.cyan, // ссылки
    code: mix(basePalette.green, basePalette.gray, 0.3), // `code` блоки
    quote: mix(basePalette.gray, basePalette.light, 0.5), // > цитаты
  },

  // Состояния и диагностика
  states: {
    error: basePalette.red, // ошибки
    warning: basePalette.orange, // предупреждения
    info: basePalette.blue, // информация
    hint: basePalette.cyan, // подсказки
    deprecated: withAlpha(mix(basePalette.light, basePalette.gray, 0.7), 0.7), // устаревший код
    unused: withAlpha(basePalette.gray, 0.6), // неиспользуемый код
  },

  // Комментарии с типизацией
  comments: {
    line: basePalette.gray, // // комментарии
    block: basePalette.gray, // /* комментарии */
    doc: mix(basePalette.gray, basePalette.green, 0.3), // /** JSDoc */ - зеленоватый
    todo: mix(basePalette.orange, basePalette.yellow, 0.5), // TODO, FIXME - оранжево-желтый
    tag: mix(basePalette.cyan, basePalette.gray, 0.6), // @param, @returns - голубо-серый
  },

  // Специальные символы
  punctuation: {
    bracket: basePalette.light, // [], {}, () - нейтральный
    delimiter: mix(basePalette.light, basePalette.gray, 0.3), // ;, , - приглушенный
    accessor: basePalette.cyan, // ., :: - выделяющийся
    separator: mix(basePalette.light, basePalette.gray, 0.5), // разделители
  },
}

/**
 * Обратная совместимость - маппинг старой палитры на новую
 */
export const legacySyntaxMapping = {
  keyword: richSyntaxPalette.keywords.control,
  string: richSyntaxPalette.literals.string,
  number: richSyntaxPalette.literals.number,
  comment: richSyntaxPalette.comments.line,
  variable: richSyntaxPalette.identifiers.variable,
  function: richSyntaxPalette.identifiers.function,
  class: richSyntaxPalette.identifiers.class,
  type: richSyntaxPalette.types.primitive,
  operator: richSyntaxPalette.operators.arithmetic,
  punctuation: richSyntaxPalette.punctuation.bracket,
  constant: richSyntaxPalette.literals.boolean,
  property: richSyntaxPalette.identifiers.property,
  tag: richSyntaxPalette.markup.tag,
  attribute: richSyntaxPalette.markup.attribute,
  invalid: richSyntaxPalette.states.error,
  deprecated: richSyntaxPalette.states.deprecated,
}
