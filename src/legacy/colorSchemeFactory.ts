/**
 * Абстрактная фабрика для создания различных цветовых схем
 * Позволяет легко добавлять новые варианты темы (светлая, high contrast и т.д.)
 */

import type { InterfacePalette, SyntaxPalette, RichSyntaxPalette } from '../types/theme'
import type { basePalette } from './palette'
type BasePalette = typeof basePalette
import { basePalette as tokyoNightBasePalette } from './palette'
import { interfacePalette as tokyoNightInterfacePalette } from './interface'
import { syntaxPalette as tokyoNightSyntaxPalette } from './syntax'
import { richSyntaxPalette as tokyoNightRichSyntaxPalette } from './richSyntax'

// Интерфейсы для фабрики
export interface ColorSchemeFactory {
  createBasePalette(): BasePalette
  createInterfacePalette(base: BasePalette): InterfacePalette
  createSyntaxPalette(base: BasePalette): SyntaxPalette
  createRichSyntaxPalette(base: BasePalette): RichSyntaxPalette
  createAllPalettes(): {
    base: BasePalette
    interface: InterfacePalette
    syntax: SyntaxPalette
    richSyntax: RichSyntaxPalette
  }
}

// Базовая реализация фабрики
export abstract class BaseColorSchemeFactory implements ColorSchemeFactory {
  abstract createBasePalette(): BasePalette
  abstract createInterfacePalette(base: BasePalette): InterfacePalette
  abstract createSyntaxPalette(base: BasePalette): SyntaxPalette
  abstract createRichSyntaxPalette(base: BasePalette): RichSyntaxPalette

  /**
   * Создание всех палитр за один вызов
   */
  createAllPalettes(): {
    base: BasePalette
    interface: InterfacePalette
    syntax: SyntaxPalette
    richSyntax: RichSyntaxPalette
  } {
    const base = this.createBasePalette()
    return {
      base,
      interface: this.createInterfacePalette(base),
      syntax: this.createSyntaxPalette(base),
      richSyntax: this.createRichSyntaxPalette(base)
    }
  }
}

// Фабрика для темной темы Tokyo Night
export class TokyoNightSchemeFactory extends BaseColorSchemeFactory {
  createBasePalette(): BasePalette {
    // Возвращаем базовую палитру Tokyo Night
    return tokyoNightBasePalette
  }

  createInterfacePalette(base: BasePalette): InterfacePalette {
    // Возвращаем интерфейсную палитру Tokyo Night
    return tokyoNightInterfacePalette
  }

  createSyntaxPalette(base: BasePalette): SyntaxPalette {
    // Возвращаем синтаксическую палитру Tokyo Night
    return tokyoNightSyntaxPalette
  }

  createRichSyntaxPalette(base: BasePalette): RichSyntaxPalette {
    // Возвращаем расширенную синтаксическую палитру Tokyo Night
    return tokyoNightRichSyntaxPalette
  }
}

// Пример фабрики для светлой темы (упрощённая реализация)
export class TokyoNightLightSchemeFactory extends BaseColorSchemeFactory {
  createBasePalette(): BasePalette {
    // Возвращаем базовую палитру Tokyo Night (в реальности должна быть светлая версия)
    return tokyoNightBasePalette
  }

  createInterfacePalette(base: BasePalette): InterfacePalette {
    // Возвращаем интерфейсную палитру Tokyo Night
    return tokyoNightInterfacePalette
  }

  createSyntaxPalette(base: BasePalette): SyntaxPalette {
    // Возвращаем синтаксическую палитру Tokyo Night
    return tokyoNightSyntaxPalette
  }

  createRichSyntaxPalette(base: BasePalette): RichSyntaxPalette {
    // Возвращаем расширенную синтаксическую палитру Tokyo Night
    return tokyoNightRichSyntaxPalette
  }
}

// Реестр всех доступных фабрик
export class ColorSchemeRegistry {
  private factories: Map<string, ColorSchemeFactory> = new Map()

  constructor() {
    // Регистрируем стандартные фабрики
    this.registerFactory('tokyo-night', new TokyoNightSchemeFactory())
    this.registerFactory('tokyo-night-light', new TokyoNightLightSchemeFactory())
  }

  registerFactory(name: string, factory: ColorSchemeFactory): void {
    this.factories.set(name, factory)
  }

  getFactory(name: string): ColorSchemeFactory | undefined {
    return this.factories.get(name)
  }

  getAvailableSchemes(): string[] {
    return Array.from(this.factories.keys())
  }

  createPalettesForScheme(schemeName: string): {
    base: BasePalette
    interface: InterfacePalette
    syntax: SyntaxPalette
    richSyntax: RichSyntaxPalette
  } | null {
    const factory = this.getFactory(schemeName)
    if (!factory) {
      return null
    }
    return factory.createAllPalettes()
  }
}