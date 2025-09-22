/**
 * Декларативный DSL для определения токенов VS Code
 * Упрощает создание и поддержку маппингов токенов
 */

import type { Hex, InterfacePalette } from '../types/theme'
import type { SurfaceType } from '../core/surfaces'
import type { ValidTokens, ValidationResult } from '../types/validation'
import { pickReadableAdvanced } from './pickReadable'
import { validateColorMapping, isValidToken } from '../types/validation'

// Типы для DSL
export type ColorSource =
  | Hex // Прямой цвет
  | { surface: SurfaceType; role: ForegroundRole } // Текст с поверхности
  | { surface: SurfaceType; element: 'background' | 'border' } // Элемент поверхности
  | { palette: keyof InterfacePalette } // Прямая ссылка на палитру
  | { computed: (ip: InterfacePalette) => string } // Вычисляемый цвет

export type ForegroundRole = 'primary' | 'muted' | 'subtle' | 'inactive'

// Конфигурация токена с валидацией
export interface TokenConfig {
  token: ValidTokens
  source: ColorSource
  description?: string
  deprecated?: boolean
  notes?: string
}

// Группа токенов
export interface TokenGroup {
  name: string
  description?: string
  tokens: TokenConfig[]
}

// Полная конфигурация темы
export interface ThemeTokenConfig {
  groups: TokenGroup[]
}

/**
 * Helper функции для создания источников цветов
 */
export const surface = {
  /**
   * Фон поверхности
   */
  background: (surface: SurfaceType): ColorSource => ({
    surface,
    element: 'background',
  }),

  /**
   * Граница поверхности
   */
  border: (surface: SurfaceType): ColorSource => ({
    surface,
    element: 'border',
  }),

  /**
   * Текст на поверхности
   */
  text: (
    surface: SurfaceType,
    role: ForegroundRole = 'primary'
  ): ColorSource => ({
    surface,
    role,
  }),
}

/**
 * Helper для прямой ссылки на палитру
 */
export const palette = (key: keyof InterfacePalette): ColorSource => ({
  palette: key,
})

/**
 * Helper для вычисляемого цвета
 */
export const computed = (
  fn: (ip: InterfacePalette) => string
): ColorSource => ({
  computed: fn,
})

/**
 * Resolver цветовых источников в конкретные цвета
 */
export class ColorResolver {
  constructor(private interfacePalette: InterfacePalette) {}

  resolve(source: ColorSource): string {
    if (typeof source === 'string') {
      return source
    }

    if ('surface' in source) {
      if ('role' in source) {
        // Текст на поверхности
        return pickReadableAdvanced(
          this.interfacePalette,
          source.surface,
          source.role === 'primary'
            ? 'muted'
            : (source.role as 'muted' | 'subtle')
        )
      } else if ('element' in source) {
        // Элемент поверхности
        return this.getSurfaceElement(source.surface, source.element)
      }
    }

    if ('palette' in source) {
      // Прямая ссылка на палитру
      return this.resolvePaletteKey(source.palette)
    }

    if ('computed' in source) {
      // Вычисляемый цвет
      return source.computed(this.interfacePalette)
    }

    throw new Error(`Unknown color source: ${JSON.stringify(source)}`)
  }

  private getSurfaceElement(
    surface: SurfaceType,
    element: 'background' | 'border'
  ): string {
    const ip = this.interfacePalette

    // Простое маппинг поверхностей на фоны и границы
    switch (surface) {
      case 'base':
        return element === 'background' ? ip.bg.base : ip.border.default
      case 'elevated':
        return element === 'background' ? ip.bg.elevated : ip.border.default
      case 'overlay':
        return element === 'background' ? ip.bg.overlay : ip.border.focus
      case 'editor':
        return element === 'background' ? ip.bg.base : ip.border.default
      case 'terminal':
        return element === 'background' ? ip.bg.base : ip.border.default
      case 'panel':
        return element === 'background' ? ip.bg.elevated : ip.border.default
      case 'menu':
        return element === 'background' ? ip.bg.elevated : ip.border.default
      case 'hover':
        return element === 'background' ? ip.bg.hover : ip.border.default
      case 'selection':
        return element === 'background' ? ip.bg.selection : ip.border.focus
      case 'input':
        return element === 'background' ? ip.bg.input : ip.border.default
      default:
        return element === 'background' ? ip.bg.base : ip.border.default
    }
  }

  private resolvePaletteKey(key: keyof InterfacePalette): string {
    const value = this.interfacePalette[key]

    if (typeof value === 'string') {
      return value
    }

    // Для вложенных объектов возвращаем первое строковое значение
    if (typeof value === 'object' && value !== null) {
      const firstStringValue = Object.values(value).find(
        (v) => typeof v === 'string'
      )
      if (firstStringValue) {
        return firstStringValue as string
      }
    }

    throw new Error(`Cannot resolve palette key: ${String(key)}`)
  }
}

/**
 * Создать маппинг токенов из конфигурации с валидацией
 */
export function createTokenMapping(
  config: ThemeTokenConfig,
  interfacePalette: InterfacePalette
): Record<string, string> {
  const resolver = new ColorResolver(interfacePalette)
  const mapping: Record<string, string> = {}

  for (const group of config.groups) {
    for (const tokenConfig of group.tokens) {
      if (!tokenConfig.deprecated) {
        mapping[tokenConfig.token] = resolver.resolve(tokenConfig.source)
      }
    }
  }

  return mapping
}

/**
 * Создать и валидировать маппинг токенов
 */
export function createValidatedTokenMapping(
  config: ThemeTokenConfig,
  interfacePalette: InterfacePalette
): { mapping: Record<string, string>; validation: ValidationResult } {
  const mapping = createTokenMapping(config, interfacePalette)
  const validation = validateColorMapping(mapping)

  return { mapping, validation }
}
