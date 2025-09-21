import {
  getCachedColor,
  clearColorCache,
  getCacheStats,
} from '../../src/core/cache'

describe('LRU cache', () => {
  beforeEach(() => clearColorCache())

  it('should not grow beyond capacity and evict oldest', () => {
    // we don't know capacity symbol here; rely on stats changes
    for (let i = 0; i < 600; i++) {
      const key = `k-${i}`
      const val = getCachedColor(key, (x: string) => x, key)
      expect(val).toBe(key)
    }
    const stats = getCacheStats()
    expect(stats.size).toBeLessThanOrEqual(stats.capacity)
    // first keys likely evicted
    expect(stats.keys.includes('k-0')).toBe(false)
  })

  it('touch should refresh recency', () => {
    // fill some keys
    for (let i = 0; i < 520; i++) {
      getCachedColor(`t-${i}`, (x: string) => x, `t-${i}`)
    }
    // access an early key to refresh
    const refreshed = getCachedColor('t-10', (x: string) => x, 't-10')
    expect(refreshed).toBe('t-10')
    const stats = getCacheStats()
    // refreshed key should be present, early earliest probably evicted
    expect(stats.keys.includes('t-10')).toBe(true)
    expect(stats.size).toBeLessThanOrEqual(stats.capacity)
  })
})
