import * as path from 'node:path'

// Mock fs before importing the module under test
jest.mock('node:fs', () => {
  const actual = jest.requireActual('node:fs') as any
  return {
    ...actual,
    existsSync: jest.fn(() => true),
    mkdirSync: jest.fn(),
    writeFileSync: jest.fn(),
  }
})

import * as fs from 'node:fs'
import { buildTheme } from '../../src/build'

describe('build.ts', () => {
  const themeFile = path.join(
    path.resolve(__dirname, '../../'),
    'themes',
    'tokyo-night-modern-color-theme.json'
  )

  let exitSpy: jest.SpyInstance
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    ;(fs.existsSync as jest.Mock).mockReset().mockReturnValue(true)
    ;(fs.mkdirSync as jest.Mock).mockReset()
    ;(fs.writeFileSync as jest.Mock).mockReset()
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(((
      code?: number
    ) => {
      throw new Error(`process.exit:${code}`)
    }) as any)
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should build theme and write file', () => {
    buildTheme()
    expect(fs.existsSync).toHaveBeenCalled()
    expect(fs.mkdirSync).not.toHaveBeenCalled()
    expect(fs.writeFileSync).toHaveBeenCalled()
    const [[writePath, data]] = (fs.writeFileSync as jest.Mock).mock.calls
    expect(writePath).toBe(themeFile)
    expect(typeof data).toBe('string')
  })

  it('should create themes directory if missing', () => {
    ;(fs.existsSync as jest.Mock).mockReturnValueOnce(false)
    buildTheme()
    expect(fs.mkdirSync).toHaveBeenCalled()
  })

  it('should handle errors and exit with code 1', () => {
    ;(fs.writeFileSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('disk full')
    })
    try {
      buildTheme()
      expect(true).toBe(false)
    } catch (e: any) {
      expect(String(e.message)).toBe('process.exit:1')
      expect(consoleErrorSpy).toHaveBeenCalled()
    }
    exitSpy.mockRestore()
  })
})
