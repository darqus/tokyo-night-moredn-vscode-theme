import {
  getContrastRatio,
  getContrastRatioAware,
  __flattenOverForTests,
} from '../../src/core/contrast'

describe('Alpha-aware contrast', () => {
  it('flattenOver should composite semi-transparent over background', () => {
    const bg = '#000000'
    const fg50 = '#ffffff80'
    const flat = __flattenOverForTests(fg50, bg)
    expect(flat.toLowerCase()).toBe('#808080')
  })

  it('getContrastRatioAware should differ from plain contrast when alpha present', () => {
    const bg = '#1a1b26'
    const fgOpaque = '#ffffff'
    const fgHalf = '#ffffff80'
    const r1 = getContrastRatio(fgOpaque as any, bg as any)
    const r2 = getContrastRatioAware(fgHalf, bg as any)
    expect(r2).toBeLessThan(r1)
  })
})
