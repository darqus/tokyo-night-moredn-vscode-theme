/**
 * Система плагинов для темы Tokyo Night Modern
 * Позволяет расширять функциональность темы без изменения основного кода
 */

import type { VSCodeTheme } from '../types/theme'
import type { IPaletteManager } from './interfaces/IPaletteManager'
import type { ITokenRegistry } from './tokenRegistry'

export interface PluginContext {
  paletteManager: IPaletteManager
  tokenRegistry: ITokenRegistry
}

export interface ThemePlugin {
  id: string
  name: string
  version: string
  description?: string
  priority?: number // Чем выше значение, тем позже запускается плагин
  setup: (context: PluginContext) => void
  onThemeGeneration?: (theme: VSCodeTheme) => VSCodeTheme
}

export class PluginManager {
  private plugins: ThemePlugin[] = []
  private initialized = false

  /**
   * Регистрация плагина
   */
  register(plugin: ThemePlugin): void {
    // Проверяем уникальность ID плагина
    if (this.plugins.some(p => p.id === plugin.id)) {
      throw new Error(`Plugin with ID "${plugin.id}" is already registered`)
    }

    this.plugins.push({
      ...plugin,
      priority: plugin.priority ?? 0
    })
  }

  /**
   * Инициализация всех плагинов
   */
  initialize(context: PluginContext): void {
    if (this.initialized) {
      console.warn('Plugin manager already initialized')
      return
    }

    // Сортируем плагины по приоритету (сначала с меньшим числом)
    const sortedPlugins = [...this.plugins].sort((a, b) => (a.priority || 0) - (b.priority || 0))

    for (const plugin of sortedPlugins) {
      try {
        plugin.setup(context)
      } catch (error) {
        console.error(`Error initializing plugin "${plugin.name}":`, error)
      }
    }

    this.initialized = true
  }

  /**
   * Применение изменений от плагинов к теме
   */
  applyToTheme(theme: VSCodeTheme): VSCodeTheme {
    let result = { ...theme }

    // Сортируем плагины по приоритету для обработки темы
    const sortedPlugins = [...this.plugins].sort((a, b) => (a.priority || 0) - (b.priority || 0))

    for (const plugin of sortedPlugins) {
      if (plugin.onThemeGeneration) {
        try {
          result = plugin.onThemeGeneration(result)
        } catch (error) {
          console.error(`Error applying theme modifications from plugin "${plugin.name}":`, error)
        }
      }
    }

    return result
  }

  /**
   * Получение списка зарегистрированных плагинов
   */
  getPlugins(): ThemePlugin[] {
    return [...this.plugins]
  }

  /**
   * Удаление плагина по ID
   */
  unregister(id: string): boolean {
    const initialLength = this.plugins.length
    this.plugins = this.plugins.filter(plugin => plugin.id !== id)
    return this.plugins.length < initialLength
  }
}