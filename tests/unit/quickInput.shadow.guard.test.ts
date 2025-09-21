import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Quick Input shadow guard', () => {
  it('should not define a dedicated quickInput.shadow token', () => {
    const c = generateTheme().colors
    expect(c['quickInput.shadow']).toBeUndefined()
  })

  it('should rely on global widget.shadow being present and translucent', () => {
    const c = generateTheme().colors
    // Global widget shadow must exist
    expect(c['widget.shadow']).toBeDefined()
    // The value should be 8-digit hex (with alpha)
    expect(c['widget.shadow']).toMatch(/^#[0-9a-fA-F]{8}$/)
    // And should equal the interface palette derived value
    expect(c['widget.shadow']).toBe(interfacePalette.derived.shadows.widget)
  })

  it('should map Quick Input colors from interface palette surfaces', () => {
    const c = generateTheme().colors
    expect(c['quickInput.background']).toBe(interfacePalette.bg.elevated)
    expect(c['quickInput.foreground']).toBe(interfacePalette.text.primary)
    expect(c['quickInputTitle.background']).toBe(interfacePalette.bg.overlay)
    // Focused list item should use selection background and primary text
    expect(c['quickInputList.focusBackground']).toBe(
      interfacePalette.bg.selection
    )
    expect(c['quickInputList.focusForeground']).toBe(
      interfacePalette.text.primary
    )
  })
})
