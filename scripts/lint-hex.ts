#!/usr/bin/env ts-node
import * as fs from 'node:fs'
import * as path from 'node:path'

const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')

// Files allowed to contain raw hex values (centralized or variant-only logic)
const ALLOWLIST = new Set<string>([
  path.join(SRC, 'palette.base.ts'),
  path.join(SRC, 'palette.core.ts'),
  path.join(SRC, 'variants', 'themeBuilder.ts'),
  path.join(SRC, 'variants', 'index.ts'),
  path.join(SRC, 'validation', 'themeValidator.ts'),
  path.join(SRC, 'utils', 'color.ts'), // examples in comments
])

const HEX_RE = /#[0-9a-fA-F]{6}\b/g

let violations: { file: string; line: number; text: string }[] = []

function walk(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      walk(p)
    } else if (e.isFile() && p.endsWith('.ts')) {
      if (ALLOWLIST.has(p)) continue
      const content = fs.readFileSync(p, 'utf8')

      // Strip block and line comments to avoid false positives in docs/examples
      const noComments = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
        .replace(/(^|\s)\/\/.*$/gm, '$1') // line comments

      const lines = noComments.split(/\r?\n/)
      lines.forEach((line, i) => {
        const matches = line.match(HEX_RE)
        if (matches) {
          violations.push({ file: p, line: i + 1, text: line.trim() })
        }
      })
    }
  }
}

walk(SRC)

if (violations.length > 0) {
  console.error(
    `Found ${violations.length} hardcoded hex occurrences outside allowed files:`
  )
  for (const v of violations) {
    console.error(`- ${path.relative(ROOT, v.file)}:${v.line}  ${v.text}`)
  }
  process.exit(1)
} else {
  console.log('✅ No hardcoded hex values found outside allowed files.')
}
