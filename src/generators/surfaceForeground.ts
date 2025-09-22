import type { InterfacePalette } from '../types/theme'
import { getContrastRatioAware } from '../core/contrast'
import { pickReadable } from './pickReadable'

// Опциональная настройка интенсивности CodeLens через env
// THEME_CODELENS_INTENSITY: 'auto' | 'primary' | 'muted' | 'subtle'
const CODELENS_INTENSITY = (process.env.THEME_CODELENS_INTENSITY || 'auto')
  .toString()
  .toLowerCase() as 'auto' | 'primary' | 'muted' | 'subtle'

// Автоподбор читаемости для CodeLens: пробуем muted над editor.bg (base),
// если контраст < 4.0 — используем primary
function resolveCodeLens(ip: InterfacePalette): string {
  const bg = ip.bg.base
  if (CODELENS_INTENSITY === 'primary') return ip.textOn.base.primary
  if (CODELENS_INTENSITY === 'muted') {
    // При прямом выборе muted не ломаем намерение, но если совсем плохо,
    // делаем страховку на 3.0 (минимальный порог для muted)
    const r = getContrastRatioAware(ip.textOn.base.muted, bg as any)
    return r >= 3.0 ? ip.textOn.base.muted : ip.textOn.base.primary
  }
  if (CODELENS_INTENSITY === 'subtle') {
    // subtle редко достигает норм, поэтому также страхуемся
    const r = getContrastRatioAware(ip.textOn.base.subtle, bg as any)
    return r >= 3.0 ? ip.textOn.base.subtle : ip.textOn.base.primary
  }
  // auto: предпочитаем muted, если достигает 4.0; иначе primary
  const ratioMuted = getContrastRatioAware(ip.textOn.base.muted, bg as any)
  return ratioMuted >= 4.0 ? ip.textOn.base.muted : ip.textOn.base.primary
}

// Единый список surface-aware foreground токенов → роль текста
// Генератор использует его для присвоения значений, тест — для валидации.
export const SURFACE_FOREGROUND_MAP: Record<
  string,
  (ip: InterfacePalette) => string
> = {
  // Base
  'titleBar.activeForeground': (ip) => ip.textOn.base.primary,
  'titleBar.inactiveForeground': (ip) => ip.textOn.base.muted,
  'commandCenter.foreground': (ip) => ip.textOn.base.muted,
  'commandCenter.activeForeground': (ip) => ip.textOn.base.primary,
  'menubar.selectionForeground': (ip) => ip.textOn.base.primary,
  'editor.foreground': (ip) => ip.textOn.base.primary,
  'editor.findMatchForeground': (ip) => ip.textOn.base.primary,
  'editorWhitespace.foreground': (ip) => ip.textOn.base.subtle,
  'editorCodeLens.foreground': (ip) => resolveCodeLens(ip),
  'activityBar.foreground': (ip) => ip.textOn.base.muted,
  'activityBar.inactiveForeground': (ip) => ip.textOn.base.inactive,
  'sideBar.foreground': (ip) => ip.textOn.base.primary,
  'sideBarTitle.foreground': (ip) => ip.textOn.base.primary,
  'panelTitle.activeForeground': (ip) => ip.textOn.base.primary,
  'panelTitle.inactiveForeground': (ip) => ip.textOn.base.muted,
  'breadcrumb.foreground': (ip) => ip.textOn.base.muted,
  'breadcrumb.focusForeground': (ip) =>
    pickReadable(ip, 'base', 'muted', { mutedMin: 3.0 }),
  'breadcrumb.activeSelectionForeground': (ip) => ip.textOn.base.primary,
  'breadcrumb.hoverForeground': (ip) =>
    pickReadable(ip, 'base', 'muted', { mutedMin: 3.0 }),
  'peekViewResult.fileForeground': (ip) => ip.textOn.base.primary,
  'peekViewResult.lineForeground': (ip) => ip.textOn.base.muted,
  'peekViewResult.selectionForeground': (ip) => ip.textOn.base.primary,
  'terminal.foreground': (ip) => ip.textOn.base.primary,
  'terminal.initialHintForeground': (ip) => ip.textOn.base.muted,
  'settings.headerForeground': (ip) => ip.textOn.base.primary,

  // Elevated
  'menu.foreground': (ip) => ip.textOn.elevated.primary,
  'menu.selectionForeground': (ip) => ip.textOn.elevated.primary,
  'quickInput.foreground': (ip) => ip.textOn.elevated.primary,
  'quickInputList.focusForeground': (ip) => ip.textOn.elevated.primary,
  'sideBarSectionHeader.foreground': (ip) => ip.textOn.elevated.primary,
  'statusBar.foreground': (ip) => ip.textOn.elevated.muted,
  'notifications.foreground': (ip) => ip.textOn.elevated.primary,
  'notificationCenterHeader.foreground': (ip) => ip.textOn.elevated.primary,
  'editorWidget.foreground': (ip) => ip.textOn.elevated.primary,
  'panelSectionHeader.foreground': (ip) => ip.textOn.elevated.primary,
  'keybindingLabel.foreground': (ip) => ip.textOn.elevated.primary,
  'checkbox.foreground': (ip) => ip.textOn.elevated.primary,
  'settings.checkboxForeground': (ip) => ip.textOn.elevated.primary,
  'settings.textInputForeground': (ip) => ip.textOn.elevated.primary,
  'settings.numberInputForeground': (ip) => ip.textOn.elevated.primary,

  // Overlay
  'editorSuggestWidget.foreground': (ip) => ip.textOn.overlay.primary,
  'editorSuggestWidgetStatus.foreground': (ip) => ip.textOn.overlay.muted,
  'peekViewTitleDescription.foreground': (ip) => ip.textOn.overlay.muted,
  'peekViewTitleLabel.foreground': (ip) => ip.textOn.overlay.primary,
}
