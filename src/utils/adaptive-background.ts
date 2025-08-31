import { Hex } from '../types'
import { extendedPalette } from '../palette/extended'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export type UIComponent =
  | 'editor'
  | 'terminal'
  | 'sideBar'
  | 'activityBar'
  | 'statusBar'
  | 'tabBar'
  | 'menu'
  | 'notification'
  | 'base'
  | 'widget'
  | 'list'
  | 'button'

export function getAdaptiveBackground(
  component: UIComponent,
  context?: ThemeContext
): Hex {
  if (!context) {
    return extendedPalette.bg.adaptive[component].dark
  }
  return extendedPalette.bg.adaptive[component][context.type]
}

export function getAdaptiveEditorBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('editor', context)
}

export function getAdaptiveTerminalBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('terminal', context)
}

export function getAdaptiveSideBarBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('sideBar', context)
}

export function getAdaptiveActivityBarBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('activityBar', context)
}

export function getAdaptiveStatusBarBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('statusBar', context)
}

export function getAdaptiveTabBarBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('tabBar', context)
}

export function getAdaptiveMenuBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('menu', context)
}

export function getAdaptiveNotificationBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('notification', context)
}

export function getAdaptiveBaseBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('base', context)
}

export function getAdaptiveWidgetBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('widget', context)
}

export function getAdaptiveListBackground(context?: ThemeContext): Hex {
  return getAdaptiveBackground('list', context)
}

export function getAdaptiveButtonBackground(context?: ThemeContext): Hex {
  // Для светлых тем используем стандартный светлый фон
  if (context?.type === 'light') {
    return '#f6f8fa' as Hex // Светлый фон для светлых тем
  }

  // Для темных тем используем неоновый стиль
  return getAdaptiveBackground('button', context)
}

// === АДАПТИВНЫЕ ЦВЕТА ВЫДЕЛЕНИЙ ===

export function getAdaptiveSelectionBackground(
  type: 'listActive' | 'listInactive' | 'listHover' | 'activityBarActive',
  context?: ThemeContext
): Hex {
  if (!context) {
    return extendedPalette.bg.adaptive.selection[type].dark
  }

  // Для светлых тем всегда используем статическую адаптивную палитру
  if (context.type === 'light') {
    return extendedPalette.bg.adaptive.selection[type].light
  }

  // Используем модифицированную палитру из контекста, если доступна
  if (context.adaptedPalette?.selection) {
    switch (type) {
      case 'listActive':
        return (
          context.adaptedPalette.selection.listActive ||
          extendedPalette.bg.adaptive.selection[type][context.type]
        )
      case 'listInactive':
        return (
          context.adaptedPalette.selection.listInactive ||
          extendedPalette.bg.adaptive.selection[type][context.type]
        )
      case 'listHover':
        return (
          context.adaptedPalette.selection.listHover ||
          extendedPalette.bg.adaptive.selection[type][context.type]
        )
      case 'activityBarActive':
        // Для activityBarActive используем немного светлее фон панели активности
        return (
          context.adaptedPalette.bg?.secondary ||
          extendedPalette.bg.adaptive.selection[type][context.type]
        )
    }
  }

  return extendedPalette.bg.adaptive.selection[type][context.type]
}

export function getAdaptiveListActiveBackground(context?: ThemeContext): Hex {
  return getAdaptiveSelectionBackground('listActive', context)
}

export function getAdaptiveListInactiveBackground(context?: ThemeContext): Hex {
  return getAdaptiveSelectionBackground('listInactive', context)
}

export function getAdaptiveListHoverBackground(context?: ThemeContext): Hex {
  return getAdaptiveSelectionBackground('listHover', context)
}

export function getAdaptiveActivityBarActiveBackground(
  context?: ThemeContext
): Hex {
  return getAdaptiveSelectionBackground('activityBarActive', context)
}

// === АДАПТИВНЫЕ ЦВЕТА ТЕКСТА ВКЛАДОК ===

export function getAdaptiveTabText(
  type: 'active' | 'inactive' | 'hover',
  context?: ThemeContext
): Hex {
  if (!context) {
    return extendedPalette.bg.adaptive.tabText[type].dark
  }

  // Для светлых тем всегда используем статическую адаптивную палитру
  if (context.type === 'light') {
    return extendedPalette.bg.adaptive.tabText[type].light
  }

  return extendedPalette.bg.adaptive.tabText[type][context.type]
}

export function getAdaptiveTabActiveText(context?: ThemeContext): Hex {
  return getAdaptiveTabText('active', context)
}

export function getAdaptiveTabInactiveText(context?: ThemeContext): Hex {
  return getAdaptiveTabText('inactive', context)
}

export function getAdaptiveTabHoverText(context?: ThemeContext): Hex {
  return getAdaptiveTabText('hover', context)
}
