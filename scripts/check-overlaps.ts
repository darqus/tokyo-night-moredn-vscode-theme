#!/usr/bin/env node
/**
 * Quick diagnostic for overlapping color keys across theme parts.
 * Helps detect accidental overrides and opportunities to refactor.
 */
import { buildColors } from '../src/theme'
import { getBaseColors } from '../src/theme/base'
import { getButtonColors } from '../src/theme/buttons'
import { getInputColors } from '../src/theme/inputs'
import { getActivityBarColors } from '../src/theme/activityBar'
import { getSideBarColors } from '../src/theme/sideBar'
import { getListColors } from '../src/theme/lists'
import { getEditorColors } from '../src/theme/editor'
import { getTabColors } from '../src/theme/tabs'
import { getStatusBarColors } from '../src/theme/statusBar'
import { getTerminalColors } from '../src/theme/terminal'
import { getGitColors } from '../src/theme/git'
import { getNotificationColors } from '../src/theme/notifications'
import { getMenuColors } from '../src/theme/menus'
import { getPeekViewColors } from '../src/theme/peekView'
import { getDiffEditorColors } from '../src/theme/diffEditor'
import { getMergeColors } from '../src/theme/merge'
import { getChartColors } from '../src/theme/charts'
import { getDebugColors } from '../src/theme/debug'
import { getQuickInputColors } from '../src/theme/quickInput'
import { getMiscColors } from '../src/theme/misc'

type Part = { name: string; fn: () => Record<string, string> }

const parts: Part[] = [
  { name: 'base', fn: getBaseColors },
  { name: 'buttons', fn: getButtonColors },
  { name: 'inputs', fn: getInputColors },
  { name: 'activityBar', fn: getActivityBarColors },
  { name: 'sideBar', fn: getSideBarColors },
  { name: 'lists', fn: getListColors },
  { name: 'editor', fn: getEditorColors },
  { name: 'tabs', fn: getTabColors },
  { name: 'statusBar', fn: getStatusBarColors },
  { name: 'terminal', fn: getTerminalColors },
  { name: 'git', fn: getGitColors },
  { name: 'notifications', fn: getNotificationColors },
  { name: 'menus', fn: getMenuColors },
  { name: 'peekView', fn: getPeekViewColors },
  { name: 'diffEditor', fn: getDiffEditorColors },
  { name: 'merge', fn: getMergeColors },
  { name: 'charts', fn: getChartColors },
  { name: 'debug', fn: getDebugColors },
  { name: 'quickInput', fn: getQuickInputColors },
  { name: 'misc', fn: getMiscColors },
]

const seen: Record<
  string,
  { first: string; overwrites: { by: string; value: string }[]; value: string }
> = {}

parts.forEach((p) => {
  const obj = p.fn()
  Object.entries(obj).forEach(([key, value]) => {
    if (!seen[key]) {
      seen[key] = { first: p.name, overwrites: [], value }
    } else {
      // record overwrite only if value differs
      if (seen[key].value !== value) {
        seen[key].overwrites.push({ by: p.name, value })
        seen[key].value = value
      } else {
        // same value override – still note for potential dedup
        seen[key].overwrites.push({ by: p.name, value })
      }
    }
  })
})

const overlaps = Object.entries(seen)
  .filter(([, rec]) => rec.overwrites.length > 0)
  .sort((a, b) => b[1].overwrites.length - a[1].overwrites.length)

if (overlaps.length === 0) {
  console.log('✅ No overlapping color keys detected between parts.')
  process.exit(0)
}

console.log(
  '⚠️  Overlapping color keys detected (later parts override earlier ones):\n'
)
overlaps.slice(0, 50).forEach(([key, rec]) => {
  const chain = [rec.first, ...rec.overwrites.map((o) => o.by)].join(' -> ')
  console.log(`• ${key}: ${chain}`)
})

console.log(
  `\nFound ${overlaps.length} overlapping keys. Consider consolidating the source or ordering parts deliberately.`
)

// Also build final map to ensure script stays green in CI-like runs
void buildColors()
