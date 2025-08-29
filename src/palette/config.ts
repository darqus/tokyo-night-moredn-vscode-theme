// Centralized intensity configuration for palette generation
// Tweaking these values adjusts the theme consistently

export const intensity = {
  bg: {
    dark: 0.03,
    elevated: 0.08,
    overlay: 0.12,
    input: 0.12,
    hover: 0.08,
    active: 0.15,
  },
  selection: {
    active: 0.25,
    inactive: 0.15,
    focus: 0.2,
    menu: 0.18,
    editor: 0.2, // повышаем активное выделение для лучшей различимости
    editorInactive: 0.15,
    editorHighlightBg: 0.18, // легкий апгрейд для подсветки совпадений
    editorHighlightBorder: 0.45,
    editorWordHighlightStrong: 0.2, // отдельная интенсивность для strong-выделения слов
  },
  alpha: {
    drop: 0.2,
    lineHighlight: 0.1,
    bracketMatch: 0.15,
    focusBorder: 0.3,
    scrollbar: { base: 0.25, hover: 0.38, active: 0.5 },
    keybindingBg: 0.6,
    keybindingBottomBorder: 0.67,
    toolbarBg: 0.13,
    peek: { match: 0.15, selection: 0.2 },
    tab: { lastPinnedBorder: 0.8, selectedFg: 0.63 },
    gitBlame: 0.5,
    diff: { text: 0.15, line: 0.1, diagonal: 0.2 },
    debug: { stack: 0.15, focusedStack: 0.15, valueChanged: 0.67 },
    inputValidation: 0.13,
    statusBar: {
      hover: 0.6,
      prominentHover: 0.45, // немного усиливаем hover для prominent-элементов
      errorHover: 0.8,
      warningHover: 0.8,
      compactHover: 0.5,
      offlineHover: 0.8,
    },
    button: { border: 0.5, separator: 0.4 },
    indentGuide: 0.15,
    whitespace: 0.15,
    editorOverviewRuler: 0.15,
    suggestWidgetBorder: 0,
    searchEditorFindMatch: 0.15,
    inlayHintBg: 0.15,
  },
  mix: {
    gray: 0.5, // generatedGray weight
    bgStateLabel: 0.1,
    border: 0.25,
    text: {
      muted: 0.4,
      inactive: 0.6,
      subtle2: 0.5,
      gray600: 0.4,
      commentDoc: 0.35,
      commentDocEmphasized: 0.3,
    },
    textSoftCyan: 0.12,
    textPreformatCyan: 0.18,
    textPlaceholderGray: 0.7,
    editorLinkActiveBlue: 0.2,
    brandButton: { primary: 0.2, hover: 0.3 },
    uiScrollbarBaseBlueGray: 0.4,
    uiTabUnfocusedActiveBlueBlack: 0.25,
    uiGitDeletedRedMagenta: 0.15,
    uiGitConflictingAquaBlue: 0.2,
    uiGitStageDeletedRedMagenta: 0.1,
  },
} as const
