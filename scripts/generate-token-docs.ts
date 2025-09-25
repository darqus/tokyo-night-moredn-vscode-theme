#!/usr/bin/env ts-node
/**
 * Генерация markdown-документа с перечнем цветовых токенов.
 * Источник: tokenConfig (modernInterfaceMapping)
 */
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { tokenConfig } from '../src/generators/modernInterfaceMapping'

function escapePipes(s: string | undefined) {
  return (s || '').replace(/\|/g, '\\|')
}

const lines: string[] = []
lines.push('# VS Code Color Tokens (Generated)')
lines.push('')
lines.push(
  '> Автогенерировано из `tokenConfig` — не редактировать вручную. Запуск: `npm run docs:tokens`'
)
lines.push('')

for (const group of tokenConfig.groups) {
  lines.push(`## ${group.name}`)
  if (group.description) {
    lines.push('')
    lines.push(group.description)
    lines.push('')
  }
  lines.push('| Token | Description |')
  lines.push('|-------|-------------|')
  for (const t of group.tokens) {
    if (t.deprecated) continue
    lines.push(`| \`${t.token}\` | ${escapePipes(t.description)} |`)
  }
  lines.push('')
}

const outPath = resolve(process.cwd(), 'docs', 'TOKENS.md')
writeFileSync(outPath, lines.join('\n') + '\n', 'utf8')
console.log(`✅ Generated ${outPath}`)
