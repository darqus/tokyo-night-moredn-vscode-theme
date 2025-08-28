import { basePalette } from './palette.base'
import { withAlpha, mix, lightenToward, darkenToward } from './utils/color'

const interfaceColors = {
  editorBg: basePalette.black,
  editorFg: basePalette.white,
  border: basePalette.black,
  accent: basePalette.blue,
  error: basePalette.red,
  warning: basePalette.yellow,
  success: basePalette.green,
  info: basePalette.cyan,
} as const

const generatedGray = mix(basePalette.white, basePalette.black, 0.55)

export const aquaLight = lightenToward(basePalette.cyan, basePalette.blue, 0.15)

export const bgElevated = darkenToward(
  interfaceColors.editorBg,
  basePalette.black,
  0.08
)
export const bgOverlay = darkenToward(
  interfaceColors.editorBg,
  basePalette.black,
  0.12
)

export const bgInput = mix(interfaceColors.editorBg, basePalette.black, 0.15)

export const bgHover = lightenToward(
  interfaceColors.editorBg,
  basePalette.blue,
  0.025
)
export const bgActive = lightenToward(
  interfaceColors.editorBg,
  basePalette.blue,
  0.12
)
export const bgDrop = withAlpha(basePalette.blue, 0.15)
export const bgLineHighlight = withAlpha(basePalette.blue, 0.08)
export const bgBracketMatch = withAlpha(basePalette.blue, 0.12)

export const bgSelectionActive = withAlpha(basePalette.blue, 0.2)
export const bgSelectionInactive = withAlpha(basePalette.blue, 0.12)
export const bgSelectionFocus = withAlpha(basePalette.blue, 0.15)
export const bgSelectionMenu = withAlpha(basePalette.blue, 0.15)

export const bgStateLabel = mix(interfaceColors.editorBg, generatedGray, 0.15)
export const border = mix(basePalette.black, generatedGray, 0.2)
export const textPrimary = mix(basePalette.white, generatedGray, 0.15)

export const textMuted = mix(basePalette.white, generatedGray, 0.5)

export const textInactive = mix(basePalette.white, generatedGray, 0.65)

export const textSoft = mix(basePalette.white, basePalette.cyan, 0.15)

export const textSubtle2 = mix(basePalette.white, generatedGray, 0.55)

export const textGray600 = mix(generatedGray, basePalette.black, 0.35)

export const textComment = mix(generatedGray, basePalette.black, 0.35)

export const textCommentDoc = mix(generatedGray, basePalette.black, 0.3)

export const textCommentDocEmphasized = mix(
  generatedGray,
  basePalette.black,
  0.25
)

export const textPreformat = mix(basePalette.white, basePalette.cyan, 0.18)

export const textPlaceholder = mix(basePalette.white, generatedGray, 0.7)

export const textEditorLinkActive = mix(
  basePalette.white,
  basePalette.blue,
  0.2
)

export const brandButtonPrimary = mix(basePalette.black, basePalette.blue, 0.18)

export const brandButtonHover = mix(basePalette.black, basePalette.blue, 0.22)

export const uiShadow = withAlpha(basePalette.blue, 0.18)

export const uiSelectionWash = withAlpha(basePalette.blue, 0.12)

export const uiScrollbarBase = mix(basePalette.blue, generatedGray, 0.35)

export const uiTabUnfocusedActive = mix(
  basePalette.blue,
  basePalette.black,
  0.2
)

export const uiGitIgnored = mix(basePalette.white, generatedGray, 0.95)

export const uiGitDeleted = mix(basePalette.red, basePalette.magenta, 0.15)

export const uiGitConflicting = mix(aquaLight, basePalette.blue, 0.2)

export const uiGitStageDeleted = mix(basePalette.red, basePalette.magenta, 0.1)

export const uiGitStageModified = mix(basePalette.blue, basePalette.blue, 0.15)

// Terminal colors with alpha
export const terminalSelectionBackground = withAlpha(textSubtle2, 0.19)
export const terminalFindMatchBackground = withAlpha(basePalette.blue, 0.4)
export const terminalFindMatchHighlightBackground = withAlpha(
  basePalette.blue,
  0.4
)
export const terminalFindMatchHighlightBorder = withAlpha(basePalette.blue, 0.6)
export const terminalHoverHighlightBackground = withAlpha(
  brandButtonPrimary,
  0.2
)
export const terminalDropBackground = withAlpha(bgDrop, 0.5)
export const terminalOverviewRulerFindMatchForeground = withAlpha(
  textPrimary,
  0.27
)

// Base theme colors with alpha
export const focusBorder = withAlpha(basePalette.blue, 0.3)
export const extensionButtonProminentHoverBackground = withAlpha(
  brandButtonPrimary,
  0.3
)
export const scrollbarSliderBackground = withAlpha(uiScrollbarBase, 0.25)
export const scrollbarSliderHoverBackground = withAlpha(uiScrollbarBase, 0.38)
export const scrollbarSliderActiveBackground = withAlpha(uiScrollbarBase, 0.5)
export const keybindingLabelBackground = withAlpha(bgElevated, 0.6)
export const keybindingLabelBottomBorder = withAlpha(border, 0.67)

// Misc colors with alpha
export const toolbarHoverBackground = withAlpha(interfaceColors.editorBg, 0.13)
export const toolbarActiveBackground = withAlpha(interfaceColors.editorBg, 0.13)

// Peek view colors with alpha
export const peekViewEditorMatchHighlightBackground = withAlpha(
  brandButtonPrimary,
  0.15
)
export const peekViewResultSelectionBackground = withAlpha(
  brandButtonPrimary,
  0.2
)
export const peekViewResultMatchHighlightBackground = withAlpha(
  brandButtonPrimary,
  0.15
)

// Tabs colors with alpha
export const tabLastPinnedBorder = withAlpha(textSubtle2, 0.8)
export const tabSelectedForeground = withAlpha(textPrimary, 0.63)

// Menus colors with alpha
export const menuBorder = withAlpha(border, 0)

// Git colors with alpha
export const gitBlameEditorDecorationForeground = withAlpha(textSubtle2, 0.5)

// Diff editor colors with alpha
export const diffEditorInsertedTextBackground = withAlpha(
  basePalette.blue,
  0.15
)
export const diffEditorRemovedTextBackground = withAlpha(basePalette.red, 0.15)
export const diffEditorInsertedTextBorder = withAlpha(basePalette.blue, 0)
export const diffEditorRemovedTextBorder = withAlpha(basePalette.red, 0)
export const diffEditorInsertedLineBackground = withAlpha(basePalette.blue, 0.1)
export const diffEditorRemovedLineBackground = withAlpha(basePalette.red, 0.1)
export const diffEditorDiagonalFill = withAlpha(textSubtle2, 0.2)

// Merge colors with alpha
export const mergeCurrentHeaderBackground = withAlpha(basePalette.teal, 0.67)
export const mergeCurrentContentBackground = withAlpha(basePalette.teal, 0.27)
export const mergeIncomingHeaderBackground = withAlpha(brandButtonPrimary, 0.67)
export const mergeIncomingContentBackground = withAlpha(
  brandButtonPrimary,
  0.27
)

// Debug colors with alpha
export const editorStackFrameHighlightBackground = withAlpha(
  basePalette.yellow,
  0.15
)
export const editorFocusedStackFrameHighlightBackground = withAlpha(
  basePalette.teal,
  0.15
)
export const debugViewValueChangedHighlight = withAlpha(
  brandButtonPrimary,
  0.67
)

// Input validation colors with alpha
export const inputValidationInfoBackground = withAlpha(basePalette.blue, 0.13)
export const inputValidationWarningBackground = withAlpha(
  basePalette.yellow,
  0.13
)
export const inputValidationErrorBackground = withAlpha(basePalette.red, 0.13)

// Status bar colors with alpha
export const statusBarItemHoverBackground = withAlpha(bgHover, 0.6)
export const statusBarItemProminentHoverBackground = withAlpha(bgHover, 0.4)
export const statusBarItemErrorHoverBackground = withAlpha(basePalette.red, 0.8)
export const statusBarItemWarningHoverBackground = withAlpha(
  basePalette.yellow,
  0.8
)
export const statusBarItemCompactHoverBackground = withAlpha(bgHover, 0.5)
export const statusBarItemOfflineHoverBackground = withAlpha(
  basePalette.red,
  0.8
)

// Button colors with alpha
export const buttonBorder = withAlpha(basePalette.blue, 0.5)
export const buttonSeparator = withAlpha(basePalette.blue, 0.4)

// Editor bracket pair guide colors with alpha
export const editorBracketPairGuideActiveBackground1 = withAlpha(
  basePalette.blue,
  0.15
)
export const editorBracketPairGuideActiveBackground2 = withAlpha(
  basePalette.orange,
  0.15
)
export const editorBracketPairGuideActiveBackground3 = withAlpha(
  basePalette.green,
  0.15
)
export const editorBracketPairGuideActiveBackground4 = withAlpha(
  basePalette.yellow,
  0.15
)
export const editorBracketPairGuideActiveBackground5 = withAlpha(
  basePalette.red,
  0.15
)
export const editorBracketPairGuideActiveBackground6 = withAlpha(
  basePalette.magenta,
  0.15
)

// Editor colors with alpha
export const editorFoldBackground = withAlpha(bgElevated, 0.15)
export const editorSelectionBackground = withAlpha(basePalette.blue, 0.15)
export const editorInactiveSelectionBackground = withAlpha(
  basePalette.blue,
  0.15
)
export const editorFindMatchBackground = withAlpha(basePalette.yellow, 0.15)
export const editorFindMatchHighlightBackground = withAlpha(
  basePalette.purple,
  0.15
)
export const editorFindMatchHighlightBorder = withAlpha(basePalette.blue, 0.15)
export const editorFindRangeHighlightBackground = withAlpha(textSoft, 0.25)
export const editorFindRangeHighlightBorder = withAlpha(textMuted, 0.45)
export const editorRangeHighlightBackground = withAlpha(textSubtle2, 0.15)
export const editorWordHighlightBackground = withAlpha(basePalette.blue, 0.05)
export const editorWordHighlightBorder = withAlpha(basePalette.blue, 0.45)
export const editorWordHighlightStrongBackground = withAlpha(
  basePalette.blue,
  0.15
)
export const editorWordHighlightStrongBorder = withAlpha(basePalette.blue, 0.45)
export const editorSelectionHighlightBackground = withAlpha(
  basePalette.blue,
  0.15
)
export const editorSelectionHighlightBorder = withAlpha(basePalette.blue, 0.45)
export const editorHoverHighlightBackground = withAlpha(basePalette.blue, 0.15)
export const editorIndentGuideBackground1 = withAlpha(textSubtle2, 0.15)
export const editorIndentGuideActiveBackground1 = withAlpha(textSubtle2, 0.15)
export const editorWhitespaceForeground = withAlpha(textSubtle2, 0.15)
export const editorBracketMatchBorder = withAlpha(basePalette.blue, 0.15)
export const editorInlayHintBackground = withAlpha(bgElevated, 0.15)
export const editorInlayHintTypeBackground = withAlpha(bgElevated, 0.15)
export const editorInlayHintParameterBackground = withAlpha(bgElevated, 0.15)
export const editorOverviewRulerFindMatchForeground = withAlpha(
  textPrimary,
  0.15
)
export const editorOverviewRulerRangeHighlightForeground = withAlpha(
  textPrimary,
  0.15
)
export const editorOverviewRulerSelectionHighlightForeground = withAlpha(
  textPrimary,
  0.15
)
export const editorOverviewRulerWordHighlightForeground = withAlpha(
  basePalette.blue,
  0.15
)
export const editorOverviewRulerWordHighlightStrongForeground = withAlpha(
  basePalette.blue,
  0.15
)
export const editorWidgetResizeBorder = withAlpha(textSubtle2, 0.15)
export const editorSuggestWidgetBorder = withAlpha(basePalette.black, 0)
export const searchEditorFindMatchBackground = withAlpha(basePalette.blue, 0.15)

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
    overviewRulerRangeHighlightForeground: editorOverviewRulerRangeHighlightForeground,
    overviewRulerSelectionHighlightForeground: editorOverviewRulerSelectionHighlightForeground,
    overviewRulerWordHighlightForeground: editorOverviewRulerWordHighlightForeground,
    overviewRulerWordHighlightStrongForeground: editorOverviewRulerWordHighlightStrongForeground,
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
  menu: {
    border: menuBorder,
  },
  git: {
    blameEditorDecorationForeground: gitBlameEditorDecorationForeground,
  },
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
  button: {
    border: buttonBorder,
    separator: buttonSeparator,
  },
  inputValidation: {
    infoBackground: inputValidationInfoBackground,
    warningBackground: inputValidationWarningBackground,
    errorBackground: inputValidationErrorBackground,
  },
} as const

export const core = {
  bg: {
    base: interfaceColors.editorBg,
    elevated: bgElevated,
    overlay: bgOverlay,
    input: bgInput,
    hover: bgHover,
    active: bgActive,
    drop: bgDrop,
    lineHighlight: bgLineHighlight,
    bracketMatch: bgBracketMatch,
    tabs: interfaceColors.editorBg,
    selection: {
      active: bgSelectionActive,
      inactive: bgSelectionInactive,
      focus: bgSelectionFocus,
      menu: bgSelectionMenu,
    },
    stateLabel: bgStateLabel,
  },
  border: border,
  text: {
    primary: textPrimary,
    muted: textMuted,
    subtle: generatedGray,
    inactive: textInactive,
    soft: textSoft,
    selection: basePalette.white,
    subtle2: textSubtle2,
    gray600: textGray600,
    comment: textComment,
    commentDoc: textCommentDoc,
    commentDocEmphasized: textCommentDocEmphasized,
    preformat: textPreformat,
    placeholder: textPlaceholder,
    editorLinkActive: textEditorLinkActive,
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
      primary: brandButtonPrimary,
      hover: brandButtonHover,
    },
  },
  ui: {
    shadow: uiShadow,
    selectionWash: uiSelectionWash,
    scrollbarBase: uiScrollbarBase,
    tab: {
      activeModified: basePalette.purple,
      inactiveModified: basePalette.cyan,
      unfocusedActive: uiTabUnfocusedActive,
    },
    git: {
      ignored: uiGitIgnored,
      deleted: uiGitDeleted,
      conflicting: uiGitConflicting,
      stageDeleted: uiGitStageDeleted,
      stageModified: uiGitStageModified,
    },
  },
} as const
