/**
 * Пример плагина для Tokyo Night темы
 * Добавляет пользовательские цвета для конкретных элементов UI
 */

import type { ThemePlugin, PluginContext } from './core/pluginSystem'
import type { VSCodeTheme } from './types/theme'

// Пример плагина, который добавляет пользовательские цвета
export const customAccentPlugin: ThemePlugin = {
  id: 'custom-accent-plugin',
  name: 'Custom Accent Plugin',
  version: '1.0.0',
  description: 'Adds custom accent colors to the theme',
  priority: 10, // Высокий приоритет для раннего запуска
  
  setup: (context: PluginContext) => {
    console.log('Custom Accent Plugin: Setting up custom accent colors...')
    
    // Обновляем интерфейсную палитру с пользовательскими акцентными цветами
    const customInterfaceUpdates = {
      state: {
        accent: '#ff6b6b', // Нестандартный акцентный цвет
        accentHover: '#ff5252',
        accentActive: '#ff1744',
      }
    }
    
    context.paletteManager.updateInterfacePalette(customInterfaceUpdates as any)
    console.log('Custom Accent Plugin: Updated interface palette with custom accents')
  },
  
  onThemeGeneration: (theme: VSCodeTheme): VSCodeTheme => {
    console.log('Custom Accent Plugin: Modifying theme colors...')
    
    // Добавляем/модифицируем некоторые цвета в готовой теме
    const modifiedTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        // Можно добавить или изменить конкретные цвета
        'activityBar.activeBorder': '#ff6b6b',
        'statusBar.border': '#ff6b6b',
        'tab.activeBorder': '#ff6b6b',
      }
    }
    
    return modifiedTheme
  }
}

// Пример плагина для добавления поддержки high contrast
export const highContrastPlugin: ThemePlugin = {
  id: 'high-contrast-plugin',
  name: 'High Contrast Plugin',
  version: '1.0.0',
  description: 'Enhances contrast for better accessibility',
  priority: 5,
  
  setup: (context: PluginContext) => {
    console.log('High Contrast Plugin: Adjusting colors for better contrast...')
    
    // Получаем текущую палитру
    const interfacePalette = context.paletteManager.getInterfacePalette()
    
    // Улучшаем контрастность текста
    const enhancedPalette = {
      ...interfacePalette,
      text: {
        ...interfacePalette.text,
        primary: '#000000', // Более контрастный основной текст
        secondary: '#333333', // Более контрастный вторичный текст
      },
      // Увеличиваем контрастность фона
      bg: {
        ...interfacePalette.bg,
        base: '#ffffff', // Чисто белый фон для максимального контраста
        elevated: '#ffffff',
        overlay: '#ffffff',
      }
    }
    
    // Обновляем палитру
    context.paletteManager.updateInterfacePalette(enhancedPalette)
    console.log('High Contrast Plugin: Updated palette for high contrast')
  }
}

export default customAccentPlugin