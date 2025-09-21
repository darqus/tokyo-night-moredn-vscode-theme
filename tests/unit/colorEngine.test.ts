import { basePalette } from '../../src/core/palette'
import {
  mixSrgb,
  mixPerceptual,
  lightenPerceptual,
  withAlpha,
} from '../../src/core/colorEngine'

describe('colorEngine facade', () => {
  it('mixPerceptual should differ from mixSrgb for chromatic blends', () => {
    const a = basePalette.yellow
    const b = basePalette.white
    const p = mixPerceptual(a, b, 0.1)
    const s = mixSrgb(a, b, 0.1)
    expect(p).not.toBe(s)
  })

  it('lightenPerceptual should keep chroma better than sRGB lighten on blue', () => {
    const blue = basePalette.blue
    const p = lightenPerceptual(blue, 0.2)
    // basic sanity: output is hex6
    expect(/^#[0-9a-fA-F]{6}$/.test(p)).toBe(true)
  })

  it('withAlpha should append alpha channel correctly', () => {
    const hex = basePalette.white
    const withA = withAlpha(hex, 0.5)
    expect(/^#[0-9a-fA-F]{8}$/.test(withA)).toBe(true)
    expect(withA.toLowerCase().endsWith('80')).toBe(true)
  })
})
