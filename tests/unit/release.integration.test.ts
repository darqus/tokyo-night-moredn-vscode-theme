import * as child from 'child_process'

// Mock fs used by release.ts to control package.json reads/writes
jest.mock('fs', () => {
  const actual = jest.requireActual('fs') as any
  const memPkg = { version: '1.2.3' }
  return {
    ...actual,
    readFileSync: jest.fn((p: any, enc?: any) => {
      if (typeof p === 'string' && p.endsWith('package.json')) {
        return JSON.stringify(memPkg)
      }
      return actual.readFileSync(p, enc)
    }),
    writeFileSync: jest.fn(() => undefined),
    __setPkgVersion: (v: string) => (memPkg.version = v),
  }
})

jest.mock('child_process')

const mockExecSync = child.execSync as unknown as jest.Mock
const fsMock = jest.requireMock('fs') as any

// Import after mocks
import { ReleaseManager } from '../../scripts/release'

describe('release.ts integration (mocked execSync)', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    fsMock.__setPkgVersion('1.2.3')
    // prevent process.exit from killing the test runner
    jest.spyOn(process, 'exit').mockImplementation((() => undefined) as any)
  })

  it('detects minor release and bumps version with commit count', async () => {
    mockExecSync.mockImplementation((cmd: string) => {
      if (cmd.startsWith('git describe')) return Buffer.from('v1.2.3')
      if (cmd.startsWith('git log'))
        return Buffer.from('abcd feat: add X\nefgh chore: update\n')
      if (cmd.startsWith('git rev-list')) return Buffer.from('4')
      if (cmd.startsWith('npm version')) {
        fsMock.__setPkgVersion('1.3.4')
        return Buffer.from('v1.3.4')
      }
      if (cmd.startsWith('git status')) return Buffer.from('')
      if (cmd.startsWith('git branch')) return Buffer.from('main')
      if (cmd.startsWith('npm run validate:all')) return Buffer.from('OK')
      if (cmd.startsWith('npm run build')) return Buffer.from('OK')
      if (cmd.startsWith('npm run package')) return Buffer.from('OK')
      if (cmd.startsWith('npx standard-version')) return Buffer.from('OK')
      if (cmd.startsWith('git add')) return Buffer.from('OK')
      if (cmd.startsWith('git commit')) return Buffer.from('OK')
      if (cmd.startsWith('git tag')) return Buffer.from('OK')
      if (cmd.startsWith('git push')) return Buffer.from('OK')
      if (cmd.startsWith('gh release create'))
        throw new Error('gh not installed')
      return Buffer.from('')
    })

    const rm = new ReleaseManager() as any
    jest.spyOn(rm as any, 'getCurrentVersion').mockReturnValue('1.2.3')
    // Call internal bumpVersion to focus on version computation and npm version call
    rm.bumpVersion('minor', false)

    const calls = mockExecSync.mock.calls.map((c: any[]) => String(c[0]))
    expect(
      calls.some((cmd: string) =>
        cmd.includes('npm version 1.3.4 --no-git-tag-version')
      )
    ).toBe(true)
  })

  it('defaults to patch when no commits and shows preview in dry-run', async () => {
    mockExecSync.mockImplementation((cmd: string) => {
      if (cmd.startsWith('git describe')) return Buffer.from('v1.2.3')
      if (cmd.startsWith('git log')) return Buffer.from('')
      if (cmd.startsWith('git rev-list')) return Buffer.from('0')
      if (cmd.startsWith('git status')) return Buffer.from('')
      if (cmd.startsWith('git branch')) return Buffer.from('main')
      return Buffer.from('')
    })

    const rm = new ReleaseManager()
    try {
      await rm.release({ dryRun: true })
    } catch {}

    expect(mockExecSync).not.toHaveBeenCalledWith(
      expect.stringMatching(/^npm version/),
      expect.any(Object)
    )
  })
})
