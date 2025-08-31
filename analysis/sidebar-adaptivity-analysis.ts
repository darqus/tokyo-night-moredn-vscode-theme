import * as fs from 'node:fs'
import * as path from 'node:path'

interface ThemeColors {
  [key: string]: string
}

interface Theme {
  name: string
  type: string
  colors: ThemeColors
}

// Основные темы для анализа
const THEME_FILES = [
  'tokyo-night-dark-color-theme.json',
  'tokyo-night-light-color-theme.json',
  'tokyo-night-storm-color-theme.json',
  'tokyo-night-moon-color-theme.json',
  'tokyo-night-high-contrast-color-theme.json',
  'tokyo-night-pastel-color-theme.json',
]

// Элементы боковой панели, которые должны быть адаптивными
const SIDEBAR_ELEMENTS = {
  'list.activeSelectionBackground': 'Активный элемент списка',
  'list.inactiveSelectionBackground': 'Неактивный элемент списка',
  'list.hoverBackground': 'Элемент при наведении',
  'activityBar.activeBackground': 'Активный элемент панели активности',
  'list.focusBackground': 'Элемент в фокусе',
}

function loadTheme(filename: string): Theme | null {
  try {
    const themePath = path.join(__dirname, '..', 'themes', filename)
    const content = fs.readFileSync(themePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn(`⚠️  Не удалось загрузить тему: ${filename}`)
    return null
  }
}

function analyzeSidebarAdaptivity(): void {
  console.log('🎨 АНАЛИЗ АДАПТИВНОСТИ ЭЛЕМЕНТОВ БОКОВОЙ ПАНЕЛИ')
  console.log(
    '======================================================================'
  )

  // Загружаем темы
  const themes = THEME_FILES.map(loadTheme).filter(Boolean) as Theme[]

  if (themes.length === 0) {
    console.log('❌ Не найдено ни одной темы для анализа')
    return
  }

  // Анализируем каждый элемент
  for (const [property, description] of Object.entries(SIDEBAR_ELEMENTS)) {
    console.log(`\\n📋 ${description.toUpperCase()} (${property})`)
    console.log('================================')

    const values = new Set<string>()
    let hasElement = false

    for (const theme of themes) {
      const value = theme.colors[property]
      if (value) {
        hasElement = true
        values.add(value)
        console.log(
          `   ${theme.name
            .replace('Tokyo Night ', '')
            .toUpperCase()
            .padEnd(12)}: ${value}`
        )
      }
    }

    if (!hasElement) {
      console.log('   ❌ Элемент не найден ни в одной теме')
      continue
    }

    // Проверка уникальности
    const uniqueCount = values.size
    const totalCount = themes.length

    console.log(`\\n   📊 Уникальных значений: ${uniqueCount}/${totalCount}`)

    if (uniqueCount === totalCount) {
      console.log('   ✅ ОТЛИЧНО: Все темы имеют уникальные цвета')
    } else if (uniqueCount >= totalCount * 0.8) {
      console.log('   🟡 ХОРОШО: Большинство тем имеют уникальные цвета')
    } else {
      console.log('   🔴 ПРОБЛЕМА: Многие темы используют одинаковые цвета')
    }
  }

  // Общая сводка
  console.log('\\n\\n🎯 ОБЩАЯ СВОДКА АДАПТИВНОСТИ')
  console.log('=====================================')

  let totalElements = 0
  let adaptiveElements = 0

  for (const property of Object.keys(SIDEBAR_ELEMENTS)) {
    totalElements++

    const values = new Set<string>()
    let hasValues = false

    for (const theme of themes) {
      if (theme.colors[property]) {
        hasValues = true
        values.add(theme.colors[property])
      }
    }

    if (hasValues && values.size >= themes.length * 0.8) {
      adaptiveElements++
    }
  }

  const adaptivityPercent = Math.round((adaptiveElements / totalElements) * 100)
  console.log(
    `📈 Адаптивность элементов боковой панели: ${adaptivityPercent}% (${adaptiveElements}/${totalElements})`
  )

  if (adaptivityPercent >= 90) {
    console.log('🏆 ПРЕВОСХОДНО: Боковая панель полностью адаптивная!')
  } else if (adaptivityPercent >= 70) {
    console.log('✅ ХОРОШО: Большинство элементов адаптивны')
  } else {
    console.log('⚠️  ТРЕБУЕТ УЛУЧШЕНИЯ: Многие элементы не адаптивны')
  }
}

// Запускаем анализ
analyzeSidebarAdaptivity()
