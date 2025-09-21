/**
 * Минимальные расчёты контраста (WCAG) в sRGB.
 * Используется для простых предупреждающих тестов по ключевым парам.
 */
import type { Hex } from '../types/theme'

const parseHex = (hex: string) => {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(hex)
  if (!m) throw new Error(`Invalid hex: ${hex}`)
  const r = parseInt(m[1], 16) / 255
  const g = parseInt(m[2], 16) / 255
  const b = parseInt(m[3], 16) / 255
  return { r, g, b }
}

const srgbToLinear = (c: number) =>
  c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

const relLuminance = (hex: Hex): number => {
  const { r, g, b } = parseHex(hex)
  const R = srgbToLinear(r)
  const G = srgbToLinear(g)
  const B = srgbToLinear(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export const getContrastRatio = (fg: Hex, bg: Hex): number => {
  const L1 = relLuminance(fg)
  const L2 = relLuminance(bg)
  const brighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (brighter + 0.05) / (darker + 0.05)
}
