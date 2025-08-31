import * as fs from 'node:fs'
import * as path from 'node:path'

interface Theme {
  name: string
  type: string
  colors: { [key: string]: string }
}

const THEME_FILES = [
  'tokyo-night-dark-color-theme.json',
  'tokyo-night-light-color-theme.json',
  'tokyo-night-storm-color-theme.json',
  'tokyo-night-moon-color-theme.json',
]

const TAB_ELEMENTS = {
  'editorGroupHeader.tabsBackground': 'Фон области вкладок',
  'tab.activeBackground': 'Фон активной вкладки',
  'tab.inactiveBackground': 'Фон неактивной вкладки',
  'tab.activeForeground': 'Текст активной вкладки',
  'tab.inactiveForeground': 'Текст неактивной вкладки',
  'tab.hoverForeground': 'Текст при наведении',
}

function loadTheme(filename: string): Theme | null {
  try {
    const themePath = path.join(__dirname, '..', 'themes', filename)
    const content = fs.readFileSync(themePath, 'utf8')
    return JSON.parse(content)
  } catch {
    return null
  }
}

function analyzeTabAdaptivity(): void {
  console.log('🎨 АНАЛИЗ АДАПТИВНОСТИ ВКЛАДОК')
  console.log('=====================================\\n')

  const themes = THEME_FILES.map(loadTheme).filter(Boolean) as Theme[]

  for (const [property, description] of Object.entries(TAB_ELEMENTS)) {
    console.log(`📑 ${description.toUpperCase()} (${property})`)
    console.log('────────────────────────────────────────')

    const values = new Map<string, string>()

    for (const theme of themes) {
      const value = theme.colors[property]
      if (value) {
        const themeName = theme.name
          .replace('Tokyo Night ', '')
          .toUpperCase()
          .padEnd(6)
        values.set(theme.name, value)
        console.log(`   ${themeName}: ${value}`)
      }
    }

    const uniqueCount = new Set(values.values()).size
    const totalCount = values.size

    if (uniqueCount === totalCount) {
      console.log(
        `   ✅ АДАПТИВНОСТЬ: ${uniqueCount}/${totalCount} - ВСЕ УНИКАЛЬНЫ`
      )
    } else if (uniqueCount >= totalCount * 0.75) {
      console.log(`   🟡 АДАПТИВНОСТЬ: ${uniqueCount}/${totalCount} - ЧАСТИЧНО`)
    } else {
      console.log(
        `   🔴 АДАПТИВНОСТЬ: ${uniqueCount}/${totalCount} - НЕ АДАПТИВНО`
      )
    }

    console.log()
  }

  // Проверяем контрастность для светлой темы
  console.log('💡 ПРОВЕРКА КОНТРАСТНОСТИ СВЕТЛОЙ ТЕМЫ')
  console.log('═══════════════════════════════════════')

  const lightTheme = themes.find((t) => t.name.includes('Light'))
  if (lightTheme) {
    const bgColor = lightTheme.colors['editorGroupHeader.tabsBackground']
    const activeText = lightTheme.colors['tab.activeForeground']
    const inactiveText = lightTheme.colors['tab.inactiveForeground']

    console.log(`   Фон вкладок:         ${bgColor}`)
    console.log(`   Активный текст:      ${activeText}`)
    console.log(`   Неактивный текст:    ${inactiveText}`)

    // Проверяем, что для светлой темы используются темные тексты
    if (activeText && activeText.startsWith('#') && activeText.length === 7) {
      const rgb = parseInt(activeText.slice(1), 16)
      const brightness = (rgb >> 16) + ((rgb >> 8) & 255) + (rgb & 255)

      if (brightness < 400) {
        // Темный текст
        console.log(
          '   ✅ КОНТРАСТНОСТЬ: Темный текст на светлом фоне - ПРАВИЛЬНО'
        )
      } else {
        console.log(
          '   🔴 КОНТРАСТНОСТЬ: Светлый текст на светлом фоне - ОШИБКА'
        )
      }
    }
  }
}

analyzeTabAdaptivity()
