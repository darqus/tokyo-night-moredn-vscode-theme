import { palette, basePalette } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getActivityBarColors = (): Partial<
  Record<VSCodeColorKey, Hex>
> => ({
  // Панель действий (Activity Bar) - точная копия оригинальной Tokyo Night
  'activityBar.background': '#16161e' as Hex, // точно как в оригинале
  'activityBar.foreground': '#787c99' as Hex, // точно как в оригинале
  // activeBorder и activeBackground закомментированы в оригинале
  'activityBar.inactiveForeground': '#3b3e52' as Hex, // точно как в оригинале
  'activityBar.border': '#16161e' as Hex, // точно как в оригинале

  // Значки уведомлений на иконках - точно как в оригинале
  'activityBarBadge.background': '#3d59a1' as Hex, // точно как в оригинале
  'activityBarBadge.foreground': '#fff' as Hex, // точно как в оригинале

  // Панель действий в верхней позиции (Activity Bar: Top) - точно как в оригинале
  'activityBarTop.background': '#16161e' as Hex, // точно как в оригинале
  'activityBarTop.foreground': '#787c99' as Hex, // точно как в оригинале
  'activityBarTop.inactiveForeground': '#3b3e52' as Hex, // точно как в оригинале
})
