import { ThemeBuilder } from '../../src/variants/themeBuilder'

/**
 * Snapshot-тест итоговой темы. Любые изменения палитры/токенов
 * должны отражаться через осознанное обновление снапшота.
 */

describe('Theme snapshot', () => {
  it('should match the stable snapshot of the generated theme', () => {
    const theme = ThemeBuilder.buildStandard()

    // Базовые инварианты
    expect(theme.name).toBe('Tokyo Night Lod')
    expect(theme.type).toBe('dark')
    expect(theme.semanticHighlighting).toBe(true)

    // Снапшот всей структуры
    expect(theme).toMatchSnapshot()
  })
})
