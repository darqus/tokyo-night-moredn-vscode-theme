import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('OKLCH thin border tone', () => {
  it('widget.border and editorWidget.border should use separatorBackground tone', () => {
    const c = generateTheme(loadEnvVars()).colors
    const sep = interfacePalette.border.separatorBackground
    expect(c['widget.border']).toBe(sep)
    expect(c['editorWidget.border']).toBe(sep)
  })

  it('panelSection.border should use separatorBackground tone', () => {
    const c = generateTheme(loadEnvVars()).colors
    const sep = interfacePalette.border.separatorBackground
    expect(c['panelSection.border']).toBe(sep)
  })

  it('panelSectionHeader.border should use separatorBackground tone', () => {
    const c = generateTheme(loadEnvVars()).colors
    const sep = interfacePalette.border.separatorBackground
    expect(c['panelSectionHeader.border']).toBe(sep)
  })
})
