import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('OKLCH thin border tone', () => {
  it('widget.border and editorWidget.border should use separatorBackground tone', () => {
    const c = generateTheme().colors
    const sep = interfacePalette.border.separatorBackground
    expect(c['widget.border']).toBe(sep)
    expect(c['editorWidget.border']).toBe(sep)
  })
})
