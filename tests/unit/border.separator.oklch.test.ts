import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('OKLCH separator border tone', () => {
  it('menu.separatorBackground and editorHoverWidget.border should use separatorBackground', () => {
    const c = generateTheme().colors
    expect(c['menu.separatorBackground']).toBe(
      interfacePalette.border.separatorBackground
    )
    expect(c['editorHoverWidget.border']).toBe(
      interfacePalette.border.separatorBackground
    )
  })
})
