/**
 * TypeScript типы для темы
 */

export type Hex = `#${string}`

export interface VSCodeTheme {
  name: string
  type: 'dark' | 'light'
  colors: Record<string, string>
  tokenColors: TokenColor[]
  semanticTokenColors?: Record<string, SemanticTokenStyle>
}

export interface TokenColor {
  name: string
  scope: string | string[]
  settings: {
    fontStyle?: string
    foreground?: string
    background?: string
  }
}

export interface SemanticTokenStyle {
  foreground?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
}

export interface InterfacePalette {
  bg: {
    base: Hex
    darkenBase: Hex
    elevated: Hex
    overlay: Hex
    input: Hex
    hover: Hex
    active: Hex
    selection: Hex
    hoverSubtle: Hex
    hoverMuted: Hex
    hoverActive: Hex
  }
  text: {
    primary: Hex
    inverse: Hex
    muted: Hex
    subtle: Hex
    inactive: Hex
    lineNumber: Hex
    lineNumberActive: Hex
  }
  // Surface-aware text roles
  textOn: {
    base: {
      primary: Hex
      muted: Hex
      subtle: Hex
      inactive: Hex
    }
    elevated: {
      primary: Hex
      muted: Hex
      subtle: Hex
      inactive: Hex
    }
    overlay: {
      primary: Hex
      muted: Hex
      subtle: Hex
      inactive: Hex
    }
  }
  border: {
    default: Hex
    focus: Hex
    separatorBackground: Hex
  }
  button: {
    primary: {
      background: Hex
      foreground: Hex
      hoverBackground: Hex
      border: Hex
      separator: Hex
    }
    secondary: {
      background: Hex
      foreground: Hex
      hoverBackground: Hex
      border: Hex
    }
  }
  // Badge colors
  badge: {
    bg: Hex
    fg: Hex
  }
  state: {
    info: Hex
    success: Hex
    warning: Hex
    error: Hex
    infoHover: Hex
    successHover: Hex
    warningHover: Hex
    errorHover: Hex
  }
  git: {
    renamedResourceForeground: Hex
    stageModifiedResourceForeground: Hex
    stageDeletedResourceForeground: Hex
  }
  diff: {
    insertedTextBackground: Hex
    removedTextBackground: Hex
    insertedLineBackground: Hex
    removedLineBackground: Hex
  }
  minimap: {
    findMatchHighlight: Hex
  }
  // Derived colors (computed via utils; single source of truth for theme)
  derived: {
    link: {
      foreground: Hex
    }
    terminal: {
      // Base ANSI colors
      ansiBlack: Hex
      ansiRed: Hex
      ansiGreen: Hex
      ansiYellow: Hex
      ansiMagenta: Hex
      ansiWhite: Hex
      hoverHighlightBackground: Hex
      ansiBlue: Hex
      ansiCyan: Hex
      ansiBrightBlack: Hex
      ansiBrightRed: Hex
      ansiBrightGreen: Hex
      ansiBrightYellow: Hex
      ansiBrightBlue: Hex
      ansiBrightMagenta: Hex
      ansiBrightCyan: Hex
      ansiBrightWhite: Hex
    }
    overlays: {
      dropBackground: Hex
    }
    findMatch: {
      background: Hex
      border: Hex
      highlightBackground: Hex
    }
    shadows: {
      widget: Hex
      scrollbar: Hex
    }
    peekView: {
      matchHighlightBackground: Hex
      selectionBackground: Hex
    }
    inlineChat: {
      background: Hex
      foreground: Hex
    }
    blockquote: {
      background: Hex
      border: Hex
    }
  }
  // Charts palette for extensions and charts.* tokens
  charts: {
    foreground: Hex
    lines: Hex
    red: Hex
    blue: Hex
    yellow: Hex
    orange: Hex
    green: Hex
    purple: Hex
  }
  // Controls
  dropdown: {
    background: Hex
    foreground: Hex
    border: Hex
    listBackground: Hex
  }
  // SCM Graph palette
  scmGraph: {
    // Label on hover
    label: {
      hoverForeground: Hex
      hoverBackground: Hex
    }
    // Graph line/node colors
    foreground1: Hex
    foreground2: Hex
    foreground3: Hex
    foreground4: Hex
    foreground5: Hex
    // Hover state colors for additions/deletions
    historyItemHoverAdditionsForeground: Hex
    historyItemHoverDeletionsForeground: Hex
    // Ref colors
    historyItemRefColor: Hex
    historyItemRemoteRefColor: Hex
    historyItemBaseRefColor: Hex
  }
}

export interface SyntaxPalette {
  keyword: Hex
  string: Hex
  number: Hex
  comment: Hex
  variable: Hex
  function: Hex
  class: Hex
  type: Hex
  operator: Hex
  punctuation: Hex
  constant: Hex
  property: Hex
  tag: Hex
  attribute: Hex
  invalid: Hex
  deprecated: Hex
}

// Расширенная синтаксическая палитра для современных языков
export interface RichSyntaxPalette {
  // Группы ключевых слов
  keywords: {
    control: Hex // if, for, while, switch, case
    declaration: Hex // const, let, var, function
    import: Hex // import, from, export, require
    type: Hex // interface, type, class, extends
    access: Hex // public, private, protected, static
    async: Hex // async, await, Promise
  }

  // Типы значений и литералы
  literals: {
    string: Hex // "string", 'string', `template`
    number: Hex // 123, 0xFF, 1.5
    boolean: Hex // true, false
    null: Hex // null, undefined, nil
    regex: Hex // /pattern/flags
    template: Hex // ${expression} в template strings
  }

  // Идентификаторы с контекстом
  identifiers: {
    variable: Hex // переменные
    parameter: Hex // параметры функций
    property: Hex // свойства объектов
    method: Hex // методы объектов
    function: Hex // функции
    class: Hex // классы
    interface: Hex // интерфейсы
    enum: Hex // перечисления
    namespace: Hex // namespace, module
    label: Hex // метки для goto
  }

  // Типы данных
  types: {
    primitive: Hex // string, number, boolean
    generic: Hex // T, K, V в <T>
    union: Hex // | в union types
    builtin: Hex // Array, Object, Date
    custom: Hex // пользовательские типы
  }

  // Операторы с группировкой
  operators: {
    arithmetic: Hex // +, -, *, /
    comparison: Hex // ==, !=, <, >
    logical: Hex // &&, ||, !
    assignment: Hex // =, +=, -=
    bitwise: Hex // &, |, ^, ~
    ternary: Hex // ? :
    spread: Hex // ..., destructuring
  }

  // Современные возможности языков
  modern: {
    decorator: Hex // @Component, @Injectable
    annotation: Hex // аннотации Java/C#
    macro: Hex // макросы
    attribute: Hex // атрибуты Rust/C++
    pragma: Hex // #pragma, #include
    directive: Hex // директивы препроцессора
  }

  // Разметка и документация
  markup: {
    tag: Hex // HTML теги
    attribute: Hex // HTML атрибуты
    heading: Hex // заголовки в Markdown
    emphasis: Hex // *italic*, **bold**
    link: Hex // ссылки
    code: Hex // `code` блоки
    quote: Hex // > цитаты
  }

  // Состояния и диагностика
  states: {
    error: Hex // ошибки
    warning: Hex // предупреждения
    info: Hex // информация
    hint: Hex // подсказки
    deprecated: Hex // устаревший код
    unused: Hex // неиспользуемый код
  }

  // Комментарии с типизацией
  comments: {
    line: Hex // // комментарии
    block: Hex // /* комментарии */
    doc: Hex // /** JSDoc */
    todo: Hex // TODO, FIXME
    tag: Hex // @param, @returns в документации
  }

  // Специальные символы
  punctuation: {
    bracket: Hex // [], {}, ()
    delimiter: Hex // ;, ,
    accessor: Hex // ., ::
    separator: Hex // разделители
  }
}
