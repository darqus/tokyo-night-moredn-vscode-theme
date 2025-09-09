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
    findMatch: Hex
    findMatchBorder: Hex
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
