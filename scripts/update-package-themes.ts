import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { readdirSync } from 'fs'

/**
 * Автоматически обновляет список тем в package.json на основе файлов в папке themes
 */
export function updatePackageJsonThemes(): void {
  const packageJsonPath = join(process.cwd(), 'package.json')
  const themesDir = join(process.cwd(), 'themes')

  // Читаем package.json
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

  // Получаем список файлов тем
  const themeFiles = readdirSync(themesDir)
    .filter((file) => file.endsWith('-color-theme.json'))
    .filter((file) => !file.startsWith('test-')) // Исключаем тестовые темы
    .sort()

  // Создаем массив тем для package.json
  const themes = themeFiles.map((file) => {
    const themeName = file.replace('-color-theme.json', '')
    const label = generateThemeLabel(themeName)
    const uiTheme = determineUiTheme(themeName)

    return {
      label,
      uiTheme,
      path: `./themes/${file}`,
    }
  })

  // Обновляем package.json
  packageJson.contributes.themes = themes

  // Сохраняем файл
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  console.log(`✅ Обновлен package.json с ${themes.length} темами`)
  themes.forEach((theme) => {
    console.log(`   ${theme.label} (${theme.uiTheme})`)
  })
}

/**
 * Генерирует красивое название темы из имени файла
 */
function generateThemeLabel(themeName: string): string {
  // Убираем префикс tokyo-night-
  const cleanName = themeName.replace(/^tokyo-night-/, '')

  // Специальные случаи
  const specialNames: Record<string, string> = {
    dark: 'Tokyo Night Dark',
    light: 'Tokyo Night Light',
    storm: 'Tokyo Night Storm',
    moon: 'Tokyo Night Moon',
    'high-contrast': 'Tokyo Night High Contrast',
    'low-contrast': 'Tokyo Night Low Contrast',
    spring: 'Tokyo Night Spring',
    summer: 'Tokyo Night Summer',
    autumn: 'Tokyo Night Autumn',
    winter: 'Tokyo Night Winter',
    neon: 'Tokyo Night Neon',
    pastel: 'Tokyo Night Pastel',
    retro: 'Tokyo Night Retro',
    'protanopia-friendly': 'Tokyo Night Protanopia Friendly',
    'deuteranopia-friendly': 'Tokyo Night Deuteranopia Friendly',
  }

  if (specialNames[cleanName]) {
    return specialNames[cleanName]
  }

  // Обработка градиентов
  if (cleanName.startsWith('gradient-gradient-')) {
    const number = cleanName.replace('gradient-gradient-', '')
    return `Tokyo Night Gradient ${number}`
  }

  // Обработка кастомных тем - делаем заглавными первые буквы
  return (
    'Tokyo Night ' +
    cleanName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

/**
 * Определяет тип UI темы (vs-dark или vs)
 */
function determineUiTheme(themeName: string): 'vs-dark' | 'vs' {
  // Светлые темы
  if (themeName.includes('light')) {
    return 'vs'
  }

  // Все остальные темы тёмные
  return 'vs-dark'
}

/**
 * CLI интерфейс
 */
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Утилита для обновления списка тем в package.json

ИСПОЛЬЗОВАНИЕ:
  ts-node scripts/update-package-themes.ts

ОПИСАНИЕ:
  Автоматически сканирует папку themes/ и обновляет
  секцию contributes.themes в package.json

ОПЦИИ:
  --help, -h    Показать эту справку
    `)
    process.exit(0)
  }

  try {
    updatePackageJsonThemes()
  } catch (error) {
    console.error('❌ Ошибка обновления package.json:', error)
    process.exit(1)
  }
}
