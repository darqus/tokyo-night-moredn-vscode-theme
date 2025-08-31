import { palette, core } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getMenuColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Панель меню (menubar) - точная копия оригинальной Tokyo Night
  'menubar.selectionForeground': '#a9b1d6' as Hex, // точно как в оригинале
  'menubar.selectionBackground': '#1e202e' as Hex, // точно как в оригинале
  'menubar.selectionBorder': '#1b1e2e' as Hex, // точно как в оригинале

  // Выпадающие меню - точная копия оригинальной Tokyo Night
  'menu.foreground': '#787c99' as Hex, // точно как в оригинале
  'menu.background': '#16161e' as Hex, // точно как в оригинале
  'menu.selectionForeground': '#a9b1d6' as Hex, // точно как в оригинале
  'menu.selectionBackground': '#1e202e' as Hex, // точно как в оригинале
  'menu.separatorBackground': '#101014' as Hex, // точно как в оригинале
  'menu.border': '#101014' as Hex, // точно как в оригинале
})
