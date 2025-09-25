/**
 * Сборка Tokyo Night темы
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { generateTheme, loadEnvVars } from './generators/theme'

const root = path.resolve(__dirname, '..')
const env = loadEnvVars()
const themePath = path.join(root, 'themes', `${env.THEME_FILENAME}.json`)

export const buildTheme = () => {
  try {
    const quiet = process.env.QUIET === '1'
    const log = (...args: any[]) => {
      if (!quiet) console.log(...args)
    }

    log('🏗️  Сборка темы...')
    log(`📝 Название: ${env.THEME_DISPLAY_NAME}`)
    log(`🎨 Тип: ${env.THEME_TYPE}`)

    const themesDir = path.dirname(themePath)
    if (!fs.existsSync(themesDir)) {
      fs.mkdirSync(themesDir, { recursive: true })
    }

    const theme = generateTheme(env)
    const themeJson = JSON.stringify(theme, null, 2) + '\n'
    fs.writeFileSync(themePath, themeJson, 'utf8')

    log(`✅ Тема создана: ${themePath}`)
    log(
      `📊 Цветов: ${Object.keys(theme.colors).length}, Токенов: ${
        theme.tokenColors.length
      }`
    )
  } catch (error) {
    console.error(
      '❌ Ошибка сборки темы:',
      error instanceof Error ? error.message : String(error)
    )
    process.exit(1)
  }
}

/* istanbul ignore next */
if (require.main === module) {
  buildTheme()
}
