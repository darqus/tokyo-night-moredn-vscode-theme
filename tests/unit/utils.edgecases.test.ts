import { withAlpha } from '../../src/core/utils'

// Cover edge branches in utils.ts (alpha clamp and validation already mostly covered)
describe('utils.ts edge cases', () => {
  it('withAlpha clamps values below 0 and above 1', () => {
    expect(withAlpha('#000000', -1)).toBe('#00000000')
    expect(withAlpha('#000000', 2)).toBe('#000000ff')
  })
})
