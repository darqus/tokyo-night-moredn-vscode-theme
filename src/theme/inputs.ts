import {
  palette,
  inputValidationInfoBackground,
  inputValidationWarningBackground,
  inputValidationErrorBackground,
} from '../palette'

export const getInputColors = () => ({
  // Поля ввода - улучшенная доступность
  'input.background': palette.bg.input,
  'input.foreground': palette.fg.primary,
  'input.border': palette.line.border,
  'input.placeholderForeground': palette.ui.input.placeholder,
  'inputOption.activeForeground': palette.fg.onSelection,
  'inputOption.activeBackground': palette.bg.selection.active,
  'inputOption.activeBorder': palette.line.border,
  'inputOption.hoverBackground': palette.bg.hover,
  'inputValidation.infoForeground': palette.fg.primary,
  'inputValidation.infoBackground': inputValidationInfoBackground,
  'inputValidation.infoBorder': palette.accent.cyan,
  'inputValidation.warningForeground': palette.fg.primary,
  'inputValidation.warningBackground': inputValidationWarningBackground,
  'inputValidation.warningBorder': palette.accent.yellow,
  'inputValidation.errorForeground': palette.fg.primary,
  'inputValidation.errorBackground': inputValidationErrorBackground,
  'inputValidation.errorBorder': palette.accent.red,

  // Выпадающие списки
  'dropdown.foreground': palette.fg.muted,
  'dropdown.background': palette.bg.input,
  'dropdown.listBackground': palette.bg.input,
  'dropdown.border': palette.line.border,

  // Переключатели (checkbox / radio)
  'checkbox.background': palette.bg.input,
  'checkbox.foreground': palette.fg.primary,
  'checkbox.border': palette.line.border,
  'checkbox.selectBackground': palette.bg.selection.active,
  'checkbox.selectBorder': palette.line.border,
  'radio.activeForeground': palette.fg.primary,
  'radio.activeBackground': palette.bg.input,
  'radio.activeBorder': palette.line.border,
  'radio.inactiveForeground': palette.fg.panelText,
  'radio.inactiveBackground': palette.bg.input,
  'radio.inactiveBorder': palette.line.border,
  'radio.inactiveHoverBackground': palette.brand.primary, // Активный hover для radio
})
