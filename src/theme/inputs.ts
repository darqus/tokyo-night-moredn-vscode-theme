import { basePalette } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getInputColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Поля ввода - соответствует оригинальной Tokyo Night
  'input.background': basePalette.inputBg, // #14141b как в оригинале
  'input.foreground': basePalette.inputFg, // #a9b1d6 как в оригинале
  'input.border': '#272a31' as Hex,
  'input.placeholderForeground': '#999a9d' as Hex,
  'inputOption.activeForeground': '#e5e5e5' as Hex,
  'inputOption.activeBackground': '#7aa2f733' as Hex,
  'inputOption.activeBorder': '#272a31' as Hex,
  'inputOption.hoverBackground': '#13151d' as Hex,
  'inputValidation.infoForeground': '#e5e5e5' as Hex,
  'inputValidation.infoBackground': '#7aa2f721' as Hex,
  'inputValidation.infoBorder': '#7dcfff' as Hex,
  'inputValidation.warningForeground': '#e5e5e5' as Hex,
  'inputValidation.warningBackground': '#e0af6821' as Hex,
  'inputValidation.warningBorder': '#e0af68' as Hex,
  'inputValidation.errorForeground': '#e5e5e5' as Hex,
  'inputValidation.errorBackground': '#e4687621' as Hex,
  'inputValidation.errorBorder': '#e46876' as Hex,

  // Выпадающие списки
  'dropdown.foreground': '#bababc' as Hex,
  'dropdown.background': '#0c0f17' as Hex,
  'dropdown.listBackground': '#0c0f17' as Hex,
  'dropdown.border': '#272a31' as Hex,

  // Переключатели (checkbox / radio)
  'checkbox.background': '#0c0f17' as Hex,
  'checkbox.foreground': '#e5e5e5' as Hex,
  'checkbox.border': '#272a31' as Hex,
  'checkbox.selectBackground': '#7aa2f733' as Hex,
  'checkbox.selectBorder': '#272a31' as Hex,
  'radio.activeForeground': '#e5e5e5' as Hex,
  'radio.activeBackground': '#0c0f17' as Hex,
  'radio.activeBorder': '#272a31' as Hex,
  'radio.inactiveForeground': '#e5e5e5' as Hex,
  'radio.inactiveBackground': '#0c0f17' as Hex,
  'radio.inactiveBorder': '#272a31' as Hex,
  'radio.inactiveHoverBackground': '#13151d' as Hex,
})
