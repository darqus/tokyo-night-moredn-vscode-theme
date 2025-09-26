/**
 * Упрощенный менеджер конфигурации
 */
import type { UnifiedConfig, SimplePalette } from '../../types/simplified'
import { basePalette } from '../palette'

export class ConfigManager {
  private static configs = new Map<string, UnifiedConfig>()

  static register(name: string, config: UnifiedConfig): void {
    this.configs.set(name, config)
  }

  static get(name: string): UnifiedConfig | null {
    return this.configs.get(name) || null
  }

  static getDefault(): UnifiedConfig {
    return {
      theme: {
        name: 'tokyo-night-modern',
        displayName: 'Tokyo Night Modern',
        type: 'dark',
        version: '2.0.6',
      },
      palette: this.createDefaultPalette(),
    }
  }

  private static createDefaultPalette(): SimplePalette {
    return {
      bg: {
        base: basePalette.bgPrimary,
        elevated: basePalette.bgTertiary,
        overlay: basePalette.bgOverlay,
        hover: basePalette.bgHover,
        selection: basePalette.bgSelection,
      },
      text: {
        primary: basePalette.textDefault,
        secondary: basePalette.textSecondary,
        muted: basePalette.textMuted,
        inverse: basePalette.textInverse,
      },
      state: {
        success: basePalette.stateSuccess,
        warning: basePalette.stateWarning,
        error: basePalette.stateError,
        info: basePalette.stateInfo,
      },
      accent: {
        primary: basePalette.blue,
        secondary: basePalette.cyan,
        border: basePalette.borderDefault,
      },
    }
  }
}
