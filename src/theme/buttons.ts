import { basePalette } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getButtonColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Кнопки / индикатор выполнения - соответствует оригинальной Tokyo Night
  'button.background': basePalette.buttonBg, // #3d59a1dd как в оригинале
  'button.hoverBackground': '#2d3b5a' as Hex,
  'button.foreground': basePalette.buttonFg, // #ffffff как в оригинале
  'button.border': '#7aa2f780' as Hex,
  'button.separator': '#7aa2f766' as Hex,
  'button.secondaryBackground': '#222c44' as Hex,
  'button.secondaryHoverBackground': '#2d3b5a' as Hex,
  'button.secondaryForeground': basePalette.buttonFg, // #ffffff как в оригинале
  'progressBar.background': '#7dcfff' as Hex,
})
