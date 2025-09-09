import { generateTheme } from '../../src/generators/theme'

/**
 * Snapshot-тест итоговой темы. Любые изменения палитры/токенов
 * должны отражаться через осознанное обновление снапшота.
 */

describe('Theme snapshot', () => {
  it('should match the stable snapshot of the generated theme', () => {
    const theme = generateTheme()

    // Базовые инварианты
    expect(theme.name).toBe('Tokyo Night Modern')
    expect(theme.type).toBe('dark')
    expect(theme.colors).toBeDefined()
    expect(theme.tokenColors).toBeDefined()

    // Снапшот всей структуры
    expect(theme).toMatchSnapshot()
  })
})
