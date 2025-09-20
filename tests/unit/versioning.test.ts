import { computeVersion } from '../../scripts/versioning'

describe('computeVersion (pure)', () => {
  it('patch: increments patch by commit count, min 1', () => {
    expect(computeVersion('1.2.3', 'patch', 0, false)).toBe('1.2.4')
    expect(computeVersion('1.2.3', 'patch', 3, false)).toBe('1.2.6')
  })
  it('minor: increments minor, sets patch to commit count', () => {
    expect(computeVersion('1.2.3', 'minor', 0, false)).toBe('1.3.1')
    expect(computeVersion('1.2.3', 'minor', 2, false)).toBe('1.3.2')
  })
  it('major: increments major, zeroes minor, sets patch to commit count', () => {
    expect(computeVersion('1.2.3', 'major', 0, false)).toBe('2.0.1')
    expect(computeVersion('1.2.3', 'major', 5, false)).toBe('2.0.5')
  })
  it('adds prerelease suffix with count', () => {
    expect(computeVersion('1.2.3', 'patch', 4, true)).toBe('1.2.7-beta.4')
    expect(computeVersion('1.2.3', 'minor', 1, true)).toBe('1.3.1-beta.1')
    expect(computeVersion('1.2.3', 'major', 3, true)).toBe('2.0.3-beta.3')
  })
  it('tolerates versions with prerelease metadata in input', () => {
    expect(computeVersion('1.2.3-beta.9', 'patch', 0, false)).toBe('1.2.4')
  })
})
