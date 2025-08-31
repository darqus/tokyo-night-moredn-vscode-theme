import { palette, core, extendedPalette } from '../palette'
import { generateTokensForContext } from '../palette/generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'
import {
  getAdaptiveBaseBackground,
  getAdaptiveWidgetBackground,
} from '../utils/adaptive-background'
import { getAdaptiveFocusBorder } from '../utils/adaptive-border'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export const getBaseColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Генерируем токены с учетом варианта темы
  const tokens = generateTokensForContext(context)

  // Определяем, нужно ли использовать неоновый стиль
  const useNeonStyle = context?.type !== 'light' // Неоновый стиль только для темных тем

  // Адаптивные фоны
  const baseBackground = getAdaptiveBaseBackground(context)
  const widgetBackground = getAdaptiveWidgetBackground(context)
  const focusBorder = getAdaptiveFocusBorder(context)

  return {
    // Верхний уровень и основа - используем централизованную палитру
    foreground: extendedPalette.text.muted, // #787c99
    descriptionForeground: extendedPalette.text.description, // #515670
    disabledForeground: extendedPalette.text.disabled, // #545c7e
    focusBorder: focusBorder, // АДАПТИВНАЯ граница фокуса
    errorForeground: extendedPalette.text.error, // #515670
    'widget.border': extendedPalette.border.widget, // #272a31
    'widget.shadow': extendedPalette.special.transparent, // #ffffff00
    'scrollbar.shadow': extendedPalette.scrollbar.shadow, // #00000033

    // Значки, иконки, настройки
    'badge.background': extendedPalette.badge.background, // #7e83b230
    'badge.foreground': extendedPalette.text.badge, // #acb0d0
    'icon.foreground': extendedPalette.text.muted, // #787c99
    'settings.headerForeground':
      context?.type === 'light'
        ? ('#24292f' as Hex)
        : extendedPalette.text.settings,

    // Окно и разделитель
    'window.activeBorder': extendedPalette.border.window, // #0d0f17
    'window.inactiveBorder': extendedPalette.border.window, // #0d0f17
    'sash.hoverBorder': extendedPalette.border.sash, // #29355a

    // Кнопки/значки расширений с неоновыми эффектами
    'extensionButton.prominentBackground': useNeonStyle
      ? tokens.extensionButtonBackground
      : extendedPalette.extension.prominentBackground,
    'extensionButton.prominentHoverBackground': useNeonStyle
      ? tokens.extensionButtonHover
      : extendedPalette.extension.prominentHover,
    'extensionButton.prominentForeground':
      extendedPalette.extension.prominentForeground, // #e5e5e5
    'extensionBadge.remoteBackground': extendedPalette.badge.extension, // #7bb2fa
    'extensionBadge.remoteForeground':
      extendedPalette.badge.extensionForeground, // #0c0f17

    // Ползунок полосы прокрутки - используем централизованную палитру
    'scrollbarSlider.background': extendedPalette.scrollbar.background, // #868bc415
    'scrollbarSlider.hoverBackground': extendedPalette.scrollbar.hover, // #868bc410
    'scrollbarSlider.activeBackground': extendedPalette.scrollbar.active, // #868bc422

    // Текст - используем адаптивные фоны для блоков
    'walkThrough.embeddedEditorBackground': widgetBackground,
    'textLink.foreground': extendedPalette.special.textLink, // #94acdf
    'textLink.activeForeground': extendedPalette.special.textLinkActive, // #7dcfff
    'textPreformat.foreground': extendedPalette.text.preformat, // #d2e1ea
    'textBlockQuote.background': widgetBackground,
    'textCodeBlock.background': widgetBackground,
    'textSeparator.foreground': extendedPalette.special.textSeparator, // #7bb0f9

    // Заголовок окна - адаптивный текст
    'titleBar.activeForeground':
      context?.type === 'light'
        ? ('#57606a' as Hex)
        : extendedPalette.text.muted,
    'titleBar.inactiveForeground':
      context?.type === 'light'
        ? ('#8c959f' as Hex)
        : extendedPalette.text.muted,
    'titleBar.activeBackground': baseBackground,
    'titleBar.inactiveBackground': baseBackground,
    'titleBar.border': extendedPalette.bg.border, // #101014

    // Command Center - адаптивный текст
    'commandCenter.foreground':
      context?.type === 'light'
        ? ('#57606a' as Hex)
        : extendedPalette.command.foreground,
    'commandCenter.activeForeground':
      context?.type === 'light'
        ? ('#24292f' as Hex)
        : extendedPalette.command.activeForeground,
    'commandCenter.inactiveForeground':
      context?.type === 'light'
        ? ('#8c959f' as Hex)
        : extendedPalette.command.inactiveForeground,
    'commandCenter.background': widgetBackground,
    'commandCenter.activeBackground': extendedPalette.command.activeBackground, // #13151d
    'commandCenter.border': extendedPalette.border.widget, // #272a31
    'commandCenter.inactiveBorder': extendedPalette.border.widget, // #272a31

    // Баннер - используем адаптивный фон
    'banner.background': widgetBackground,
    'banner.foreground': extendedPalette.banner.foreground, // #e5e5e5
    'banner.iconForeground': extendedPalette.banner.iconForeground, // #7dcfff

    // Подписи клавиш
    'keybindingLabel.background': extendedPalette.keybinding.background, // #0c0f1799
    'keybindingLabel.foreground': extendedPalette.keybinding.foreground, // #e5e5e5
    'keybindingLabel.border': extendedPalette.border.keybinding, // #272a31
    'keybindingLabel.bottomBorder': extendedPalette.border.keybindingBottom, // #272a31ab
  }
}
