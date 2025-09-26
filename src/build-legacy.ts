/**
 * Legacy сборка темы (старая архитектура)
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { generateTheme, loadEnvVars } from './generators/theme'
import { PluginManager, type PluginContext } from './legacy/pluginSystem'
import { ColorSchemeRegistry } from './legacy/colorSchemeFactory'
import { PaletteManager } from './legacy/paletteManager'
import { CacheManager } from './legacy/cacheManager'
import { TokenRegistry } from './legacy/TokenRegistryImpl'
import { loadConfig, generatePalettesFromConfig } from './legacy/config'

const root = path.resolve(__dirname, '..')
const env = loadEnvVars()
const themePath = path.join(root, 'themes', `${env.THEME_FILENAME}.json`)

export const buildTheme = () => {
  try {
    const quiet = process.env.QUIET === '1'
    const log = (...args: any[]) => {
      if (!quiet) console.log(...args)
    }

    log('🏗️  Сборка темы (legacy)...')
    log(`📝 Название: ${env.THEME_DISPLAY_NAME}`)
    log(`🎨 Тип: ${env.THEME_TYPE}`)
    
    const useConfig = process.env.USE_CONFIG === '1'
    let palettes
    
    if (useConfig) {
      const configName = process.env.THEME_CONFIG || 'tokyo-night'
      log(`⚙️  Используется конфигурация: ${configName}`)
      
      const config = loadConfig(configName)
      if (!config) {
        throw new Error(`Неизвестная конфигурация: ${configName}`)
      }
      
      palettes = generatePalettesFromConfig(config)
      log(`🎨 Тип темы из конфигурации: ${config.type}`)
    } else {
      const schemeRegistry = new ColorSchemeRegistry()
      const schemeName = process.env.THEME_SCHEME || 'tokyo-night'
      log(`🎨 Цветовая схема: ${schemeName}`)
      
      palettes = schemeRegistry.createPalettesForScheme(schemeName)
      if (!palettes) {
        throw new Error(`Неизвестная цветовая схема: ${schemeName}`)
      }
    }
    
    const cacheManager = new CacheManager(1024)
    const paletteManager = new PaletteManager(cacheManager)
    
    paletteManager.updateInterfacePalette(palettes.interface)
    paletteManager.updateSyntaxPalette(palettes.syntax)
    paletteManager.updateRichSyntaxPalette(palettes.richSyntax)
    
    const pluginManager = new PluginManager()
    const tokenRegistry = new TokenRegistry()
    
    const pluginContext: PluginContext = {
      paletteManager,
      tokenRegistry,
    }
    
    pluginManager.initialize(pluginContext)
    
    const themesDir = path.dirname(themePath)
    if (!fs.existsSync(themesDir)) {
      fs.mkdirSync(themesDir, { recursive: true })
    }

    const theme = generateTheme(env, paletteManager)
    const finalTheme = pluginManager.applyToTheme(theme)
    
    const themeJson = JSON.stringify(finalTheme, null, 2) + '\n'
    fs.writeFileSync(themePath, themeJson, 'utf8')

    log(`✅ Тема создана: ${themePath}`)
    log(`📊 Цветов: ${Object.keys(finalTheme.colors).length}, Токенов: ${finalTheme.tokenColors.length}`)
    log(`💾 Кэш: ${JSON.stringify(cacheManager.getStats())}`)
  } catch (error) {
    console.error('❌ Ошибка сборки темы:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

if (require.main === module) {
  buildTheme()
}