/**
 * Сборка Tokyo Night темы
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { generateTheme, loadEnvVars } from './generators/theme'
import { PluginManager, type PluginContext } from './core/pluginSystem'
import { ColorSchemeRegistry } from './core/colorSchemeFactory'
import { PaletteManager } from './core/paletteManager'
import { CacheManager } from './core/cacheManager'
import { TokenRegistry } from './core/TokenRegistryImpl'
import { loadConfig, generatePalettesFromConfig } from './config'

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
    
    // Проверяем, используется ли декларативная конфигурация
    const useConfig = process.env.USE_CONFIG === '1'
    
    let palettes
    
    if (useConfig) {
      // Используем конфигурационный подход
      const configName = process.env.THEME_CONFIG || 'tokyo-night'
      log(`⚙️  Используется конфигурация: ${configName}`)
      
      const config = loadConfig(configName)
      if (!config) {
        throw new Error(`Неизвестная конфигурация: ${configName}`)
      }
      
      palettes = generatePalettesFromConfig(config)
      log(`🎨 Тип темы из конфигурации: ${config.type}`)
    } else {
      // Используем фабричный подход
      const schemeRegistry = new ColorSchemeRegistry()
      
      // Получаем имя схемы из переменной окружения или используем по умолчанию
      const schemeName = process.env.THEME_SCHEME || 'tokyo-night'
      log(`🎨 Цветовая схема: ${schemeName}`)
      
      // Создаем палитры для выбранной схемы
      palettes = schemeRegistry.createPalettesForScheme(schemeName)
      if (!palettes) {
        throw new Error(`Неизвестная цветовая схема: ${schemeName}`)
      }
    }
    
    // Инициализируем менеджер кэша
    const cacheManager = new CacheManager(1024) // увеличенный размер кэша
    
    // Создаем менеджер палитр с новыми палитрами
    const paletteManager = new PaletteManager(cacheManager)
    
    // Обновляем палитры сгенерированными значениями
    paletteManager.updateInterfacePalette(palettes.interface)
    paletteManager.updateSyntaxPalette(palettes.syntax)
    paletteManager.updateRichSyntaxPalette(palettes.richSyntax)
    
    // Инициализируем менеджер плагинов
    const pluginManager = new PluginManager()
    
    // Создаем токен реестр
    const tokenRegistry = new TokenRegistry()
    
    // Создаем контекст для плагинов
    const pluginContext: PluginContext = {
      paletteManager,
      tokenRegistry,
    }
    
    // Инициализируем плагины
    pluginManager.initialize(pluginContext)
    
    const themesDir = path.dirname(themePath)
    if (!fs.existsSync(themesDir)) {
      fs.mkdirSync(themesDir, { recursive: true })
    }

    // Генерируем тему с учетом текущей палитры
    const theme = generateTheme(env, paletteManager)
    
    // Применяем модификации от плагинов
    const finalTheme = pluginManager.applyToTheme(theme)
    
    const themeJson = JSON.stringify(finalTheme, null, 2) + '\n'
    fs.writeFileSync(themePath, themeJson, 'utf8')

    log(`✅ Тема создана: ${themePath}`)
    log(
      `📊 Цветов: ${Object.keys(finalTheme.colors).length}, Токенов: ${
        finalTheme.tokenColors.length
      }`
    )
    
    log(`💾 Кэш: ${JSON.stringify(cacheManager.getStats())}`)
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
