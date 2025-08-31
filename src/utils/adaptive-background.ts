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
  return getAdaptiveBackground('button', context)
}
