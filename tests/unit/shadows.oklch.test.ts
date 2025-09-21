import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('OKLCH shadow tones', () => {
  it('widget.shadow and scrollbar.shadow should use derived OKLCH shadows', () => {
    const c = generateTheme().colors
    expect(c['widget.shadow']).toBe(interfacePalette.derived.shadows.widget)
    expect(c['scrollbar.shadow']).toBe(
      interfacePalette.derived.shadows.scrollbar
    )
  })

  it('widget.shadow and scrollbar.shadow should differ after micro-adjustment', () => {
    const c = generateTheme().colors
    expect(c['widget.shadow']).not.toBe(c['scrollbar.shadow'])
  })

  it('widget.shadow has alpha while scrollbar.shadow remains opaque', () => {
    const c = generateTheme().colors
    expect(c['widget.shadow']).toMatch(/^#[0-9a-fA-F]{8}$/)
    expect(c['scrollbar.shadow']).toMatch(/^#[0-9a-fA-F]{6}$/)
  })
})
