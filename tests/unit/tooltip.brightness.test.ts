import { colorMappings } from '../../src/generators/modernInterfaceMapping'
import { interfacePalette } from '../../src/core/interface'
import { lighten } from '../../src/core/utils'
import { getContrastRatioAware } from '../../src/core/contrast'

describe('Tooltip (hover widget) brightness', () => {
  const mapping = colorMappings(interfacePalette)

  test('editorHoverWidget.background is slightly lighter than overlay', () => {
    const expected = lighten(interfacePalette.bg.overlay, 0.06)
    expect(mapping['editorHoverWidget.background']).toBe(expected)
  })

  test('primary text still has acceptable contrast on hover widget background', () => {
    const bg = mapping['editorHoverWidget.background']
    const fg = interfacePalette.textOn.overlay.primary
    const contrast = getContrastRatioAware(fg as any, bg as any)
    // We expect at least ~4.5 on overlays for primary text
    expect(contrast).toBeGreaterThanOrEqual(4.5)
  })
})
