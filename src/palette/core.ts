import type { Hex } from '../types/palette'
import { basePalette } from './base'
import { mix } from '../utils/color'
import { intensity } from './config'
import {
  generatePalette,
  coreBlack as genCoreBlack,
  coreWhite as genCoreWhite,
} from './generator'

// Core base colors (kept as named exports)
export const coreBlack = genCoreBlack
export const coreWhite = genCoreWhite

// Generate all tokens once
const tokens = generatePalette()

// Recreate generatedGray for core.text.subtle consumers
const generatedGray = mix(coreWhite, coreBlack, intensity.mix.gray)

// Export individual tokens as named constants for consumers that import them directly
export const focusBorder = tokens.focusBorder
export const extensionButtonProminentHoverBackground =
  tokens.extensionButtonProminentHoverBackground
export const scrollbarSliderBackground = tokens.scrollbarSliderBackground
export const scrollbarSliderHoverBackground =
  tokens.scrollbarSliderHoverBackground
export const scrollbarSliderActiveBackground =
  tokens.scrollbarSliderActiveBackground
export const keybindingLabelBackground = tokens.keybindingLabelBackground
export const keybindingLabelBottomBorder = tokens.keybindingLabelBottomBorder
export const editorBracketPairGuideActiveBackground1 =
  tokens.editorBracketPairGuideActiveBackground1
export const editorBracketPairGuideActiveBackground2 =
  tokens.editorBracketPairGuideActiveBackground2
export const editorBracketPairGuideActiveBackground3 =
  tokens.editorBracketPairGuideActiveBackground3
export const editorBracketPairGuideActiveBackground4 =
  tokens.editorBracketPairGuideActiveBackground4
export const editorBracketPairGuideActiveBackground5 =
  tokens.editorBracketPairGuideActiveBackground5
export const editorBracketPairGuideActiveBackground6 =
  tokens.editorBracketPairGuideActiveBackground6
export const editorFoldBackground = tokens.editorFoldBackground
export const editorSelectionBackground = tokens.editorSelectionBackground
export const editorInactiveSelectionBackground =
  tokens.editorInactiveSelectionBackground
export const editorFindMatchBackground = tokens.editorFindMatchBackground
export const editorFindMatchHighlightBackground =
  tokens.editorFindMatchHighlightBackground
export const editorFindMatchHighlightBorder =
  tokens.editorFindMatchHighlightBorder
export const editorFindRangeHighlightBackground =
  tokens.editorFindRangeHighlightBackground
export const editorFindRangeHighlightBorder =
  tokens.editorFindRangeHighlightBorder
export const editorRangeHighlightBackground =
  tokens.editorRangeHighlightBackground
export const editorWordHighlightBackground =
  tokens.editorWordHighlightBackground
export const editorWordHighlightBorder = tokens.editorWordHighlightBorder
export const editorWordHighlightStrongBackground =
  tokens.editorWordHighlightStrongBackground
export const editorWordHighlightStrongBorder =
  tokens.editorWordHighlightStrongBorder
export const editorSelectionHighlightBackground =
  tokens.editorSelectionHighlightBackground
export const editorSelectionHighlightBorder =
  tokens.editorSelectionHighlightBorder
export const editorHoverHighlightBackground =
  tokens.editorHoverHighlightBackground
export const editorIndentGuideBackground1 = tokens.editorIndentGuideBackground1
export const editorIndentGuideActiveBackground1 =
  tokens.editorIndentGuideActiveBackground1
export const editorWhitespaceForeground = tokens.editorWhitespaceForeground
export const editorBracketMatchBorder = tokens.editorBracketMatchBorder
export const editorInlayHintBackground = tokens.editorInlayHintBackground
export const editorInlayHintTypeBackground =
  tokens.editorInlayHintTypeBackground
export const editorInlayHintParameterBackground =
  tokens.editorInlayHintParameterBackground
export const editorOverviewRulerFindMatchForeground =
  tokens.editorOverviewRulerFindMatchForeground
export const editorOverviewRulerRangeHighlightForeground =
  tokens.editorOverviewRulerRangeHighlightForeground
export const editorOverviewRulerSelectionHighlightForeground =
  tokens.editorOverviewRulerSelectionHighlightForeground
export const editorOverviewRulerWordHighlightForeground =
  tokens.editorOverviewRulerWordHighlightForeground
export const editorOverviewRulerWordHighlightStrongForeground =
  tokens.editorOverviewRulerWordHighlightStrongForeground
export const editorWidgetResizeBorder = tokens.editorWidgetResizeBorder
export const editorSuggestWidgetBorder = tokens.editorSuggestWidgetBorder
export const searchEditorFindMatchBackground =
  tokens.searchEditorFindMatchBackground
export const tabLastPinnedBorder = tokens.tabLastPinnedBorder
export const tabSelectedForeground = tokens.tabSelectedForeground
export const statusBarItemHoverBackground = tokens.statusBarItemHoverBackground
export const statusBarItemProminentHoverBackground =
  tokens.statusBarItemProminentHoverBackground
export const statusBarItemErrorHoverBackground =
  tokens.statusBarItemErrorHoverBackground
export const statusBarItemWarningHoverBackground =
  tokens.statusBarItemWarningHoverBackground
export const statusBarItemCompactHoverBackground =
  tokens.statusBarItemCompactHoverBackground
export const statusBarItemOfflineHoverBackground =
  tokens.statusBarItemOfflineHoverBackground
export const terminalSelectionBackground = tokens.terminalSelectionBackground
export const terminalFindMatchBackground = tokens.terminalFindMatchBackground
export const terminalFindMatchHighlightBackground =
  tokens.terminalFindMatchHighlightBackground
export const terminalFindMatchHighlightBorder =
  tokens.terminalFindMatchHighlightBorder
export const terminalHoverHighlightBackground =
  tokens.terminalHoverHighlightBackground
export const terminalDropBackground = tokens.terminalDropBackground
export const terminalOverviewRulerFindMatchForeground =
  tokens.terminalOverviewRulerFindMatchForeground
export const gitBlameEditorDecorationForeground =
  tokens.gitBlameEditorDecorationForeground
export const menuBorder = tokens.menuBorder
export const peekViewEditorMatchHighlightBackground =
  tokens.peekViewEditorMatchHighlightBackground
export const peekViewResultSelectionBackground =
  tokens.peekViewResultSelectionBackground
export const peekViewResultMatchHighlightBackground =
  tokens.peekViewResultMatchHighlightBackground
export const diffEditorInsertedTextBackground =
  tokens.diffEditorInsertedTextBackground
export const diffEditorRemovedTextBackground =
  tokens.diffEditorRemovedTextBackground
export const diffEditorInsertedTextBorder = tokens.diffEditorInsertedTextBorder
export const diffEditorRemovedTextBorder = tokens.diffEditorRemovedTextBorder
export const diffEditorInsertedLineBackground =
  tokens.diffEditorInsertedLineBackground
export const diffEditorRemovedLineBackground =
  tokens.diffEditorRemovedLineBackground
export const diffEditorDiagonalFill = tokens.diffEditorDiagonalFill
export const mergeCurrentHeaderBackground = tokens.mergeCurrentHeaderBackground
export const mergeCurrentContentBackground =
  tokens.mergeCurrentContentBackground
export const mergeIncomingHeaderBackground =
  tokens.mergeIncomingHeaderBackground
export const mergeIncomingContentBackground =
  tokens.mergeIncomingContentBackground
export const editorStackFrameHighlightBackground =
  tokens.editorStackFrameHighlightBackground
export const editorFocusedStackFrameHighlightBackground =
  tokens.editorFocusedStackFrameHighlightBackground
export const debugViewValueChangedHighlight =
  tokens.debugViewValueChangedHighlight
export const toolbarHoverBackground = tokens.toolbarHoverBackground
export const toolbarActiveBackground = tokens.toolbarActiveBackground
export const buttonBorder = tokens.buttonBorder
export const buttonSeparator = tokens.buttonSeparator
export const inputValidationInfoBackground =
  tokens.inputValidationInfoBackground
export const inputValidationWarningBackground =
  tokens.inputValidationWarningBackground
export const inputValidationErrorBackground =
  tokens.inputValidationErrorBackground

// Derived object assembled from token constants
export const derived = {
  editor: {
    bracketPairGuideActiveBackground1: editorBracketPairGuideActiveBackground1,
    bracketPairGuideActiveBackground2: editorBracketPairGuideActiveBackground2,
    bracketPairGuideActiveBackground3: editorBracketPairGuideActiveBackground3,
    bracketPairGuideActiveBackground4: editorBracketPairGuideActiveBackground4,
    bracketPairGuideActiveBackground5: editorBracketPairGuideActiveBackground5,
    bracketPairGuideActiveBackground6: editorBracketPairGuideActiveBackground6,
    foldBackground: editorFoldBackground,
    selectionBackground: editorSelectionBackground,
    inactiveSelectionBackground: editorInactiveSelectionBackground,
    findMatchBackground: editorFindMatchBackground,
    findMatchHighlightBackground: editorFindMatchHighlightBackground,
    findMatchHighlightBorder: editorFindMatchHighlightBorder,
    findRangeHighlightBackground: editorFindRangeHighlightBackground,
    findRangeHighlightBorder: editorFindRangeHighlightBorder,
    rangeHighlightBackground: editorRangeHighlightBackground,
    wordHighlightBackground: editorWordHighlightBackground,
    wordHighlightBorder: editorWordHighlightBorder,
    wordHighlightStrongBackground: editorWordHighlightStrongBackground,
    wordHighlightStrongBorder: editorWordHighlightStrongBorder,
    selectionHighlightBackground: editorSelectionHighlightBackground,
    selectionHighlightBorder: editorSelectionHighlightBorder,
    hoverHighlightBackground: editorHoverHighlightBackground,
    indentGuideBackground1: editorIndentGuideBackground1,
    indentGuideActiveBackground1: editorIndentGuideActiveBackground1,
    whitespaceForeground: editorWhitespaceForeground,
    bracketMatchBorder: editorBracketMatchBorder,
    inlayHintBackground: editorInlayHintBackground,
    inlayHintTypeBackground: editorInlayHintTypeBackground,
    inlayHintParameterBackground: editorInlayHintParameterBackground,
    overviewRulerFindMatchForeground: editorOverviewRulerFindMatchForeground,
    overviewRulerRangeHighlightForeground:
      editorOverviewRulerRangeHighlightForeground,
    overviewRulerSelectionHighlightForeground:
      editorOverviewRulerSelectionHighlightForeground,
    overviewRulerWordHighlightForeground:
      editorOverviewRulerWordHighlightForeground,
    overviewRulerWordHighlightStrongForeground:
      editorOverviewRulerWordHighlightStrongForeground,
    widgetResizeBorder: editorWidgetResizeBorder,
    suggestWidgetBorder: editorSuggestWidgetBorder,
    searchEditorFindMatchBackground: searchEditorFindMatchBackground,
  },
  tabs: {
    lastPinnedBorder: tabLastPinnedBorder,
    selectedForeground: tabSelectedForeground,
  },
  statusBar: {
    itemHoverBackground: statusBarItemHoverBackground,
    itemProminentHoverBackground: statusBarItemProminentHoverBackground,
    itemErrorHoverBackground: statusBarItemErrorHoverBackground,
    itemWarningHoverBackground: statusBarItemWarningHoverBackground,
    itemCompactHoverBackground: statusBarItemCompactHoverBackground,
    itemOfflineHoverBackground: statusBarItemOfflineHoverBackground,
  },
  terminal: {
    selectionBackground: terminalSelectionBackground,
    findMatchBackground: terminalFindMatchBackground,
    findMatchHighlightBackground: terminalFindMatchHighlightBackground,
    findMatchHighlightBorder: terminalFindMatchHighlightBorder,
    hoverHighlightBackground: terminalHoverHighlightBackground,
    dropBackground: terminalDropBackground,
    overviewRulerFindMatchForeground: terminalOverviewRulerFindMatchForeground,
  },
  toolbar: {
    hoverBackground: toolbarHoverBackground,
    activeBackground: toolbarActiveBackground,
  },
  menu: { border: menuBorder },
  git: { blameEditorDecorationForeground: gitBlameEditorDecorationForeground },
  peekView: {
    editorMatchHighlightBackground: peekViewEditorMatchHighlightBackground,
    resultSelectionBackground: peekViewResultSelectionBackground,
    resultMatchHighlightBackground: peekViewResultMatchHighlightBackground,
  },
  diffEditor: {
    insertedTextBackground: diffEditorInsertedTextBackground,
    removedTextBackground: diffEditorRemovedTextBackground,
    insertedTextBorder: diffEditorInsertedTextBorder,
    removedTextBorder: diffEditorRemovedTextBorder,
    insertedLineBackground: diffEditorInsertedLineBackground,
    removedLineBackground: diffEditorRemovedLineBackground,
    diagonalFill: diffEditorDiagonalFill,
  },
  merge: {
    currentHeaderBackground: mergeCurrentHeaderBackground,
    currentContentBackground: mergeCurrentContentBackground,
    incomingHeaderBackground: mergeIncomingHeaderBackground,
    incomingContentBackground: mergeIncomingContentBackground,
  },
  debug: {
    editorStackFrameHighlightBackground,
    editorFocusedStackFrameHighlightBackground,
    debugViewValueChangedHighlight,
  },
} as const

// Public core object assembled from tokens and base palette
export const core = {
  bg: {
    base: coreBlack,
    elevated: tokens.bgElevated,
    overlay: tokens.bgOverlay,
    input: tokens.bgInput,
    hover: tokens.bgHover,
    active: tokens.bgActive,
    drop: tokens.bgDrop,
    lineHighlight: tokens.bgLineHighlight,
    bracketMatch: tokens.bgBracketMatch,
    tabs: coreBlack,
    selection: {
      active: tokens.editorSelectionBackground,
      inactive: tokens.editorInactiveSelectionBackground,
      focus: tokens.editorSelectionBackground,
      menu: tokens.peekViewResultSelectionBackground,
    },
    stateLabel: tokens.bgStateLabel,
  },
  border: tokens.border,
  text: {
    primary: tokens.textPrimary,
    muted: tokens.textMuted,
    subtle: generatedGray,
    inactive: tokens.textInactive,
    soft: tokens.textSoft,
    selection: coreWhite,
    subtle2: tokens.textSubtle2,
    gray600: tokens.textGray600,
    comment: tokens.textComment,
    commentDoc: tokens.textCommentDoc,
    commentDocEmphasized: tokens.textCommentDocEmphasized,
    preformat: tokens.textPreformat,
    placeholder: tokens.textPlaceholder,
    editorLinkActive: tokens.textEditorLinkActive,
  },
  accent: {
    blue: basePalette.blue,
    cyan: basePalette.cyan,
    teal: basePalette.teal,
    purple: basePalette.purple,
    magenta: basePalette.magenta,
    red: basePalette.red,
    green: basePalette.green,
    yellow: basePalette.yellow,
    orange: basePalette.orange,
  },
  brand: {
    button: {
      primary: tokens.brandButtonPrimary,
      hover: tokens.brandButtonHover,
    },
  },
  ui: {
    shadow: tokens.uiShadow,
    selectionWash: tokens.uiSelectionWash,
    scrollbarBase: tokens.uiScrollbarBase,
    tab: {
      activeModified: basePalette.purple,
      inactiveModified: basePalette.cyan,
      unfocusedActive: tokens.uiTabUnfocusedActive,
    },
    git: {
      ignored: tokens.uiGitIgnored,
      deleted: tokens.uiGitDeleted,
      conflicting: tokens.uiGitConflicting,
      stageDeleted: tokens.uiGitStageDeleted,
      stageModified: tokens.uiGitStageModified,
    },
  },
} as const
