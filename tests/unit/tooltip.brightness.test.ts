import { colorMappings } from '../../src/generators/modernInterfaceMapping'
import { interfacePalette } from '../../src/core/interface'
import { lighten } from '../../src/core/utils'
import { getContrastRatioAware } from '../../src/core/contrast'

describe('Tooltip (hover widget) brightness', () => {
  const mapping = colorMappings(interfacePalette)

  test('editorHoverWidget.background uses base per theme request', () => {
    const expected = interfacePalette.bg.base
    expect(mapping['editorHoverWidget.background']).toBe(expected)
  })

  test('primary text still has acceptable contrast on hover widget background', () => {
    const bg = mapping['editorHoverWidget.background']
    const fg = interfacePalette.textOn.base.primary
    const contrast = getContrastRatioAware(fg as any, bg as any)
    // On base background, keep a reasonable threshold >= 4.0
    expect(contrast).toBeGreaterThanOrEqual(4.0)
  })
})
