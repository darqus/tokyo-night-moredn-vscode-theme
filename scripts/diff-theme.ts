#!/usr/bin/env ts-node
/**
 * Скрипт сравнения двух theme JSON и генерации Markdown diff для CHANGELOG.
 * Использование:
 *   ts-node scripts/diff-theme.ts --old path/to/old.json --new themes/tokyo-night-modern-color-theme.json
 * Если не указан --old, можно передать --git-ref v1.18.19 (будет считан файл из git show).
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { execSync } from 'node:child_process'

interface ThemeFile {
  colors?: Record<string, string>
  tokenColors?: any
}

interface Args {
  oldPath?: string
  newPath: string
  gitRef?: string
}

function parseArgs(): Args {
  const args = process.argv.slice(2)
  let oldPath: string | undefined
  let newPath = 'themes/tokyo-night-modern-color-theme.json'
  let gitRef: string | undefined
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--old') oldPath = args[++i]
    else if (a === '--new') newPath = args[++i]
    else if (a === '--git-ref') gitRef = args[++i]
  }
  return { oldPath, newPath, gitRef }
}

function readTheme(filePath: string): ThemeFile {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function readThemeFromGit(ref: string, relPath: string): ThemeFile {
  const full = execSync(`git show ${ref}:${relPath}`, { encoding: 'utf8' })
  return JSON.parse(full)
}

function diffObjects(
  oldObj: Record<string, string>,
  newObj: Record<string, string>
) {
  const added: string[] = []
  const removed: string[] = []
  const changed: Array<{ key: string; oldVal: string; newVal: string }> = []

  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)])
  for (const k of allKeys) {
    if (!(k in oldObj)) added.push(k)
    else if (!(k in newObj)) removed.push(k)
    else if (oldObj[k] !== newObj[k])
      changed.push({ key: k, oldVal: oldObj[k], newVal: newObj[k] })
  }
  added.sort()
  removed.sort()
  changed.sort((a, b) => a.key.localeCompare(b.key))
  return { added, removed, changed }
}

function colorDelta(oldVal: string, newVal: string): string {
  const normalize = (v: string) => v.toLowerCase()
  if (!oldVal || !newVal) return ''
  if (oldVal.length === 9 && newVal.length === 9) {
    // #rrggbbaa
    return oldVal.slice(7) !== newVal.slice(7) ? ' (Δ alpha)' : ''
  }
  return ''
}

function main() {
  const { oldPath, newPath, gitRef } = parseArgs()
  let oldTheme: ThemeFile
  const rel = path.relative(process.cwd(), newPath)
  try {
    if (gitRef) {
      oldTheme = readThemeFromGit(gitRef, rel)
    } else if (oldPath) {
      oldTheme = readTheme(oldPath)
    } else {
      console.error(
        'Не указан источник старой версии: используйте --old или --git-ref'
      )
      process.exit(1)
      return
    }
  } catch (e: any) {
    console.error('Ошибка чтения старой версии:', e.message)
    process.exit(1)
    return
  }
  let newTheme: ThemeFile
  try {
    newTheme = readTheme(newPath)
  } catch (e: any) {
    console.error('Ошибка чтения новой версии:', e.message)
    process.exit(1)
    return
  }

  const oldColors = oldTheme.colors || {}
  const newColors = newTheme.colors || {}
  const { added, removed, changed } = diffObjects(oldColors, newColors)

  const md: string[] = []
  md.push('### Theme Color Diff')
  md.push('')
  md.push(
    `Источник старой версии: ${gitRef ? 'git ref `' + gitRef + '`' : oldPath}`
  )
  md.push(`Новая версия: \
\`${newPath}\``)
  md.push('')
  md.push(
    `Всего токенов (стар): **${Object.keys(oldColors).length}**, (нов): **${
      Object.keys(newColors).length
    }**`
  )
  md.push(
    `Добавлено: **${added.length}**, Удалено: **${removed.length}**, Изменено: **${changed.length}**`
  )
  md.push('')
  if (added.length) {
    md.push('<details><summary>🟢 Добавлены</summary>')
    md.push('')
    for (const k of added)
      md.push(`- \
\`${k}\`: \
\`${newColors[k]}\``)
    md.push('</details>')
    md.push('')
  }
  if (removed.length) {
    md.push('<details><summary>🔴 Удалены</summary>')
    md.push('')
    for (const k of removed)
      md.push(`- \
\`${k}\``)
    md.push('</details>')
    md.push('')
  }
  if (changed.length) {
    md.push('<details open><summary>🟡 Изменены</summary>')
    md.push('')
    for (const c of changed) {
      md.push(`- \
\`${c.key}\`: \
\`${c.oldVal}\` → \
\`${c.newVal}\`${colorDelta(c.oldVal, c.newVal)}`)
    }
    md.push('</details>')
    md.push('')
  }
  if (!added.length && !removed.length && !changed.length) {
    md.push('_Нет изменений в color tokens._')
  }

  const out = md.join('\n')
  // eslint-disable-next-line no-console
  console.log(out)
}

if (require.main === module) {
  main()
}
