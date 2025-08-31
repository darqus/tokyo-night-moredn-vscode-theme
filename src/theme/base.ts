import { palette, core } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getBaseColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Верхний уровень и основа - соответствует оригинальной Tokyo Night
  foreground: palette.fg.muted, // #787c99 - основной foreground интерфейса (через palette)
  descriptionForeground: '#515670' as Hex, // как в оригинале
  disabledForeground: '#545c7e' as Hex, // как в оригинале
  focusBorder: '#545c7e33' as Hex, // как в оригинале
  errorForeground: '#515670' as Hex, // как в оригинале
  'widget.border': '#272a31' as Hex,
  'widget.shadow': '#ffffff00' as Hex, // как в оригинале (прозрачный)
  'scrollbar.shadow': '#00000033' as Hex, // как в оригинале

  // Значки, иконки, настройки
  'badge.background': '#7e83b230' as Hex, // как в оригинале
  'badge.foreground': '#acb0d0' as Hex, // как в оригинале
  'icon.foreground': palette.fg.muted, // #787c99 - как в оригинале
  'settings.headerForeground': '#6183bb' as Hex, // как в оригинале

  // Окно и разделитель
  'window.activeBorder': '#0d0f17' as Hex, // как в оригинале
  'window.inactiveBorder': '#0d0f17' as Hex, // как в оригинале
  'sash.hoverBorder': '#29355a' as Hex, // как в оригинале

  // Кнопки/значки расширений
  'extensionButton.prominentBackground': '#7dcfff' as Hex,
  'extensionButton.prominentHoverBackground': '#222c444d' as Hex,
  'extensionButton.prominentForeground': '#e5e5e5' as Hex,
  'extensionBadge.remoteBackground': '#7bb2fa' as Hex,
  'extensionBadge.remoteForeground': '#0c0f17' as Hex,

  // Ползунок полосы прокрутки - точная копия оригинальной Tokyo Night
  'scrollbarSlider.background': '#868bc415' as Hex, // точно как в оригинале
  'scrollbarSlider.hoverBackground': '#868bc410' as Hex, // точно как в оригинале
  'scrollbarSlider.activeBackground': '#868bc422' as Hex, // точно как в оригинале

  // Текст
  'walkThrough.embeddedEditorBackground': '#0c0f17' as Hex,
  'textLink.foreground': '#94acdf' as Hex,
  'textLink.activeForeground': '#7dcfff' as Hex,
  'textPreformat.foreground': '#d2e1ea' as Hex,
  'textBlockQuote.background': '#0c0f17' as Hex,
  'textCodeBlock.background': '#0c0f17' as Hex,
  'textSeparator.foreground': '#7bb0f9' as Hex,

  // Заголовок окна - точная копия оригинальной Tokyo Night
  'titleBar.activeForeground': '#787c99' as Hex, // точно как в оригинале
  'titleBar.inactiveForeground': '#787c99' as Hex, // точно как в оригинале
  'titleBar.activeBackground': '#16161e' as Hex, // точно как в оригинале
  'titleBar.inactiveBackground': '#16161e' as Hex, // точно как в оригинале
  'titleBar.border': '#101014' as Hex, // точно как в оригинале

  // Command Center
  'commandCenter.foreground': '#bababc' as Hex,
  'commandCenter.activeForeground': '#e5e5e5' as Hex,
  'commandCenter.inactiveForeground': '#a4a5a7' as Hex,
  'commandCenter.background': '#0c0f17' as Hex,
  'commandCenter.activeBackground': '#13151d' as Hex,
  'commandCenter.border': '#272a31' as Hex,
  'commandCenter.inactiveBorder': '#272a31' as Hex,

  // Баннер
  'banner.background': '#0c0f17' as Hex,
  'banner.foreground': '#e5e5e5' as Hex,
  'banner.iconForeground': '#7dcfff' as Hex,

  // Подписи клавиш
  'keybindingLabel.background': '#0c0f1799' as Hex,
  'keybindingLabel.foreground': '#e5e5e5' as Hex,
  'keybindingLabel.border': '#272a31' as Hex,
  'keybindingLabel.bottomBorder': '#272a31ab' as Hex,
})
