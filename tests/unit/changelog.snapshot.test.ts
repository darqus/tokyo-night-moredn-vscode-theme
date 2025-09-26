import * as fs from 'node:fs'
import * as path from 'node:path'

describe('CHANGELOG snapshot (format smoke)', () => {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')

  it.skip('snapshot of last section (optional)', () => {
    const content = fs.readFileSync(changelogPath, 'utf8')
    // Simple extraction of the last section block
    const match = content.match(/##\s*\[[^\]]+\][\s\S]*?(?=##\s*\[|$)/)
    expect(match?.[0] || '').toMatchSnapshot()
  })
})
