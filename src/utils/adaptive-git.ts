import { Hex } from '../types'
import { extendedPalette } from '../palette/extended'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

/**
 * Адаптивные Git-цвета для разных типов тем
 * Обеспечивает высокий контраст и читаемость в любой теме
 */
export interface AdaptiveGitColors {
  badge: {
    background: Hex
    foreground: Hex
    activityBar: Hex
    extension: Hex
    extensionForeground: Hex
  }
  decoration: {
    modified: Hex
    deleted: Hex
    added: Hex
    untracked: Hex
    ignored: Hex
    conflicting: Hex
    renamed: Hex
    stageModified: Hex
    stageDeleted: Hex
  }
  scmGraph: {
    foreground1: Hex
    foreground2: Hex
    foreground3: Hex
    foreground4: Hex
    foreground5: Hex
    hoverLabel: Hex
    hoverAdditions: Hex
    hoverDeletions: Hex
    refColor: Hex
    remoteRefColor: Hex
    baseRefColor: Hex
    hoverDefault: Hex
  }
}

/**
 * Определяет адаптивные Git-цвета на основе типа темы
 */
function getAdaptiveGitColorsForTheme(
  variant: string,
  type?: string
): AdaptiveGitColors {
  const isLightTheme = type === 'light' || variant.includes('light')
  const isStormTheme = variant.includes('storm') || type === 'storm'
  const isMoonTheme = variant.includes('moon') || type === 'moon'
  const isContrastTheme = variant.includes('contrast') || type === 'contrast'
  const isPastelTheme = variant.includes('pastel') || type === 'pastel'
  const isNeonTheme = variant.includes('neon') || type === 'neon'

  if (isLightTheme) {
    // Светлая тема - темные цвета с высоким контрастом
    return {
      badge: {
        background: '#e8e9f3' as Hex, // Светло-серый фон для лучшей видимости
        foreground: '#1f2328' as Hex, // Темный текст для контраста
        activityBar: '#005cc5' as Hex, // Насыщенный синий для активности
        extension: '#0969da' as Hex, // Яркий синий для расширений
        extensionForeground: '#ffffff' as Hex, // Белый текст на синем фоне
      },
      decoration: {
        modified: '#0969da' as Hex, // Синий для измененных файлов
        deleted: '#cf222e' as Hex, // Красный для удаленных файлов
        added: '#1a7f37' as Hex, // Зеленый для добавленных файлов
        untracked: '#1f883d' as Hex, // Зеленый для неотслеживаемых
        ignored: '#656d76' as Hex, // Серый для игнорируемых
        conflicting: '#fb8500' as Hex, // Оранжевый для конфликтов
        renamed: '#8250df' as Hex, // Фиолетовый для переименованных
        stageModified: '#0969da' as Hex, // Синий для staged изменений
        stageDeleted: '#cf222e' as Hex, // Красный для staged удалений
      },
      scmGraph: {
        foreground1: '#fd7e14' as Hex, // Оранжевый
        foreground2: '#ffc107' as Hex, // Желтый
        foreground3: '#20c997' as Hex, // Морской зеленый
        foreground4: '#0969da' as Hex, // Синий
        foreground5: '#8250df' as Hex, // Фиолетовый
        hoverLabel: '#f6f8fa' as Hex, // Светлый фон для подписи
        hoverAdditions: '#1a7f37' as Hex, // Зеленый для добавлений
        hoverDeletions: '#cf222e' as Hex, // Красный для удалений
        refColor: '#0969da' as Hex, // Синий для ссылок
        remoteRefColor: '#1f883d' as Hex, // Зеленый для удаленных ссылок
        baseRefColor: '#8250df' as Hex, // Фиолетовый для базовых ссылок
        hoverDefault: '#1f2328' as Hex, // Темный текст для наведения
      },
    }
  }

  if (isContrastTheme) {
    // Высококонтрастная тема - максимальная читаемость
    return {
      badge: {
        background: '#ffff00' as Hex, // Яркий желтый фон
        foreground: '#000000' as Hex, // Черный текст
        activityBar: '#00ffff' as Hex, // Циан для активности
        extension: '#ff00ff' as Hex, // Магента для расширений
        extensionForeground: '#000000' as Hex, // Черный текст
      },
      decoration: {
        modified: '#0080ff' as Hex, // Яркий синий
        deleted: '#ff0040' as Hex, // Яркий красный
        added: '#00ff40' as Hex, // Яркий зеленый
        untracked: '#40ff00' as Hex, // Лаймовый зеленый
        ignored: '#808080' as Hex, // Серый
        conflicting: '#ff8000' as Hex, // Яркий оранжевый
        renamed: '#8000ff' as Hex, // Яркий фиолетовый
        stageModified: '#0080ff' as Hex, // Яркий синий
        stageDeleted: '#ff0040' as Hex, // Яркий красный
      },
      scmGraph: {
        foreground1: '#ff8000' as Hex, // Оранжевый
        foreground2: '#ffff00' as Hex, // Желтый
        foreground3: '#00ffff' as Hex, // Циан
        foreground4: '#0080ff' as Hex, // Синий
        foreground5: '#ff00ff' as Hex, // Магента
        hoverLabel: '#000000' as Hex, // Черный фон
        hoverAdditions: '#00ff40' as Hex, // Яркий зеленый
        hoverDeletions: '#ff0040' as Hex, // Яркий красный
        refColor: '#0080ff' as Hex, // Яркий синий
        remoteRefColor: '#40ff00' as Hex, // Яркий зеленый для удаленных ссылок
        baseRefColor: '#8000ff' as Hex, // Яркий фиолетовый для базовых ссылок
        hoverDefault: '#ffffff' as Hex, // Белый текст для наведения
      },
    }
  }

  if (isNeonTheme) {
    // Неоновая тема - яркие светящиеся цвета
    return {
      badge: {
        background: '#aa00cc' as Hex, // Убираем прозрачность для лучшего контраста
        foreground: '#00ffff' as Hex, // Неоновый циан
        activityBar: '#00ff88' as Hex, // Неоновый зеленый
        extension: '#ff0088' as Hex, // Неоновый розовый
        extensionForeground: '#ffffff' as Hex, // Белый текст
      },
      decoration: {
        modified: '#00aaff' as Hex, // Неоновый синий
        deleted: '#ff4466' as Hex, // Неоновый красный
        added: '#44ff88' as Hex, // Неоновый зеленый
        untracked: '#88ff44' as Hex, // Лаймовый неон
        ignored: '#888888' as Hex, // Приглушенный серый
        conflicting: '#ffaa00' as Hex, // Неоновый оранжевый
        renamed: '#aa44ff' as Hex, // Неоновый фиолетовый
        stageModified: '#00aaff' as Hex, // Неоновый синий
        stageDeleted: '#ff4466' as Hex, // Неоновый красный
      },
      scmGraph: {
        foreground1: '#ff6600' as Hex, // Неоновый оранжевый
        foreground2: '#ffdd00' as Hex, // Неоновый желтый
        foreground3: '#00ffaa' as Hex, // Неоновый морской
        foreground4: '#0088ff' as Hex, // Неоновый синий
        foreground5: '#cc00ff' as Hex, // Неоновый фиолетовый
        hoverLabel: '#1a0033' as Hex, // Темный фон
        hoverAdditions: '#44ff88' as Hex, // Неоновый зеленый
        hoverDeletions: '#ff4466' as Hex, // Неоновый красный
        refColor: '#0088ff' as Hex, // Неоновый синий
        remoteRefColor: '#88ff44' as Hex, // Неоновый лайм для удаленных ссылок
        baseRefColor: '#aa44ff' as Hex, // Неоновый фиолетовый для базовых ссылок
        hoverDefault: '#00ffff' as Hex, // Неоновый циан для наведения
      },
    }
  }

  if (isPastelTheme) {
    // Пастельная тема - мягкие приглушенные цвета
    return {
      badge: {
        background: '#e6d7ff' as Hex, // Пастельный лавандовый
        foreground: '#2d1b69' as Hex, // Темно-фиолетовый
        activityBar: '#b19cd9' as Hex, // Пастельный фиолетовый
        extension: '#c9a9dd' as Hex, // Светло-фиолетовый
        extensionForeground: '#2d1b69' as Hex, // Темный текст
      },
      decoration: {
        modified: '#8fa4d3' as Hex, // Пастельный синий
        deleted: '#e6a3a3' as Hex, // Пастельный красный
        added: '#a3d9a5' as Hex, // Пастельный зеленый
        untracked: '#b5d6a5' as Hex, // Светло-зеленый
        ignored: '#c4c4c4' as Hex, // Пастельный серый
        conflicting: '#f0c987' as Hex, // Пастельный оранжевый
        renamed: '#c9a9dd' as Hex, // Пастельный фиолетовый
        stageModified: '#8fa4d3' as Hex, // Пастельный синий
        stageDeleted: '#e6a3a3' as Hex, // Пастельный красный
      },
      scmGraph: {
        foreground1: '#f0a868' as Hex, // Пастельный оранжевый
        foreground2: '#f0d068' as Hex, // Пастельный желтый
        foreground3: '#68d0a5' as Hex, // Пастельный морской
        foreground4: '#68a0f0' as Hex, // Пастельный синий
        foreground5: '#a068f0' as Hex, // Пастельный фиолетовый
        hoverLabel: '#f5f0ff' as Hex, // Очень светлый фон
        hoverAdditions: '#a3d9a5' as Hex, // Пастельный зеленый
        hoverDeletions: '#e6a3a3' as Hex, // Пастельный красный
        refColor: '#8fa4d3' as Hex, // Пастельный синий
        remoteRefColor: '#b5d6a5' as Hex, // Пастельный зеленый для удаленных ссылок
        baseRefColor: '#c9a9dd' as Hex, // Пастельный фиолетовый для базовых ссылок
        hoverDefault: '#2d1b69' as Hex, // Темно-фиолетовый для наведения
      },
    }
  }

  // Темные темы (storm, moon, dark) - стандартная палитра с улучшениями
  return {
    badge: {
      background: isStormTheme
        ? '#364a82'
        : isMoonTheme
        ? '#2a2e42'
        : ('#364a82' as Hex), // Улучшена контрастность для dark
      foreground: '#ffffff' as Hex, // Белый текст для лучшего контраста
      activityBar: isStormTheme
        ? '#5a7bb8'
        : isMoonTheme
        ? '#4a5570'
        : ('#3d59a1' as Hex),
      extension: isStormTheme
        ? '#89b4fa'
        : isMoonTheme
        ? '#74c7ec'
        : ('#7bb2fa' as Hex),
      extensionForeground: '#0c0f17' as Hex, // Темный текст на светлом фоне
    },
    decoration: {
      modified: isStormTheme
        ? '#89b4fa'
        : isMoonTheme
        ? '#74c7ec'
        : ('#6183bb' as Hex),
      deleted: isStormTheme
        ? '#f38ba8'
        : isMoonTheme
        ? '#eba0ac'
        : ('#914c54' as Hex),
      added: isStormTheme
        ? '#a6e3a1'
        : isMoonTheme
        ? '#94e2d5'
        : ('#449dab' as Hex),
      untracked: isStormTheme
        ? '#a6e3a1'
        : isMoonTheme
        ? '#94e2d5'
        : ('#449dab' as Hex),
      ignored: isStormTheme
        ? '#6c7086'
        : isMoonTheme
        ? '#585b70'
        : ('#515670' as Hex),
      conflicting: isStormTheme
        ? '#fab387'
        : isMoonTheme
        ? '#f9e2af'
        : ('#e0af68cc' as Hex),
      renamed: isStormTheme
        ? '#cba6f7'
        : isMoonTheme
        ? '#b4befe'
        : ('#bb9af7' as Hex),
      stageModified: isStormTheme
        ? '#89b4fa'
        : isMoonTheme
        ? '#74c7ec'
        : ('#6183bb' as Hex),
      stageDeleted: isStormTheme
        ? '#f38ba8'
        : isMoonTheme
        ? '#eba0ac'
        : ('#914c54' as Hex),
    },
    scmGraph: {
      foreground1: isStormTheme
        ? '#fab387'
        : isMoonTheme
        ? '#f9e2af'
        : ('#ff9e64' as Hex),
      foreground2: isStormTheme
        ? '#f9e2af'
        : isMoonTheme
        ? '#f2cdcd'
        : ('#e0af68' as Hex),
      foreground3: isStormTheme
        ? '#94e2d5'
        : isMoonTheme
        ? '#a6e3a1'
        : ('#41a6b5' as Hex),
      foreground4: isStormTheme
        ? '#89b4fa'
        : isMoonTheme
        ? '#74c7ec'
        : ('#7aa2f7' as Hex),
      foreground5: isStormTheme
        ? '#cba6f7'
        : isMoonTheme
        ? '#b4befe'
        : ('#bb9af7' as Hex),
      hoverLabel: isStormTheme
        ? '#313244'
        : isMoonTheme
        ? '#1e1e2e'
        : ('#1b1e2e' as Hex),
      hoverAdditions: isStormTheme
        ? '#a6e3a1'
        : isMoonTheme
        ? '#94e2d5'
        : ('#41a6b5' as Hex),
      hoverDeletions: isStormTheme
        ? '#f38ba8'
        : isMoonTheme
        ? '#eba0ac'
        : ('#f7768e' as Hex),
      refColor: isStormTheme
        ? '#7c7cf0'
        : isMoonTheme
        ? '#6c7086'
        : ('#506FCA' as Hex),
      remoteRefColor: isStormTheme
        ? '#94e2d5'
        : isMoonTheme
        ? '#a6e3a1'
        : ('#41a6b5' as Hex),
      baseRefColor: isStormTheme
        ? '#cba6f7'
        : isMoonTheme
        ? '#b4befe'
        : ('#9d7cd8' as Hex),
      hoverDefault: isStormTheme
        ? '#cdd6f4'
        : isMoonTheme
        ? '#cdd6f4'
        : ('#a9b1d6' as Hex),
    },
  }
}

/**
 * Получает адаптивные цвета бейджа на основе контекста темы
 */
export function getAdaptiveBadgeColors(context?: ThemeContext) {
  if (!context) {
    return {
      background: extendedPalette.badge.background,
      foreground: extendedPalette.badge.extensionForeground,
      activityBar: extendedPalette.badge.activityBar,
      extension: extendedPalette.badge.extension,
      extensionForeground: extendedPalette.badge.extensionForeground,
    }
  }

  const adaptiveColors = getAdaptiveGitColorsForTheme(
    context.variant,
    context.type
  )
  return adaptiveColors.badge
}

/**
 * Получает адаптивные цвета Git-декораций на основе контекста темы
 */
export function getAdaptiveGitDecorationColors(context?: ThemeContext) {
  if (!context) {
    return {
      modified: extendedPalette.git.modified,
      deleted: extendedPalette.git.deleted,
      added: extendedPalette.git.added,
      untracked: extendedPalette.git.untracked,
      ignored: extendedPalette.git.ignored,
      conflicting: extendedPalette.git.conflicting,
      renamed: extendedPalette.git.renamed,
      stageModified: extendedPalette.git.stageModified,
      stageDeleted: extendedPalette.git.stageDeleted,
    }
  }

  const adaptiveColors = getAdaptiveGitColorsForTheme(
    context.variant,
    context.type
  )
  return adaptiveColors.decoration
}

/**
 * Получает адаптивные цвета SCM Graph на основе контекста темы
 */
export function getAdaptiveScmGraphColors(context?: ThemeContext) {
  if (!context) {
    return {
      foreground1: extendedPalette.scmGraph.foreground1,
      foreground2: extendedPalette.scmGraph.foreground2,
      foreground3: extendedPalette.scmGraph.foreground3,
      foreground4: extendedPalette.scmGraph.foreground4,
      foreground5: extendedPalette.scmGraph.foreground5,
      hoverLabel: extendedPalette.scmGraph.hoverLabel,
      hoverAdditions: extendedPalette.scmGraph.hoverAdditions,
      hoverDeletions: extendedPalette.scmGraph.hoverDeletions,
      refColor: extendedPalette.scmGraph.refColor,
      remoteRefColor: extendedPalette.scmGraph.remoteRefColor,
      baseRefColor: extendedPalette.scmGraph.baseRefColor,
      hoverDefault: extendedPalette.scmGraph.hoverDefault,
    }
  }

  const adaptiveColors = getAdaptiveGitColorsForTheme(
    context.variant,
    context.type
  )
  return adaptiveColors.scmGraph
}
