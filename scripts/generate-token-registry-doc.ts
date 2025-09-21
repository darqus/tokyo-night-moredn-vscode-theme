#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { TOKEN_REGISTRY } from '../src/core/tokenRegistry'

function mdEscape(s: string) {
  return s.replace(/\|/g, '\\|')
}

function generate(): string {
  const header = `# Token Registry\n\nАвтогенерируемая таблица соответствия VS Code color tokens → поверхность/политики/подсказки контраста.\n\n`
  const columns = [
    'Token',
    'Surface',
    'Alpha',
    'Deprecated',
    'Alias Of',
    'Contrast Hints',
  ]
  const head = `| ${columns.join(' | ')} |\n| ${columns
    .map(() => '---')
    .join(' | ')} |\n`

  const rows = TOKEN_REGISTRY.map((t) => {
    const hints = t.contrastHints
      ? [
          t.contrastHints.primaryMin
            ? `primary≥${t.contrastHints.primaryMin}`
            : '',
          t.contrastHints.mutedMin ? `muted≥${t.contrastHints.mutedMin}` : '',
          t.contrastHints.subtleMin
            ? `subtle≥${t.contrastHints.subtleMin}`
            : '',
        ]
          .filter(Boolean)
          .join(', ')
      : ''
    const vals = [
      mdEscape(t.key),
      t.surface ?? '',
      t.alpha ?? '',
      t.deprecated ? 'yes' : '',
      t.aliasOf ?? '',
      hints,
    ]
    return `| ${vals.join(' | ')} |`
  })

  return header + head + rows.join('\n') + '\n'
}

function main() {
  const outPath = path.join(__dirname, '../docs/TOKEN_REGISTRY.md')
  const md = generate()
  fs.writeFileSync(outPath, md)
  console.log('✅ docs/TOKEN_REGISTRY.md generated')
}

if (require.main === module) {
  main()
}
