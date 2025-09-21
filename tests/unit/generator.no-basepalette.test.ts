import * as fs from 'fs'
import * as path from 'path'

describe('Generator should not import basePalette directly', () => {
  it('src/generators/**/*.ts must not contain basePalette import', () => {
    const genDir = path.join(__dirname, '../../src/generators')
    const files = fs
      .readdirSync(genDir)
      .filter((f) => f.endsWith('.ts'))
      .map((f) => path.join(genDir, f))

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8')
      expect(content).not.toMatch(/from '\.\.\/core\/palette'/)
      expect(content).not.toMatch(/basePalette/) // даже если импорт скрыт
    }
  })
})
