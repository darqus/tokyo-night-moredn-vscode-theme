import { palette, basePalette } from '../palette'

import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getSideBarColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Боковая панель - точная копия оригинальной Tokyo Night
  'tree.indentGuidesStroke': '#2b2b3b' as Hex, // точно как в оригинале
  'sideBar.foreground': '#787c99' as Hex, // точно как в оригинале
  'sideBar.background': '#16161e' as Hex, // точно как в оригинале
  'sideBar.border': '#101014' as Hex, // точно как в оригинале
  'sideBarTitle.foreground': '#787c99' as Hex, // точно как в оригинале
  'sideBarSectionHeader.background': '#16161e' as Hex, // точно как в оригинале
  'sideBarSectionHeader.foreground': '#a9b1d6' as Hex, // точно как в оригинале
  'sideBarSectionHeader.border': '#101014' as Hex, // точно как в оригинале
  'sideBar.dropBackground': '#1e202e' as Hex, // точно как в оригинале
})
