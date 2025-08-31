import fs from 'fs'
import path from 'path'

/**
 * Анализ адаптивных фонов панелей
 * Проверяет, правильно ли применяются адаптивные фоны в разных темах
 */

interface PanelAnalysis {
  themeName: string
  type: string
  backgrounds: {
    tabActiveBackground?: string
    quickInputBackground?: string
    peekViewEditorBackground?: string
    menuBackground?: string
    notificationsBackground?: string
    widgetBackground?: string
  }
}

function analyzePanelBackgrounds(): void {
  const themesDir = path.join(process.cwd(), 'themes')
  const results: PanelAnalysis[] = []

  // Анализируем ключевые темы
  const themesToAnalyze = [
    { file: 'tokyo-night-dark-color-theme.json', type: 'dark' },
    { file: 'tokyo-night-light-color-theme.json', type: 'light' },
    { file: 'tokyo-night-storm-color-theme.json', type: 'storm' },
    { file: 'tokyo-night-moon-color-theme.json', type: 'moon' },
    { file: 'tokyo-night-high-contrast-color-theme.json', type: 'contrast' },
    { file: 'tokyo-night-pastel-color-theme.json', type: 'pastel' },
  ]

  for (const theme of themesToAnalyze) {
    const filePath = path.join(themesDir, theme.file)

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Файл не найден: ${theme.file}`)
      continue
    }

    try {
      const themeData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const colors = themeData.colors || {}

      const analysis: PanelAnalysis = {
        themeName: theme.file.replace('-color-theme.json', ''),
        type: theme.type,
        backgrounds: {
          tabActiveBackground: colors['tab.activeBackground'],
          quickInputBackground: colors['quickInput.background'],
          peekViewEditorBackground: colors['peekViewEditor.background'],
          menuBackground: colors['menu.background'],
          notificationsBackground: colors['notifications.background'],
          widgetBackground:
            colors['widget.background'] || colors['peekViewEditor.background'], // fallback
        },
      }

      results.push(analysis)
    } catch (error) {
      console.log(`❌ Ошибка при анализе ${theme.file}:`, error)
    }
  }

  // Выводим результаты
  console.log('🎨 АНАЛИЗ АДАПТИВНЫХ ФОНОВ ПАНЕЛЕЙ\n')
  console.log('='.repeat(70))

  for (const result of results) {
    console.log(`\n📱 ${result.themeName.toUpperCase()} (${result.type})`)
    console.log(
      `   Вкладки (активная):      ${
        result.backgrounds.tabActiveBackground || 'N/A'
      }`
    )
    console.log(
      `   Быстрый ввод:           ${
        result.backgrounds.quickInputBackground || 'N/A'
      }`
    )
    console.log(
      `   Peek View редактор:     ${
        result.backgrounds.peekViewEditorBackground || 'N/A'
      }`
    )
    console.log(
      `   Меню:                   ${result.backgrounds.menuBackground || 'N/A'}`
    )
    console.log(
      `   Уведомления:            ${
        result.backgrounds.notificationsBackground || 'N/A'
      }`
    )
    console.log(
      `   Widget фон:             ${
        result.backgrounds.widgetBackground || 'N/A'
      }`
    )
  }

  // Проверяем уникальность фонов
  console.log('\n🔍 ПРОВЕРКА РАЗНООБРАЗИЯ ФОНОВ')
  console.log('='.repeat(40))

  const uniqueTabBgs = new Set(
    results.map((r) => r.backgrounds.tabActiveBackground)
  )
  const uniqueQuickInputBgs = new Set(
    results.map((r) => r.backgrounds.quickInputBackground)
  )
  const uniquePeekViewBgs = new Set(
    results.map((r) => r.backgrounds.peekViewEditorBackground)
  )

  console.log(
    `✨ Уникальных фонов вкладок: ${uniqueTabBgs.size}/${results.length}`
  )
  console.log(
    `✨ Уникальных фонов быстрого ввода: ${uniqueQuickInputBgs.size}/${results.length}`
  )
  console.log(
    `✨ Уникальных фонов Peek View: ${uniquePeekViewBgs.size}/${results.length}`
  )

  // Выводим все уникальные значения
  console.log('\n📊 УНИКАЛЬНЫЕ ЗНАЧЕНИЯ ФОНОВ')
  console.log('='.repeat(35))

  console.log('\n🏷️  Фоны вкладок:')
  Array.from(uniqueTabBgs).forEach((bg) => console.log(`   ${bg}`))

  console.log('\n🔍 Фоны быстрого ввода:')
  Array.from(uniqueQuickInputBgs).forEach((bg) => console.log(`   ${bg}`))

  console.log('\n👁️  Фоны Peek View:')
  Array.from(uniquePeekViewBgs).forEach((bg) => console.log(`   ${bg}`))

  // Проверяем проблемные случаи
  console.log('\n⚠️  ПРОБЛЕМНЫЕ СЛУЧАИ')
  console.log('='.repeat(25))

  let issues = 0

  // Проверяем, что светлая тема отличается от темной
  const lightTheme = results.find((r) => r.type === 'light')
  const darkTheme = results.find((r) => r.type === 'dark')

  if (lightTheme && darkTheme) {
    if (
      lightTheme.backgrounds.tabActiveBackground ===
      darkTheme.backgrounds.tabActiveBackground
    ) {
      console.log('🔴 Вкладки в светлой и темной темах имеют одинаковый фон!')
      issues++
    }
    if (
      lightTheme.backgrounds.quickInputBackground ===
      darkTheme.backgrounds.quickInputBackground
    ) {
      console.log(
        '🔴 Быстрый ввод в светлой и темной темах имеет одинаковый фон!'
      )
      issues++
    }
  }

  // Проверяем, что все темы имеют разные фоны
  if (uniqueTabBgs.size < results.length * 0.8) {
    console.log(
      '🟡 Мало уникальных фонов вкладок - возможные проблемы с адаптацией'
    )
    issues++
  }

  if (issues === 0) {
    console.log('✅ Проблем не обнаружено!')
  }

  console.log(`\n📈 Итого найдено проблем: ${issues}`)
}

// Запуск анализа
analyzePanelBackgrounds()
