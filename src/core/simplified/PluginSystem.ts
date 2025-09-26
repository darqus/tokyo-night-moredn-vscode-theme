/**
 * Упрощенная система плагинов
 */
import type { VSCodeTheme } from '../../types/theme'

export interface SimplePlugin {
  name: string
  transform: (theme: VSCodeTheme) => VSCodeTheme
}

export class PluginSystem {
  private static plugins: SimplePlugin[] = []

  static register(plugin: SimplePlugin): void {
    this.plugins.push(plugin)
  }

  static apply(theme: VSCodeTheme): VSCodeTheme {
    return this.plugins.reduce((result, plugin) => {
      try {
        return plugin.transform(result)
      } catch (error) {
        console.warn(`Plugin ${plugin.name} failed:`, error)
        return result
      }
    }, theme)
  }

  static clear(): void {
    this.plugins = []
  }
}