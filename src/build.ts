/**
 * Упрощенная сборка Tokyo Night темы
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { ThemeGenerator, ConfigManager } from './core/simplified'

const root = path.resolve(__dirname, '..')
const themePath = path.join(root, 'themes', 'tokyo-night-modern-color-theme.json')

export const buildTheme = () => {
  try {
    const config = ConfigManager.getDefault()
    
    console.log('🏗️  Сборка темы...')
    console.log(`📝 Название: ${config.theme.displayName}`)
    console.log(`🎨 Тип: ${config.theme.type}`)
    
    const theme = ThemeGenerator.generate({
      name: config.theme.name,
      displayName: config.theme.displayName,
      type: config.theme.type,
      overrides: config.overrides
    })

    const themesDir = path.dirname(themePath)
    if (!fs.existsSync(themesDir)) {
      fs.mkdirSync(themesDir, { recursive: true })
    }

    const themeJson = JSON.stringify(theme, null, 2) + '\n'
    fs.writeFileSync(themePath, themeJson, 'utf8')

    console.log(`✅ Тема создана: ${themePath}`)
    console.log(`📊 Цветов: ${Object.keys(theme.colors).length}, Токенов: ${theme.tokenColors.length}`)
  } catch (error) {
    console.error('❌ Ошибка сборки темы:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

if (require.main === module) {
  buildTheme()
}
