import fs from 'fs'
import path from 'path'

/**
 * Анализ контрастности новых адаптивных Git-бейджей
 * Проверяет, что каждый тип темы имеет свои специфические цвета
 */

interface ThemeAnalysis {
  themeName: string
  badgeBackground: string
  badgeForeground: string
  gitModified: string
  gitDeleted: string
  gitAdded: string
  scmGraphForeground1: string
  contrast?: number
}

// Функция для вычисления относительной яркости цвета
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const getRGB = (color: number) => {
    return color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4)
  }

  return 0.2126 * getRGB(r) + 0.7152 * getRGB(g) + 0.0722 * getRGB(b)
}

// Функция для вычисления контрастности
function getContrastRatio(color1: string, color2: string): number {
  // Убираем альфа-канал и проверяем длину
  const cleanColor1 = color1.replace(/[^#0-9a-f]/gi, '')
  const cleanColor2 = color2.replace(/[^#0-9a-f]/gi, '')

  if (cleanColor1.length < 7 || cleanColor2.length < 7) {
    return 0 // Невозможно вычислить для коротких цветов
  }

  const lum1 = getLuminance(cleanColor1.slice(0, 7))
  const lum2 = getLuminance(cleanColor2.slice(0, 7))

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

function analyzeThemes(): void {
  const themesDir = path.join(process.cwd(), 'themes')
  const results: ThemeAnalysis[] = []

  // Анализируем ключевые темы
  const themeFiles = [
    'tokyo-night-dark-color-theme.json',
    'tokyo-night-light-color-theme.json',
    'tokyo-night-storm-color-theme.json',
    'tokyo-night-high-contrast-color-theme.json',
    'tokyo-night-neon-color-theme.json',
    'tokyo-night-pastel-color-theme.json',
  ]

  for (const fileName of themeFiles) {
    const filePath = path.join(themesDir, fileName)

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Файл не найден: ${fileName}`)
      continue
    }

    try {
      const themeData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const colors = themeData.colors || {}

      const analysis: ThemeAnalysis = {
        themeName: fileName.replace('-color-theme.json', ''),
        badgeBackground: colors['badge.background'] || 'N/A',
        badgeForeground: colors['badge.foreground'] || 'N/A',
        gitModified:
          colors['gitDecoration.modifiedResourceForeground'] || 'N/A',
        gitDeleted: colors['gitDecoration.deletedResourceForeground'] || 'N/A',
        gitAdded: colors['gitDecoration.addedResourceForeground'] || 'N/A',
        scmGraphForeground1: colors['scmGraph.foreground1'] || 'N/A',
      }

      // Вычисляем контрастность бейджа
      if (
        analysis.badgeBackground !== 'N/A' &&
        analysis.badgeForeground !== 'N/A'
      ) {
        analysis.contrast = getContrastRatio(
          analysis.badgeBackground,
          analysis.badgeForeground
        )
      }

      results.push(analysis)
    } catch (error) {
      console.log(`❌ Ошибка при анализе ${fileName}:`, error)
    }
  }

  // Выводим результаты
  console.log('🎨 АНАЛИЗ АДАПТИВНЫХ GIT-БЕЙДЖЕЙ\n')
  console.log('='.repeat(60))

  for (const result of results) {
    console.log(`\n📁 ${result.themeName.toUpperCase()}`)
    console.log(
      `   Бейдж: ${result.badgeBackground} на ${result.badgeForeground}`
    )
    if (result.contrast) {
      console.log(
        `   Контраст: ${result.contrast.toFixed(2)}:1 ${
          result.contrast >= 4.5 ? '✅' : '⚠️'
        }`
      )
    }
    console.log(`   Git Modified: ${result.gitModified}`)
    console.log(`   Git Deleted:  ${result.gitDeleted}`)
    console.log(`   Git Added:    ${result.gitAdded}`)
    console.log(`   SCM Graph:    ${result.scmGraphForeground1}`)
  }

  // Проверяем уникальность цветов
  console.log('\n🔍 ПРОВЕРКА УНИКАЛЬНОСТИ ЦВЕТОВ')
  console.log('='.repeat(40))

  const uniqueBadgeBackgrounds = new Set(results.map((r) => r.badgeBackground))
  const uniqueGitModified = new Set(results.map((r) => r.gitModified))

  console.log(
    `✅ Уникальных цветов фона бейджей: ${uniqueBadgeBackgrounds.size}/${results.length}`
  )
  console.log(
    `✅ Уникальных цветов Git Modified: ${uniqueGitModified.size}/${results.length}`
  )

  if (uniqueBadgeBackgrounds.size === results.length) {
    console.log('🎉 Все темы имеют уникальные цвета бейджей!')
  }

  if (uniqueGitModified.size === results.length) {
    console.log('🎉 Все темы имеют уникальные Git-цвета!')
  }

  // Проверяем контрастность
  console.log('\n📊 КОНТРАСТНОСТЬ БЕЙДЖЕЙ')
  console.log('='.repeat(30))

  const goodContrast = results.filter((r) => r.contrast && r.contrast >= 4.5)
  const poorContrast = results.filter((r) => r.contrast && r.contrast < 4.5)

  console.log(`✅ Хорошая контрастность (≥4.5): ${goodContrast.length}`)
  console.log(`⚠️  Низкая контрастность (<4.5): ${poorContrast.length}`)

  if (poorContrast.length > 0) {
    console.log('\n⚠️  Темы с низкой контрастностью:')
    for (const theme of poorContrast) {
      console.log(`   - ${theme.themeName}: ${theme.contrast?.toFixed(2)}:1`)
    }
  }
}

// Запуск анализа
analyzeThemes()
