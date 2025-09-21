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
    inlineChat: {
      background: Hex
      foreground: Hex
    }
    blockquote: {
      background: Hex
      border: Hex
    }
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
