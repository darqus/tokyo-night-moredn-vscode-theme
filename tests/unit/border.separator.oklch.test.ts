import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('OKLCH separator border tone', () => {
  it('menu.separatorBackground and editorHoverWidget.border should use separatorBackground', () => {
    const c = generateTheme(loadEnvVars()).colors
    expect(c['menu.separatorBackground']).toBe(
      interfacePalette.border.separatorBackground
    )
    expect(c['editorHoverWidget.border']).toBe(
      interfacePalette.border.separatorBackground
    )
  })
})
