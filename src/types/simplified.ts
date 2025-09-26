/**
 * Упрощенные типы для новой архитектуры
 */
export type Hex = `#${string}`

export interface SimplePalette {
  // Поверхности
  bg: {
    base: Hex
    elevated: Hex
    overlay: Hex
    hover: Hex
    selection: Hex
  }
  
  // Текст
  text: {
    primary: Hex
    secondary: Hex
    muted: Hex
    inverse: Hex
  }
  
  // Состояния
  state: {
    success: Hex
    warning: Hex
    error: Hex
    info: Hex
  }
  
  // Акценты
  accent: {
    primary: Hex
    secondary: Hex
    border: Hex
  }
}

export interface UnifiedConfig {
  theme: {
    name: string
    displayName: string
    type: 'dark' | 'light'
    version: string
  }
  palette: SimplePalette
  overrides?: Record<string, string>
  plugins?: string[]
}