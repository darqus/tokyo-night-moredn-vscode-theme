import {
  clearColorCache,
  getCacheStats,
  getCachedColor,
} from '../../src/core/cache'

describe('cache.ts', () => {
  beforeEach(() => clearColorCache())

  it('should compute and cache values', () => {
    const fn = jest.fn((a: number, b: number) => `${a + b}`)
    const key = 'sum-1-2'
    const r1 = getCachedColor(key, fn, 1, 2)
    const r2 = getCachedColor(key, fn, 1, 2)
    expect(r1).toBe('3')
    expect(r2).toBe('3')
    expect(fn).toHaveBeenCalledTimes(1)
    const stats = getCacheStats()
    expect(stats.size).toBe(1)
    expect(stats.keys).toContain(key)
  })
})
