import { colorMappings } from '../../src/generators/modernInterfaceMapping'
import { interfacePalette } from '../../src/core/interface'

describe('Panel UI behavior (buttons/icons/links)', () => {
  const mapping = colorMappings(interfacePalette)

  test('panel title uses elevated roles', () => {
    expect(mapping['panelTitle.activeForeground']).toBe(
      interfacePalette.textOn.elevated.subtle
    )
    expect(mapping['panelTitle.inactiveForeground']).toBe(
      interfacePalette.textOn.elevated.muted
    )
  })

  test('icons are subdued while links use cold link color', () => {
    expect(mapping['icon.foreground']).toBe(interfacePalette.text.subtle)
    expect(mapping['textLink.foreground']).toBe(
      interfacePalette.derived.link.foreground
    )
    expect(mapping['textLink.activeForeground']).toBe(
      interfacePalette.derived.link.foreground
    )
    expect(mapping['editorLink.activeForeground']).toBe(
      interfacePalette.derived.link.foreground
    )
  })

  test('toolbar hover/active/outline present (cold cyan family)', () => {
    expect(mapping['toolbar.hoverBackground']).toBeDefined()
    expect(mapping['toolbar.activeBackground']).toBeDefined()
    expect(mapping['toolbar.hoverOutline']).toBeDefined()
  })
})
