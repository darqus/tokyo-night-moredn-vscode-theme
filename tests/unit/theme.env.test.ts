import { loadEnvVars } from '../../src/generators/theme'

describe('theme env vars', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })
  afterAll(() => {
    process.env = OLD_ENV
  })

  it('should default to dark type when THEME_TYPE not set', () => {
    delete process.env.THEME_TYPE
    const env = loadEnvVars()
    expect(env.THEME_TYPE).toBe('dark')
  })

  it('should set light type when THEME_TYPE=light', () => {
    process.env.THEME_TYPE = 'light'
    const env = loadEnvVars()
    expect(env.THEME_TYPE).toBe('light')
  })
})
