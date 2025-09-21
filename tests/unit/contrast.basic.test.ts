import { interfacePalette } from '../../src/core/interface'
import { getContrastRatio } from '../../src/core/contrast'

describe('Basic contrast checks (advisory)', () => {
  it('activityBar inactive text vs background should be >= 3.0', () => {
    const ratio = getContrastRatio(
      interfacePalette.text.subtle,
      interfacePalette.bg.base
    )
    expect(ratio).toBeGreaterThanOrEqual(3.0)
  })

  it('tab unfocused inactive foreground vs base background should be >= 3.0', () => {
    const ratio = getContrastRatio(
      interfacePalette.text.subtle,
      interfacePalette.bg.base
    )
    expect(ratio).toBeGreaterThanOrEqual(3.0)
  })

  it('secondary button text vs background should be >= 4.0', () => {
    const ratio = getContrastRatio(
      interfacePalette.button.secondary.foreground,
      interfacePalette.button.secondary.background
    )
    expect(ratio).toBeGreaterThanOrEqual(4.0)
  })

  it('overlay widget primary vs overlay background should be >= 4.5', () => {
    const ratio = getContrastRatio(
      interfacePalette.textOn.overlay.primary,
      interfacePalette.bg.overlay
    )
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('overlay widget muted vs overlay background should be >= 3.0', () => {
    const ratio = getContrastRatio(
      interfacePalette.textOn.overlay.muted,
      interfacePalette.bg.overlay
    )
    expect(ratio).toBeGreaterThanOrEqual(3.0)
  })
})
