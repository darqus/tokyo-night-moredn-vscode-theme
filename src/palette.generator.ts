import type { Hex } from './types/palette'
import { basePalette } from './palette.base'
import { withAlpha, mix, lightenToward, darkenToward } from './utils/color'
import { intensity } from './palette.config'

// Base roles
export const coreBlack = mix(basePalette.black, basePalette.blue, 0.095) as Hex
export const coreWhite = mix(
  basePalette.white,
  mix(basePalette.white, basePalette.black, 0.47),
  0.22
) as Hex

const uiBase = {
  editorBg: coreBlack,
  editorFg: coreWhite,
  borderBase: coreBlack,
  accent: basePalette.blue,
  error: basePalette.red,
  warning: basePalette.yellow,
  success: basePalette.green,
  info: basePalette.cyan,
} as const

// Helpers
const alpha = withAlpha
const blend = mix
const toward = (a: Hex, b: Hex, k: number) => lightenToward(a, b, k)
const darkenBg = (k: number) => darkenToward(uiBase.editorBg, coreBlack, k)
const generatedGray = blend(coreWhite, coreBlack, intensity.mix.gray)
const aquaLight = toward(basePalette.cyan, basePalette.blue, 0.15)

// Declarative formulas map
const formulas = {
  // Backgrounds
  bgElevated: () => darkenBg(intensity.bg.elevated),
  bgOverlay: () => darkenBg(intensity.bg.overlay),
  bgInput: () => darkenBg(intensity.bg.overlay),
  bgHover: () => toward(uiBase.editorBg, coreWhite, intensity.bg.dark),
  bgActive: () => blend(uiBase.editorBg, coreBlack, intensity.bg.active),
  bgDrop: () => alpha(basePalette.blue, intensity.alpha.drop),
  bgLineHighlight: () => alpha(basePalette.blue, intensity.alpha.lineHighlight),
  bgBracketMatch: () => alpha(basePalette.blue, intensity.alpha.bracketMatch),
  bgStateLabel: () =>
    blend(uiBase.editorBg, generatedGray, intensity.mix.bgStateLabel),

  // Border
  border: () => blend(coreBlack, generatedGray, intensity.mix.border),

  // Text
  textPrimary: () => coreWhite,
  textMuted: () => blend(coreWhite, generatedGray, intensity.mix.text.muted),
  textInactive: () =>
    blend(coreWhite, generatedGray, intensity.mix.text.inactive),
  textSoft: () =>
    blend(coreWhite, basePalette.cyan, intensity.mix.textSoftCyan),
  textSubtle2: () =>
    blend(coreWhite, generatedGray, intensity.mix.text.subtle2),
  textGray600: () =>
    blend(generatedGray, coreBlack, intensity.mix.text.gray600),
  textComment: () =>
    blend(generatedGray, coreBlack, intensity.mix.text.gray600),
  textCommentDoc: () =>
    blend(generatedGray, coreBlack, intensity.mix.text.commentDoc),
  textCommentDocEmphasized: () =>
    blend(generatedGray, coreBlack, intensity.mix.text.commentDocEmphasized),
  textPreformat: () =>
    blend(coreWhite, basePalette.cyan, intensity.mix.textPreformatCyan),
  textPlaceholder: () =>
    blend(coreWhite, generatedGray, intensity.mix.textPlaceholderGray),
  textEditorLinkActive: () =>
    blend(coreWhite, basePalette.blue, intensity.mix.editorLinkActiveBlue),

  // Brand buttons
  brandButtonPrimary: () =>
    blend(coreBlack, basePalette.blue, intensity.mix.brandButton.primary),
  brandButtonHover: () =>
    blend(coreBlack, basePalette.blue, intensity.mix.brandButton.hover),

  // UI elements
  uiShadow: () => alpha(basePalette.blue, intensity.alpha.drop),
  uiSelectionWash: () => alpha(basePalette.blue, intensity.selection.editor),
  uiScrollbarBase: () =>
    blend(
      basePalette.blue,
      generatedGray,
      intensity.mix.uiScrollbarBaseBlueGray
    ),
  uiTabUnfocusedActive: () =>
    blend(
      basePalette.blue,
      coreBlack,
      intensity.mix.uiTabUnfocusedActiveBlueBlack
    ),

  uiGitIgnored: () => blend(coreWhite, generatedGray, 0.95),
  uiGitDeleted: () =>
    blend(
      basePalette.red,
      basePalette.magenta,
      intensity.mix.uiGitDeletedRedMagenta
    ),
  uiGitConflicting: () =>
    blend(aquaLight, basePalette.blue, intensity.mix.uiGitConflictingAquaBlue),
  uiGitStageDeleted: () =>
    blend(
      basePalette.red,
      basePalette.magenta,
      intensity.mix.uiGitStageDeletedRedMagenta
    ),
  uiGitStageModified: () => basePalette.blue,

  // Terminal
  terminalSelectionBackground: () => alpha(formulas.textSubtle2(), 0.19),
  terminalFindMatchBackground: () => alpha(basePalette.blue, 0.4),
  terminalFindMatchHighlightBackground: () => alpha(basePalette.blue, 0.4),
  terminalFindMatchHighlightBorder: () => alpha(basePalette.blue, 0.6),
  terminalHoverHighlightBackground: () =>
    alpha(formulas.brandButtonPrimary(), 0.2),
  terminalDropBackground: () => alpha(formulas.bgDrop(), 0.5),
  terminalOverviewRulerFindMatchForeground: () =>
    alpha(formulas.textPrimary(), 0.27),

  // Base theme
  focusBorder: () => alpha(basePalette.blue, intensity.alpha.focusBorder),
  extensionButtonProminentHoverBackground: () =>
    alpha(formulas.brandButtonPrimary(), 0.3),
  scrollbarSliderBackground: () =>
    alpha(formulas.uiScrollbarBase(), intensity.alpha.scrollbar.base),
  scrollbarSliderHoverBackground: () =>
    alpha(formulas.uiScrollbarBase(), intensity.alpha.scrollbar.hover),
  scrollbarSliderActiveBackground: () =>
    alpha(formulas.uiScrollbarBase(), intensity.alpha.scrollbar.active),
  keybindingLabelBackground: () =>
    alpha(formulas.bgElevated(), intensity.alpha.keybindingBg),
  keybindingLabelBottomBorder: () =>
    alpha(formulas.border(), intensity.alpha.keybindingBottomBorder),

  // Misc
  toolbarHoverBackground: () =>
    alpha(uiBase.editorBg, intensity.alpha.toolbarBg),
  toolbarActiveBackground: () =>
    alpha(uiBase.editorBg, intensity.alpha.toolbarBg),

  // Peek view
  peekViewEditorMatchHighlightBackground: () =>
    alpha(formulas.brandButtonPrimary(), intensity.alpha.peek.match),
  peekViewResultSelectionBackground: () =>
    alpha(formulas.brandButtonPrimary(), intensity.alpha.peek.selection),
  peekViewResultMatchHighlightBackground: () =>
    alpha(formulas.brandButtonPrimary(), intensity.alpha.peek.match),

  // Tabs
  tabLastPinnedBorder: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.tab.lastPinnedBorder),
  tabSelectedForeground: () =>
    alpha(formulas.textPrimary(), intensity.alpha.tab.selectedFg),

  // Menus
  menuBorder: () => alpha(formulas.border(), 0),

  // Git
  gitBlameEditorDecorationForeground: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.gitBlame),

  // Diff editor
  diffEditorInsertedTextBackground: () =>
    alpha(basePalette.blue, intensity.alpha.diff.text),
  diffEditorRemovedTextBackground: () =>
    alpha(basePalette.red, intensity.alpha.diff.text),
  diffEditorInsertedTextBorder: () => alpha(basePalette.blue, 0),
  diffEditorRemovedTextBorder: () => alpha(basePalette.red, 0),
  diffEditorInsertedLineBackground: () =>
    alpha(basePalette.blue, intensity.alpha.diff.line),
  diffEditorRemovedLineBackground: () =>
    alpha(basePalette.red, intensity.alpha.diff.line),
  diffEditorDiagonalFill: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.diff.diagonal),

  // Merge
  mergeCurrentHeaderBackground: () => alpha(basePalette.teal, 0.67),
  mergeCurrentContentBackground: () => alpha(basePalette.teal, 0.27),
  mergeIncomingHeaderBackground: () =>
    alpha(formulas.brandButtonPrimary(), 0.67),
  mergeIncomingContentBackground: () =>
    alpha(formulas.brandButtonPrimary(), 0.27),

  // Debug
  editorStackFrameHighlightBackground: () =>
    alpha(basePalette.yellow, intensity.alpha.debug.stack),
  editorFocusedStackFrameHighlightBackground: () =>
    alpha(basePalette.teal, intensity.alpha.debug.focusedStack),
  debugViewValueChangedHighlight: () =>
    alpha(formulas.brandButtonPrimary(), intensity.alpha.debug.valueChanged),

  // Input validation
  inputValidationInfoBackground: () =>
    alpha(basePalette.blue, intensity.alpha.inputValidation),
  inputValidationWarningBackground: () =>
    alpha(basePalette.yellow, intensity.alpha.inputValidation),
  inputValidationErrorBackground: () =>
    alpha(basePalette.red, intensity.alpha.inputValidation),

  // Status bar
  statusBarItemHoverBackground: () =>
    alpha(formulas.bgHover(), intensity.alpha.statusBar.hover),
  statusBarItemProminentHoverBackground: () =>
    alpha(formulas.bgHover(), intensity.alpha.statusBar.prominentHover),
  statusBarItemErrorHoverBackground: () =>
    alpha(basePalette.red, intensity.alpha.statusBar.errorHover),
  statusBarItemWarningHoverBackground: () =>
    alpha(basePalette.yellow, intensity.alpha.statusBar.warningHover),
  statusBarItemCompactHoverBackground: () =>
    alpha(formulas.bgHover(), intensity.alpha.statusBar.compactHover),
  statusBarItemOfflineHoverBackground: () =>
    alpha(basePalette.red, intensity.alpha.statusBar.offlineHover),

  // Buttons
  buttonBorder: () => alpha(basePalette.blue, intensity.alpha.button.border),
  buttonSeparator: () =>
    alpha(basePalette.blue, intensity.alpha.button.separator),

  // Editor bracket pair guides
  editorBracketPairGuideActiveBackground1: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBg),
  editorBracketPairGuideActiveBackground2: () =>
    alpha(basePalette.orange, intensity.selection.editorHighlightBg),
  editorBracketPairGuideActiveBackground3: () =>
    alpha(basePalette.green, intensity.selection.editorHighlightBg),
  editorBracketPairGuideActiveBackground4: () =>
    alpha(basePalette.yellow, intensity.selection.editorHighlightBg),
  editorBracketPairGuideActiveBackground5: () =>
    alpha(basePalette.red, intensity.selection.editorHighlightBg),
  editorBracketPairGuideActiveBackground6: () =>
    alpha(basePalette.magenta, intensity.selection.editorHighlightBg),

  // Editor
  editorFoldBackground: () =>
    alpha(formulas.bgElevated(), intensity.selection.editorHighlightBg),
  editorSelectionBackground: () =>
    alpha(basePalette.blue, intensity.selection.editor),
  editorInactiveSelectionBackground: () =>
    alpha(basePalette.blue, intensity.selection.editorInactive),
  editorFindMatchBackground: () =>
    alpha(basePalette.yellow, intensity.selection.editorHighlightBg),
  editorFindMatchHighlightBackground: () =>
    alpha(basePalette.purple, intensity.selection.editorHighlightBg),
  editorFindMatchHighlightBorder: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBg),
  editorFindRangeHighlightBackground: () => alpha(formulas.textSoft(), 0.25),
  editorFindRangeHighlightBorder: () => alpha(formulas.textMuted(), 0.45),
  editorRangeHighlightBackground: () =>
    alpha(formulas.textSubtle2(), intensity.selection.editorHighlightBg),
  editorWordHighlightBackground: () => alpha(basePalette.blue, 0.05),
  editorWordHighlightBorder: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBorder),
  editorWordHighlightStrongBackground: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBg),
  editorWordHighlightStrongBorder: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBorder),
  editorSelectionHighlightBackground: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBg),
  editorSelectionHighlightBorder: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBorder),
  editorHoverHighlightBackground: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBg),
  editorIndentGuideBackground1: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.indentGuide),
  editorIndentGuideActiveBackground1: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.indentGuide),
  editorWhitespaceForeground: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.whitespace),
  editorBracketMatchBorder: () =>
    alpha(basePalette.blue, intensity.selection.editorHighlightBg),
  editorInlayHintBackground: () =>
    alpha(formulas.bgElevated(), intensity.alpha.inlayHintBg),
  editorInlayHintTypeBackground: () =>
    alpha(formulas.bgElevated(), intensity.alpha.inlayHintBg),
  editorInlayHintParameterBackground: () =>
    alpha(formulas.bgElevated(), intensity.alpha.inlayHintBg),
  editorOverviewRulerFindMatchForeground: () =>
    alpha(formulas.textPrimary(), intensity.alpha.editorOverviewRuler),
  editorOverviewRulerRangeHighlightForeground: () =>
    alpha(formulas.textPrimary(), intensity.alpha.editorOverviewRuler),
  editorOverviewRulerSelectionHighlightForeground: () =>
    alpha(formulas.textPrimary(), intensity.alpha.editorOverviewRuler),
  editorOverviewRulerWordHighlightForeground: () =>
    alpha(basePalette.blue, intensity.alpha.editorOverviewRuler),
  editorOverviewRulerWordHighlightStrongForeground: () =>
    alpha(basePalette.blue, intensity.alpha.editorOverviewRuler),
  editorWidgetResizeBorder: () =>
    alpha(formulas.textSubtle2(), intensity.alpha.editorOverviewRuler),
  editorSuggestWidgetBorder: () =>
    alpha(coreBlack, intensity.alpha.suggestWidgetBorder),
  searchEditorFindMatchBackground: () =>
    alpha(basePalette.blue, intensity.alpha.searchEditorFindMatch),
} as const

export type TokenKey = keyof typeof formulas

export function generatePalette(): Record<TokenKey, Hex> {
  const cache = new Map<TokenKey, Hex>()
  const resolve = (key: TokenKey): Hex => {
    if (cache.has(key)) return cache.get(key)!
    const value = formulas[key]()
    cache.set(key, value)
    return value
  }
  const result = {} as Record<TokenKey, Hex>
  ;(Object.keys(formulas) as TokenKey[]).forEach((k) => {
    result[k] = resolve(k)
  })
  return Object.freeze(result)
}
