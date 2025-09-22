/**
 * @fileoverview
 * Семантические сопоставления цветов интерфейса VS Code.
 * Группирует токены по компонентам для улучшения модульности и удобства сопровождения.
 */

import { InterfacePalette } from '../types'

// Определяем тип для ключей цвета VS Code для повышения безопасности типов.
// Это не исчерпывающий список, а скорее те, которые используются в этой теме.
type VSCodeColorKeys =
  | 'foreground'
  | 'descriptionForeground'
  | 'disabledForeground'
  | 'focusBorder'
  | 'errorForeground'
  | 'selection.background'
  | 'widget.shadow'
  | 'titleBar.activeBackground'
  | 'titleBar.inactiveBackground'
  | 'titleBar.border'
  | 'menubar.selectionBackground'
  | 'menubar.selectionBorder'
  | 'menu.background'
  | 'menu.selectionBackground'
  | 'menu.selectionBorder'
  | 'menu.separatorBackground'
  | 'menu.border'
  | 'commandCenter.background'
  | 'commandCenter.activeBackground'
  | 'commandCenter.border'
  | 'quickInput.background'
  | 'quickInputTitle.background'
  | 'quickInputList.focusBackground'
  | 'editor.background'
  | 'editor.selectionBackground'
  | 'editor.selectionForeground'
  | 'editor.inactiveSelectionBackground'
  | 'editor.lineHighlightBackground'
  | 'editor.findMatchBackground'
  | 'editor.findMatchBorder'
  | 'editor.findMatchHighlightBackground'
  | 'editor.wordHighlightBackground'
  | 'editor.wordHighlightStrongBackground'
  | 'editor.hoverHighlightBackground'
  | 'editor.rangeHighlightBackground'
  | 'editorBracketMatch.background'
  | 'editorBracketMatch.border'
  | 'editorCursor.foreground'
  | 'editorIndentGuide.background1'
  | 'editorIndentGuide.activeBackground1'
  | 'editorLineNumber.foreground'
  | 'editorLineNumber.activeForeground'
  | 'editorRuler.foreground'
  | 'editorGroup.border'
  | 'editorGroup.dropBackground'
  | 'editorGroupHeader.noTabsBackground'
  | 'editorGroupHeader.tabsBackground'
  | 'editorGroupHeader.tabsBorder'
  | 'activityBar.background'
  | 'activityBar.activeBorder'
  | 'activityBar.activeBackground'
  | 'activityBar.border'
  | 'activityBarBadge.background'
  | 'activityBarBadge.foreground'
  | 'sideBar.background'
  | 'sideBar.border'
  | 'sideBarSectionHeader.background'
  | 'sideBarSectionHeader.border'
  | 'statusBar.background'
  | 'statusBar.border'
  | 'statusBar.noFolderBackground'
  | 'statusBar.debuggingBackground'
  | 'statusBar.debuggingForeground'
  | 'statusBarItem.activeBackground'
  | 'statusBarItem.hoverBackground'
  | 'statusBarItem.hoverForeground'
  | 'statusBarItem.prominentBackground'
  | 'statusBarItem.prominentForeground'
  | 'statusBarItem.prominentHoverBackground'
  | 'statusBarItem.prominentHoverForeground'
  | 'statusBarItem.errorBackground'
  | 'statusBarItem.errorForeground'
  | 'statusBarItem.errorHoverBackground'
  | 'statusBarItem.errorHoverForeground'
  | 'statusBarItem.warningBackground'
  | 'statusBarItem.warningForeground'
  | 'statusBarItem.warningHoverBackground'
  | 'statusBarItem.warningHoverForeground'
  | 'statusBarItem.remoteBackground'
  | 'statusBarItem.remoteForeground'
  | 'statusBarItem.remoteHoverBackground'
  | 'statusBarItem.remoteHoverForeground'
  | 'statusBarItem.compactHoverBackground'
  | 'tab.activeBackground'
  | 'tab.activeForeground'
  | 'tab.activeBorderTop'
  | 'tab.inactiveBackground'
  | 'tab.inactiveForeground'
  | 'tab.border'
  | 'tab.hoverBackground'
  | 'tab.hoverForeground'
  | 'tab.unfocusedActiveBackground'
  | 'tab.unfocusedActiveForeground'
  | 'tab.unfocusedInactiveBackground'
  | 'tab.unfocusedInactiveForeground'
  | 'tab.lastPinnedBorder'
  | 'list.activeSelectionBackground'
  | 'list.activeSelectionForeground'
  | 'list.inactiveSelectionBackground'
  | 'list.inactiveSelectionForeground'
  | 'list.hoverBackground'
  | 'list.hoverForeground'
  | 'list.focusBackground'
  | 'list.focusForeground'
  | 'list.dropBackground'
  | 'list.filterMatchBackground'
  | 'list.filterMatchBorder'
  | 'list.highlightForeground'
  | 'list.invalidItemForeground'
  | 'list.errorForeground'
  | 'list.warningForeground'
  | 'tree.indentGuidesStroke'
  | 'input.background'
  | 'input.foreground'
  | 'input.border'
  | 'input.placeholderForeground'
  | 'inputOption.activeBackground'
  | 'inputOption.activeBorder'
  | 'inputValidation.errorBackground'
  | 'inputValidation.errorForeground'
  | 'inputValidation.errorBorder'
  | 'inputValidation.infoBackground'
  | 'inputValidation.infoForeground'
  | 'inputValidation.infoBorder'
  | 'inputValidation.warningBackground'
  | 'inputValidation.warningForeground'
  | 'inputValidation.warningBorder'
  | 'button.background'
  | 'button.foreground'
  | 'button.hoverBackground'
  | 'button.border'
  | 'button.separator'
  | 'button.secondaryBackground'
  | 'button.secondaryForeground'
  | 'button.secondaryHoverBackground'
  | 'dropdown.background'
  | 'dropdown.foreground'
  | 'dropdown.border'
  | 'dropdown.listBackground'
  | 'badge.background'
  | 'badge.foreground'
  | 'progressBar.background'
  | 'panel.background'
  | 'panel.border'
  | 'panel.dropBorder'
  | 'panelTitle.activeBorder'
  | 'panelTitle.activeForeground'
  | 'panelTitle.inactiveForeground'
  | 'panelInput.border'
  | 'panelSection.border'
  | 'panelSection.dropBackground'
  | 'panelSectionHeader.background'
  | 'panelSectionHeader.foreground'
  | 'panelSectionHeader.border'
  | 'terminal.background'
  | 'terminal.foreground'
  | 'terminal.selectionBackground'
  | 'terminal.inactiveSelectionBackground'
  | 'terminal.border'
  | 'terminal.dropBackground'
  | 'terminal.hoverHighlightBackground'
  | 'terminal.tab.activeBorder'
  | 'terminalCursor.background'
  | 'terminalCursor.foreground'
  | 'terminal.findMatchBackground'
  | 'terminal.findMatchBorder'
  | 'terminal.findMatchHighlightBackground'
  | 'terminalCommandDecoration.defaultBackground'
  | 'terminalCommandDecoration.successBackground'
  | 'terminalCommandDecoration.errorBackground'
  | 'terminalOverviewRuler.cursorForeground'
  | 'terminalOverviewRuler.findMatchForeground'
  | 'terminalOverviewRuler.border'
  | 'terminal.initialHintForeground'
  | 'terminal.ansiBlack'
  | 'terminal.ansiRed'
  | 'terminal.ansiGreen'
  | 'terminal.ansiYellow'
  | 'terminal.ansiBlue'
  | 'terminal.ansiMagenta'
  | 'terminal.ansiCyan'
  | 'terminal.ansiWhite'
  | 'terminal.ansiBrightBlack'
  | 'terminal.ansiBrightRed'
  | 'terminal.ansiBrightGreen'
  | 'terminal.ansiBrightYellow'
  | 'terminal.ansiBrightBlue'
  | 'terminal.ansiBrightMagenta'
  | 'terminal.ansiBrightCyan'
  | 'terminal.ansiBrightWhite'
  | 'textLink.foreground'
  | 'textLink.activeForeground'
  | 'editorLink.activeForeground'
  | 'textBlockQuote.background'
  | 'textBlockQuote.border'
  | 'scrollbar.shadow'
  | 'scrollbarSlider.background'
  | 'scrollbarSlider.hoverBackground'
  | 'scrollbarSlider.activeBackground'
  | 'notifications.background'
  | 'notifications.foreground'
  | 'notifications.border'
  | 'notificationCenter.border'
  | 'notificationCenterHeader.foreground'
  | 'notificationCenterHeader.background'
  | 'notificationToast.border'
  | 'notificationsErrorIcon.foreground'
  | 'notificationsWarningIcon.foreground'
  | 'notificationsInfoIcon.foreground'
  | 'extensionButton.prominentBackground'
  | 'extensionButton.prominentForeground'
  | 'extensionButton.prominentHoverBackground'
  | 'extensionBadge.remoteBackground'
  | 'extensionBadge.remoteForeground'
  | 'gitDecoration.addedResourceForeground'
  | 'gitDecoration.modifiedResourceForeground'
  | 'gitDecoration.deletedResourceForeground'
  | 'gitDecoration.untrackedResourceForeground'
  | 'gitDecoration.ignoredResourceForeground'
  | 'gitDecoration.conflictingResourceForeground'
  | 'gitDecoration.renamedResourceForeground'
  | 'gitDecoration.stageModifiedResourceForeground'
  | 'gitDecoration.stageDeletedResourceForeground'
  | 'gitDecoration.submoduleResourceForeground'
  | 'scmGraph.historyItemHoverLabelForeground'
  | 'scmGraph.historyItemHoverDefaultLabelForeground'
  | 'scmGraph.historyItemHoverDefaultLabelBackground'
  | 'scmGraph.foreground1'
  | 'scmGraph.foreground2'
  | 'scmGraph.foreground3'
  | 'scmGraph.foreground4'
  | 'scmGraph.foreground5'
  | 'scmGraph.historyItemHoverAdditionsForeground'
  | 'scmGraph.historyItemHoverDeletionsForeground'
  | 'scmGraph.historyItemRefColor'
  | 'scmGraph.historyItemRemoteRefColor'
  | 'scmGraph.historyItemBaseRefColor'
  | 'diffEditor.insertedTextBackground'
  | 'diffEditor.removedTextBackground'
  | 'diffEditor.insertedLineBackground'
  | 'diffEditor.removedLineBackground'
  | 'diffEditor.diagonalFill'
  | 'settings.modifiedItemIndicator'
  | 'settings.dropdownBackground'
  | 'settings.dropdownForeground'
  | 'settings.dropdownBorder'
  | 'settings.checkboxBackground'
  | 'settings.checkboxForeground'
  | 'settings.checkboxBorder'
  | 'settings.textInputBackground'
  | 'settings.textInputForeground'
  | 'settings.textInputBorder'
  | 'settings.numberInputBackground'
  | 'settings.numberInputForeground'
  | 'settings.numberInputBorder'
  | 'breadcrumb.foreground'
  | 'breadcrumb.background'
  | 'breadcrumb.focusForeground'
  | 'breadcrumb.activeSelectionForeground'
  | 'breadcrumbPicker.background'
  | 'widget.border'
  | 'peekView.border'
  | 'peekViewEditor.background'
  | 'peekViewEditor.matchHighlightBackground'
  | 'peekViewResult.background'
  | 'peekViewResult.matchHighlightBackground'
  | 'peekViewResult.selectionBackground'
  | 'peekViewTitle.background'
  | 'peekViewTitleDescription.foreground'
  | 'peekViewTitleLabel.foreground'
  | 'editorWidget.background'
  | 'editorWidget.border'
  | 'editorWidget.resizeBorder'
  | 'editorSuggestWidget.background'
  | 'editorSuggestWidget.border'
  | 'editorSuggestWidget.highlightForeground'
  | 'editorSuggestWidget.selectedBackground'
  | 'editorSuggestWidget.selectedForeground'
  | 'editorSuggestWidget.selectedIconForeground'
  | 'editorHoverWidget.background'
  | 'editorHoverWidget.border'
  | 'editorHoverWidget.foreground'
  | 'editorHoverWidget.highlightForeground'
  | 'editorHoverWidget.statusBarBackground'
  | 'debugExceptionWidget.background'
  | 'debugExceptionWidget.border'
  | 'editorMarkerNavigation.background'
  | 'editorMarkerNavigationError.background'
  | 'editorMarkerNavigationWarning.background'
  | 'editorMarkerNavigationInfo.background'
  | 'merge.border'
  | 'editorOverviewRuler.border'
  | 'editorOverviewRuler.findMatchForeground'
  | 'editorOverviewRuler.rangeHighlightForeground'
  | 'editorOverviewRuler.selectionHighlightForeground'
  | 'editorOverviewRuler.wordHighlightForeground'
  | 'editorOverviewRuler.wordHighlightStrongForeground'
  | 'editorOverviewRuler.modifiedForeground'
  | 'editorOverviewRuler.addedForeground'
  | 'editorOverviewRuler.deletedForeground'
  | 'editorOverviewRuler.errorForeground'
  | 'editorOverviewRuler.warningForeground'
  | 'editorOverviewRuler.infoForeground'
  | 'editorOverviewRuler.bracketMatchForeground'
  | 'minimap.findMatchHighlight'
  | 'minimap.selectionHighlight'
  | 'minimap.errorHighlight'
  | 'minimap.warningHighlight'
  | 'minimap.background'
  | 'minimap.selectionOccurrenceHighlight'
  | 'minimapSlider.background'
  | 'minimapSlider.hoverBackground'
  | 'minimapSlider.activeBackground'
  | 'minimapGutter.addedBackground'
  | 'minimapGutter.modifiedBackground'
  | 'minimapGutter.deletedBackground'
  | 'searchEditor.findMatchBackground'
  | 'searchEditor.findMatchBorder'
  | 'problemsErrorIcon.foreground'
  | 'problemsWarningIcon.foreground'
  | 'problemsInfoIcon.foreground'
  | 'charts.foreground'
  | 'charts.lines'
  | 'charts.red'
  | 'charts.blue'
  | 'charts.yellow'
  | 'charts.orange'
  | 'charts.green'
  | 'charts.purple'
  | 'ports.iconRunningProcessForeground'
  | 'checkbox.background'
  | 'checkbox.foreground'
  | 'checkbox.border'
  | 'toolbar.hoverBackground'
  | 'toolbar.hoverOutline'
  | 'toolbar.activeBackground'
  | 'inlineChat.background'
  | 'inlineChat.foreground'
  | 'inlineChat.border'
  | 'icon.foreground'
  | 'keybindingLabel.background'
  | 'keybindingLabel.border'
  | 'keybindingLabel.bottomBorder'
  | 'welcomePage.background'
  | 'welcomePage.progress.background'
  | 'welcomePage.progress.foreground'
  | 'welcomePage.tileBackground'
  | 'welcomePage.tileHoverBackground'
  | 'welcomePage.tileBorder'
  | 'walkThrough.embeddedEditorBackground'
  | 'debugToolBar.background'
  | 'debugToolBar.border'
  | 'debugIcon.breakpointForeground'
  | 'debugIcon.breakpointDisabledForeground'
  | 'debugIcon.breakpointUnverifiedForeground'
  | 'debugIcon.breakpointCurrentStackframeForeground'
  | 'debugIcon.breakpointStackframeForeground'
  | 'debugIcon.startForeground'
  | 'debugIcon.pauseForeground'
  | 'debugIcon.stopForeground'
  | 'debugIcon.disconnectForeground'
  | 'debugIcon.restartForeground'
  | 'debugIcon.stepOverForeground'
  | 'debugIcon.stepIntoForeground'
  | 'debugIcon.stepOutForeground'
  | 'debugIcon.continueForeground'
  | 'debugIcon.stepBackForeground'
  | 'debugConsole.infoForeground'
  | 'debugConsole.warningForeground'
  | 'debugConsole.errorForeground'
  | 'debugConsole.sourceForeground'
  | 'debugConsoleInputIcon.foreground'
  | 'testing.iconFailed'
  | 'testing.iconErrored'
  | 'testing.iconPassed'
  | 'testing.runAction'
  | 'testing.iconQueued'
  | 'testing.iconUnset'
  | 'testing.iconSkipped'
  | 'testing.peekBorder'
  | 'testing.peekHeaderBackground'

type ColorMapping = Record<VSCodeColorKeys, string>

const baseColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  foreground: p.text.primary,
  descriptionForeground: p.text.muted,
  disabledForeground: p.text.inactive,
  focusBorder: p.border.focus,
  errorForeground: p.state.error,
  'selection.background': p.bg.selection,
  'widget.shadow': p.derived.shadows.widget,
})

const titleBarColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'titleBar.activeBackground': p.bg.base,
  'titleBar.inactiveBackground': p.bg.base,
  'titleBar.border': p.border.default,
})

const menuColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'menubar.selectionBackground': p.bg.hover,
  'menubar.selectionBorder': p.border.focus,
  'menu.background': p.bg.elevated,
  'menu.selectionBackground': p.bg.selection,
  'menu.selectionBorder': p.border.focus,
  'menu.separatorBackground': p.border.separatorBackground,
  'menu.border': p.border.default,
})

const commandCenterColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'commandCenter.background': p.bg.base,
  'commandCenter.activeBackground': p.bg.hover,
  'commandCenter.border': p.border.default,
  'quickInput.background': p.bg.elevated,
  'quickInputTitle.background': p.bg.overlay,
  'quickInputList.focusBackground': p.bg.selection,
})

const editorColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'editor.background': p.bg.base,
  'editor.selectionBackground': p.bg.selection,
  'editor.selectionForeground': p.text.primary,
  'editor.inactiveSelectionBackground': p.bg.hover,
  'editor.lineHighlightBackground': p.bg.hover,
  'editor.findMatchBackground': p.derived.findMatch.background,
  'editor.findMatchBorder': p.derived.findMatch.border,
  'editor.findMatchHighlightBackground':
    p.derived.findMatch.highlightBackground,
  'editor.wordHighlightBackground': p.bg.hover,
  'editor.wordHighlightStrongBackground': p.bg.selection,
  'editor.hoverHighlightBackground': p.bg.hover,
  'editor.rangeHighlightBackground': p.bg.hover,
  'editorBracketMatch.background': p.bg.hover,
  'editorBracketMatch.border': p.border.focus,
  'editorCursor.foreground': p.text.primary,
  'editorIndentGuide.background1': p.border.default,
  'editorIndentGuide.activeBackground1': p.border.focus,
  'editorLineNumber.foreground': p.text.lineNumber,
  'editorLineNumber.activeForeground': p.text.lineNumberActive,
  'editorRuler.foreground': p.border.default,
})

const editorGroupColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'editorGroup.border': p.border.default,
  'editorGroup.dropBackground': p.derived.overlays.dropBackground,
  'editorGroupHeader.noTabsBackground': p.bg.base,
  'editorGroupHeader.tabsBackground': p.bg.base,
  'editorGroupHeader.tabsBorder': p.border.default,
})

const activityBarColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'activityBar.background': p.bg.base,
  'activityBar.activeBorder': p.state.info,
  'activityBar.activeBackground': p.bg.hover,
  'activityBar.border': p.border.default,
  'activityBarBadge.background': p.state.info,
  'activityBarBadge.foreground': p.text.inverse,
})

const sideBarColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'sideBar.background': p.bg.darkenBase,
  'sideBar.border': p.border.default,
  'sideBarSectionHeader.background': p.bg.elevated,
  'sideBarSectionHeader.border': p.border.default,
})

const statusBarColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'statusBar.background': p.bg.elevated,
  'statusBar.border': p.border.default,
  'statusBar.noFolderBackground': p.bg.base,
  'statusBar.debuggingBackground': p.state.warning,
  'statusBar.debuggingForeground': p.text.inverse,
  'statusBarItem.activeBackground': p.bg.hoverActive,
  'statusBarItem.hoverBackground': p.bg.hoverMuted,
  'statusBarItem.hoverForeground': p.text.primary,
  'statusBarItem.prominentBackground': p.state.info,
  'statusBarItem.prominentForeground': p.text.inverse,
  'statusBarItem.prominentHoverBackground': p.state.infoHover,
  'statusBarItem.prominentHoverForeground': p.text.inverse,
  'statusBarItem.errorBackground': p.state.error,
  'statusBarItem.errorForeground': p.text.inverse,
  'statusBarItem.errorHoverBackground': p.state.errorHover,
  'statusBarItem.errorHoverForeground': p.text.inverse,
  'statusBarItem.warningBackground': p.state.warning,
  'statusBarItem.warningForeground': p.text.inverse,
  'statusBarItem.warningHoverBackground': p.state.warningHover,
  'statusBarItem.warningHoverForeground': p.text.inverse,
  'statusBarItem.remoteBackground': p.state.info,
  'statusBarItem.remoteForeground': p.text.inverse,
  'statusBarItem.remoteHoverBackground': p.state.infoHover,
  'statusBarItem.remoteHoverForeground': p.text.inverse,
  'statusBarItem.compactHoverBackground': p.bg.hoverSubtle,
})

const tabColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'tab.activeBackground': p.bg.elevated,
  'tab.activeForeground': p.text.primary,
  'tab.activeBorderTop': p.state.info,
  'tab.inactiveBackground': p.bg.base,
  'tab.inactiveForeground': p.text.muted,
  'tab.border': p.border.default,
  'tab.hoverBackground': p.bg.hover,
  'tab.hoverForeground': p.text.primary,
  'tab.unfocusedActiveBackground': p.bg.elevated,
  'tab.unfocusedActiveForeground': p.text.muted,
  'tab.unfocusedInactiveBackground': p.bg.base,
  'tab.unfocusedInactiveForeground': p.textOn.base.subtle,
  'tab.lastPinnedBorder': p.border.default,
})

const listColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'list.activeSelectionBackground': p.bg.selection,
  'list.activeSelectionForeground': p.text.primary,
  'list.inactiveSelectionBackground': p.bg.hover,
  'list.inactiveSelectionForeground': p.text.primary,
  'list.hoverBackground': p.bg.hover,
  'list.hoverForeground': p.text.primary,
  'list.focusBackground': p.bg.selection,
  'list.focusForeground': p.text.primary,
  'list.dropBackground': p.derived.overlays.dropBackground,
  'list.filterMatchBackground': p.derived.findMatch.highlightBackground,
  'list.filterMatchBorder': p.derived.findMatch.border,
  'list.highlightForeground': p.derived.link.foreground,
  'list.invalidItemForeground': p.state.error,
  'list.errorForeground': p.state.error,
  'list.warningForeground': p.state.warning,
  'tree.indentGuidesStroke': p.border.default,
})

const inputColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'input.background': p.bg.input,
  'input.foreground': p.text.primary,
  'input.border': p.border.default,
  'input.placeholderForeground': p.text.subtle,
  'inputOption.activeBackground': p.bg.selection,
  'inputOption.activeBorder': p.border.focus,
  'inputValidation.errorBackground': p.state.error,
  'inputValidation.errorForeground': p.text.inverse,
  'inputValidation.errorBorder': p.state.error,
  'inputValidation.infoBackground': p.state.info,
  'inputValidation.infoForeground': p.text.inverse,
  'inputValidation.infoBorder': p.state.info,
  'inputValidation.warningBackground': p.state.warning,
  'inputValidation.warningForeground': p.text.inverse,
  'inputValidation.warningBorder': p.state.warning,
})

const buttonColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'button.background': p.button.primary.background,
  'button.foreground': p.button.primary.foreground,
  'button.hoverBackground': p.button.primary.hoverBackground,
  'button.border': p.button.primary.border,
  'button.separator': p.button.primary.separator,
  'button.secondaryBackground': p.button.secondary.background,
  'button.secondaryForeground': p.button.secondary.foreground,
  'button.secondaryHoverBackground': p.button.secondary.hoverBackground,
})

const dropdownColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'dropdown.background': p.dropdown.background,
  'dropdown.foreground': p.dropdown.foreground,
  'dropdown.border': p.dropdown.border,
  'dropdown.listBackground': p.dropdown.listBackground,
})

const badgeAndProgressBarColors = (
  p: InterfacePalette
): Partial<ColorMapping> => ({
  'badge.background': p.state.info,
  'badge.foreground': p.text.inverse,
  'progressBar.background': p.state.info,
})

const panelColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'panel.background': p.bg.base,
  'panel.border': p.border.default,
  'panel.dropBorder': p.state.info,
  'panelTitle.activeBorder': p.state.info,
  'panelTitle.activeForeground': p.textOn.base.primary,
  'panelTitle.inactiveForeground': p.textOn.base.muted,
  'panelInput.border': p.border.default,
  'panelSection.border': p.border.separatorBackground,
  'panelSection.dropBackground': p.derived.overlays.dropBackground,
  'panelSectionHeader.background': p.bg.elevated,
  'panelSectionHeader.foreground': p.text.primary,
  'panelSectionHeader.border': p.border.separatorBackground,
})

const terminalColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'terminal.background': p.bg.darkenBase,
  'terminal.foreground': p.textOn.base.primary,
  'terminal.selectionBackground': p.bg.selection,
  'terminal.inactiveSelectionBackground': p.bg.hover,
  'terminal.border': p.border.default,
  'terminal.dropBackground': p.derived.overlays.dropBackground,
  'terminal.hoverHighlightBackground':
    p.derived.terminal.hoverHighlightBackground,
  'terminal.tab.activeBorder': p.state.info,
  'terminalCursor.background': p.bg.base,
  'terminalCursor.foreground': p.text.primary,
  'terminal.findMatchBackground': p.derived.findMatch.background,
  'terminal.findMatchBorder': p.derived.findMatch.border,
  'terminal.findMatchHighlightBackground':
    p.derived.findMatch.highlightBackground,
  'terminalCommandDecoration.defaultBackground': p.bg.hoverMuted,
  'terminalCommandDecoration.successBackground': p.state.success,
  'terminalCommandDecoration.errorBackground': p.state.error,
  'terminalOverviewRuler.cursorForeground': p.state.info,
  'terminalOverviewRuler.findMatchForeground': p.state.warning,
  'terminalOverviewRuler.border': p.border.default,
  'terminal.initialHintForeground': p.textOn.base.muted,
  'terminal.ansiBlack': p.derived.terminal.ansiBlack,
  'terminal.ansiRed': p.derived.terminal.ansiRed,
  'terminal.ansiGreen': p.derived.terminal.ansiGreen,
  'terminal.ansiYellow': p.derived.terminal.ansiYellow,
  'terminal.ansiBlue': p.derived.terminal.ansiBlue,
  'terminal.ansiMagenta': p.derived.terminal.ansiMagenta,
  'terminal.ansiCyan': p.derived.terminal.ansiCyan,
  'terminal.ansiWhite': p.derived.terminal.ansiWhite,
  'terminal.ansiBrightBlack': p.derived.terminal.ansiBrightBlack,
  'terminal.ansiBrightRed': p.derived.terminal.ansiBrightRed,
  'terminal.ansiBrightGreen': p.derived.terminal.ansiBrightGreen,
  'terminal.ansiBrightYellow': p.derived.terminal.ansiBrightYellow,
  'terminal.ansiBrightBlue': p.derived.terminal.ansiBrightBlue,
  'terminal.ansiBrightMagenta': p.derived.terminal.ansiBrightMagenta,
  'terminal.ansiBrightCyan': p.derived.terminal.ansiBrightCyan,
  'terminal.ansiBrightWhite': p.derived.terminal.ansiBrightWhite,
})

const linkAndQuoteColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'textLink.foreground': p.derived.link.foreground,
  'textLink.activeForeground': p.derived.link.foreground,
  'editorLink.activeForeground': p.derived.link.foreground,
  'textBlockQuote.background': p.derived.blockquote.background,
  'textBlockQuote.border': p.derived.blockquote.border,
})

const scrollbarColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'scrollbar.shadow': p.derived.shadows.scrollbar,
  'scrollbarSlider.background': p.bg.hover,
  'scrollbarSlider.hoverBackground': p.bg.active,
  'scrollbarSlider.activeBackground': p.bg.selection,
})

const notificationColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'notifications.background': p.bg.elevated,
  'notifications.foreground': p.textOn.elevated.primary,
  'notifications.border': p.border.default,
  'notificationCenter.border': p.border.default,
  'notificationCenterHeader.foreground': p.textOn.elevated.primary,
  'notificationCenterHeader.background': p.bg.elevated,
  'notificationToast.border': p.border.default,
  'notificationsErrorIcon.foreground': p.state.error,
  'notificationsWarningIcon.foreground': p.state.warning,
  'notificationsInfoIcon.foreground': p.state.info,
})

const extensionColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'extensionButton.prominentBackground': p.state.info,
  'extensionButton.prominentForeground': p.text.primary,
  'extensionButton.prominentHoverBackground': p.state.infoHover,
  'extensionBadge.remoteBackground': p.state.info,
  'extensionBadge.remoteForeground': p.text.inverse,
})

const gitColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'gitDecoration.addedResourceForeground': p.state.success,
  'gitDecoration.modifiedResourceForeground': p.state.info,
  'gitDecoration.deletedResourceForeground': p.state.error,
  'gitDecoration.untrackedResourceForeground': p.state.success,
  'gitDecoration.ignoredResourceForeground': p.text.inactive,
  'gitDecoration.conflictingResourceForeground': p.state.warning,
  'gitDecoration.renamedResourceForeground': p.git.renamedResourceForeground,
  'gitDecoration.stageModifiedResourceForeground':
    p.git.stageModifiedResourceForeground,
  'gitDecoration.stageDeletedResourceForeground':
    p.git.stageDeletedResourceForeground,
  'gitDecoration.submoduleResourceForeground': p.text.muted,
})

const scmGraphColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'scmGraph.historyItemHoverLabelForeground': p.scmGraph.label.hoverForeground,
  'scmGraph.historyItemHoverDefaultLabelForeground':
    p.scmGraph.label.hoverForeground,
  'scmGraph.historyItemHoverDefaultLabelBackground':
    p.scmGraph.label.hoverBackground,
  'scmGraph.foreground1': p.scmGraph.foreground1,
  'scmGraph.foreground2': p.scmGraph.foreground2,
  'scmGraph.foreground3': p.scmGraph.foreground3,
  'scmGraph.foreground4': p.scmGraph.foreground4,
  'scmGraph.foreground5': p.scmGraph.foreground5,
  'scmGraph.historyItemHoverAdditionsForeground':
    p.scmGraph.historyItemHoverAdditionsForeground,
  'scmGraph.historyItemHoverDeletionsForeground':
    p.scmGraph.historyItemHoverDeletionsForeground,
  'scmGraph.historyItemRefColor': p.scmGraph.historyItemRefColor,
  'scmGraph.historyItemRemoteRefColor': p.scmGraph.historyItemRemoteRefColor,
  'scmGraph.historyItemBaseRefColor': p.scmGraph.historyItemBaseRefColor,
})

const diffEditorColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'diffEditor.insertedTextBackground': p.diff.insertedTextBackground,
  'diffEditor.removedTextBackground': p.diff.removedTextBackground,
  'diffEditor.insertedLineBackground': p.diff.insertedLineBackground,
  'diffEditor.removedLineBackground': p.diff.removedLineBackground,
  'diffEditor.diagonalFill': p.bg.overlay,
})

const settingsColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'settings.modifiedItemIndicator': p.state.info,
  'settings.dropdownBackground': p.dropdown.background,
  'settings.dropdownForeground': p.dropdown.foreground,
  'settings.dropdownBorder': p.dropdown.border,
  'settings.checkboxBackground': p.bg.elevated,
  'settings.checkboxForeground': p.text.primary,
  'settings.checkboxBorder': p.border.default,
  'settings.textInputBackground': p.bg.input,
  'settings.textInputForeground': p.text.primary,
  'settings.textInputBorder': p.border.default,
  'settings.numberInputBackground': p.bg.input,
  'settings.numberInputForeground': p.text.primary,
  'settings.numberInputBorder': p.border.default,
})

const breadcrumbColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'breadcrumb.foreground': p.text.muted,
  'breadcrumb.background': p.bg.base,
  'breadcrumb.focusForeground': p.textOn.base.primary,
  'breadcrumb.activeSelectionForeground': p.textOn.base.primary,
  'breadcrumbPicker.background': p.bg.elevated,
})

const widgetColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'widget.border': p.border.separatorBackground,
})

const peekViewColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'peekView.border': p.border.focus,
  'peekViewEditor.background': p.bg.elevated,
  'peekViewEditor.matchHighlightBackground':
    p.derived.peekView.matchHighlightBackground,
  'peekViewResult.background': p.bg.base,
  'peekViewResult.matchHighlightBackground':
    p.derived.peekView.matchHighlightBackground,
  'peekViewResult.selectionBackground': p.derived.peekView.selectionBackground,
  'peekViewTitle.background': p.bg.overlay,
  'peekViewTitleDescription.foreground': p.textOn.overlay.muted,
  'peekViewTitleLabel.foreground': p.textOn.overlay.primary,
})

const editorWidgetColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'editorWidget.background': p.bg.elevated,
  'editorWidget.border': p.border.separatorBackground,
  'editorWidget.resizeBorder': p.border.focus,
})

const editorSuggestWidgetColors = (
  p: InterfacePalette
): Partial<ColorMapping> => ({
  'editorSuggestWidget.background': p.bg.overlay,
  'editorSuggestWidget.border': p.border.default,
  'editorSuggestWidget.highlightForeground': p.state.info,
  'editorSuggestWidget.selectedBackground': p.bg.selection,
  'editorSuggestWidget.selectedForeground': p.text.primary,
  'editorSuggestWidget.selectedIconForeground': p.text.primary,
})

const editorHoverWidgetColors = (
  p: InterfacePalette
): Partial<ColorMapping> => ({
  'editorHoverWidget.background': p.bg.overlay,
  'editorHoverWidget.border': p.border.separatorBackground,
  'editorHoverWidget.foreground': p.textOn.overlay.primary,
  'editorHoverWidget.highlightForeground': p.state.info,
  'editorHoverWidget.statusBarBackground': p.bg.overlay,
})

const debugColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'debugExceptionWidget.background': p.state.error,
  'debugExceptionWidget.border': p.state.error,
  'debugToolBar.background': p.bg.elevated,
  'debugToolBar.border': p.border.default,
  'debugIcon.breakpointForeground': p.state.error,
  'debugIcon.breakpointDisabledForeground': p.text.inactive,
  'debugIcon.breakpointUnverifiedForeground': p.text.muted,
  'debugIcon.breakpointCurrentStackframeForeground': p.state.warning,
  'debugIcon.breakpointStackframeForeground': p.state.info,
  'debugIcon.startForeground': p.state.success,
  'debugIcon.pauseForeground': p.state.info,
  'debugIcon.stopForeground': p.state.error,
  'debugIcon.disconnectForeground': p.state.error,
  'debugIcon.restartForeground': p.state.success,
  'debugIcon.stepOverForeground': p.state.info,
  'debugIcon.stepIntoForeground': p.state.info,
  'debugIcon.stepOutForeground': p.state.info,
  'debugIcon.continueForeground': p.state.success,
  'debugIcon.stepBackForeground': p.state.info,
  'debugConsole.infoForeground': p.state.info,
  'debugConsole.warningForeground': p.state.warning,
  'debugConsole.errorForeground': p.state.error,
  'debugConsole.sourceForeground': p.text.primary,
  'debugConsoleInputIcon.foreground': p.text.primary,
})

const testingColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'testing.iconFailed': p.state.error,
  'testing.iconErrored': p.state.error,
  'testing.iconPassed': p.state.success,
  'testing.runAction': p.state.success,
  'testing.iconQueued': p.state.warning,
  'testing.iconUnset': p.text.muted,
  'testing.iconSkipped': p.text.inactive,
  'testing.peekBorder': p.border.focus,
  'testing.peekHeaderBackground': p.bg.overlay,
})

const mergeAndMinimapColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'merge.border': p.border.default,
  'editorOverviewRuler.border': p.border.default,
  'editorOverviewRuler.findMatchForeground': p.state.warning,
  'editorOverviewRuler.rangeHighlightForeground': p.state.info,
  'editorOverviewRuler.selectionHighlightForeground': p.bg.selection,
  'editorOverviewRuler.wordHighlightForeground': p.bg.hover,
  'editorOverviewRuler.wordHighlightStrongForeground': p.bg.selection,
  'editorOverviewRuler.modifiedForeground': p.state.info,
  'editorOverviewRuler.addedForeground': p.state.success,
  'editorOverviewRuler.deletedForeground': p.state.error,
  'editorOverviewRuler.errorForeground': p.state.error,
  'editorOverviewRuler.warningForeground': p.state.warning,
  'editorOverviewRuler.infoForeground': p.state.info,
  'editorOverviewRuler.bracketMatchForeground': p.border.focus,
  'minimap.findMatchHighlight': p.minimap.findMatchHighlight,
  'minimap.selectionHighlight': p.bg.selection,
  'minimap.errorHighlight': p.state.error,
  'minimap.warningHighlight': p.state.warning,
  'minimap.background': p.bg.base,
  'minimap.selectionOccurrenceHighlight': p.bg.hover,
  'minimapSlider.background': p.bg.hover,
  'minimapSlider.hoverBackground': p.bg.active,
  'minimapSlider.activeBackground': p.bg.selection,
  'minimapGutter.addedBackground': p.state.success,
  'minimapGutter.modifiedBackground': p.state.info,
  'minimapGutter.deletedBackground': p.state.error,
})

const searchEditorAndProblemsColors = (
  p: InterfacePalette
): Partial<ColorMapping> => ({
  'searchEditor.findMatchBackground': p.derived.findMatch.highlightBackground,
  'searchEditor.findMatchBorder': p.derived.findMatch.border,
  'problemsErrorIcon.foreground': p.state.error,
  'problemsWarningIcon.foreground': p.state.warning,
  'problemsInfoIcon.foreground': p.state.info,
})

const chartsAndPortsColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'charts.foreground': p.charts.foreground,
  'charts.lines': p.charts.lines,
  'charts.red': p.charts.red,
  'charts.blue': p.charts.blue,
  'charts.yellow': p.charts.yellow,
  'charts.orange': p.charts.orange,
  'charts.green': p.charts.green,
  'charts.purple': p.charts.purple,
  'ports.iconRunningProcessForeground': p.state.success,
})

const checkboxAndToolbarColors = (
  p: InterfacePalette
): Partial<ColorMapping> => ({
  'checkbox.background': p.bg.elevated,
  'checkbox.foreground': p.text.primary,
  'checkbox.border': p.border.default,
  'toolbar.hoverBackground': p.bg.hover,
  'toolbar.hoverOutline': p.border.focus,
  'toolbar.activeBackground': p.bg.selection,
})

const inlineChatColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'inlineChat.background': p.derived.inlineChat.background,
  'inlineChat.foreground': p.derived.inlineChat.foreground,
  'inlineChat.border': p.border.default,
})

const iconAndKeybindingColors = (
  p: InterfacePalette
): Partial<ColorMapping> => ({
  'icon.foreground': p.text.muted,
  'keybindingLabel.background': p.bg.elevated,
  'keybindingLabel.border': p.border.default,
  'keybindingLabel.bottomBorder': p.border.default,
})

const welcomePageColors = (p: InterfacePalette): Partial<ColorMapping> => ({
  'welcomePage.background': p.bg.base,
  'welcomePage.progress.background': p.bg.elevated,
  'welcomePage.progress.foreground': p.state.info,
  'welcomePage.tileBackground': p.bg.elevated,
  'welcomePage.tileHoverBackground': p.bg.hover,
  'welcomePage.tileBorder': p.border.default,
  'walkThrough.embeddedEditorBackground': p.bg.elevated,
})

export const colorMappings = (
  palette: InterfacePalette
): Record<string, string> => ({
  ...baseColors(palette),
  ...titleBarColors(palette),
  ...menuColors(palette),
  ...commandCenterColors(palette),
  ...editorColors(palette),
  ...editorGroupColors(palette),
  ...activityBarColors(palette),
  ...sideBarColors(palette),
  ...statusBarColors(palette),
  ...tabColors(palette),
  ...listColors(palette),
  ...inputColors(palette),
  ...buttonColors(palette),
  ...dropdownColors(palette),
  ...badgeAndProgressBarColors(palette),
  ...panelColors(palette),
  ...terminalColors(palette),
  ...linkAndQuoteColors(palette),
  ...scrollbarColors(palette),
  ...notificationColors(palette),
  ...extensionColors(palette),
  ...gitColors(palette),
  ...scmGraphColors(palette),
  ...diffEditorColors(palette),
  ...settingsColors(palette),
  ...breadcrumbColors(palette),
  ...widgetColors(palette),
  ...peekViewColors(palette),
  ...editorWidgetColors(palette),
  ...editorSuggestWidgetColors(palette),
  ...editorHoverWidgetColors(palette),
  ...debugColors(palette),
  ...testingColors(palette),
  ...mergeAndMinimapColors(palette),
  ...searchEditorAndProblemsColors(palette),
  ...chartsAndPortsColors(palette),
  ...checkboxAndToolbarColors(palette),
  ...inlineChatColors(palette),
  ...iconAndKeybindingColors(palette),
  ...welcomePageColors(palette),
})
