/**
 * Генератор финальной темы VS Code
 */
import { interfacePalette } from '../core/interface'
import { withAlpha } from '../core/utils'
import { generateTokenColors, generateSemanticTokens } from './tokens'
import type { VSCodeTheme } from '../types/theme'

/**
 * Генерация всех цветов интерфейса VS Code
 */
const generateInterfaceColors = () => ({
  // Основные цвета
  'foreground': interfacePalette.text.primary,
  'descriptionForeground': interfacePalette.text.muted,
  'disabledForeground': interfacePalette.text.inactive,
  'focusBorder': interfacePalette.border.focus,
  'errorForeground': interfacePalette.state.error,
  'selection.background': interfacePalette.bg.selection,
  'widget.shadow': interfacePalette.bg.overlay,
  
  // Title Bar (главное меню)
  'titleBar.activeBackground': interfacePalette.bg.base,
  'titleBar.activeForeground': interfacePalette.text.primary,
  'titleBar.inactiveBackground': interfacePalette.bg.base,
  'titleBar.inactiveForeground': interfacePalette.text.muted,
  'titleBar.border': interfacePalette.border.default,
  
  // Menu Bar
  'menubar.selectionForeground': interfacePalette.text.primary,
  'menubar.selectionBackground': interfacePalette.bg.hover,
  'menubar.selectionBorder': interfacePalette.border.focus,
  
  // Menu (контекстное меню)
  'menu.foreground': interfacePalette.text.primary,
  'menu.background': interfacePalette.bg.elevated,
  'menu.selectionForeground': interfacePalette.text.primary,
  'menu.selectionBackground': interfacePalette.bg.selection,
  'menu.selectionBorder': interfacePalette.border.focus,
  'menu.separatorBackground': interfacePalette.border.default,
  'menu.border': interfacePalette.border.default,
  
  // Command Center & Quick Input (командная панель)
  'commandCenter.foreground': interfacePalette.text.muted,
  'commandCenter.activeForeground': interfacePalette.text.primary,
  'commandCenter.background': interfacePalette.bg.base,
  'commandCenter.activeBackground': interfacePalette.bg.hover,
  'commandCenter.border': interfacePalette.border.default,
  'quickInput.background': interfacePalette.bg.elevated,
  'quickInput.foreground': interfacePalette.text.primary,
  'quickInputTitle.background': interfacePalette.bg.overlay,
  'quickInputList.focusBackground': interfacePalette.bg.selection,
  'quickInputList.focusForeground': interfacePalette.text.primary,
  
  // Редактор
  'editor.background': interfacePalette.bg.base,
  'editor.foreground': interfacePalette.text.primary,
  'editor.selectionBackground': interfacePalette.bg.selection,
  'editor.selectionForeground': interfacePalette.text.primary,
  'editor.inactiveSelectionBackground': interfacePalette.bg.hover,
  'editor.lineHighlightBackground': interfacePalette.bg.hover,
  // 'editor.lineHighlightBorder': удалено (transparent недопустим),
  'editor.findMatchBackground': interfacePalette.state.warning,
  'editor.findMatchHighlightBackground': interfacePalette.bg.selection,
  'editor.wordHighlightBackground': interfacePalette.bg.hover,
  'editor.wordHighlightStrongBackground': interfacePalette.bg.selection,
  'editor.hoverHighlightBackground': interfacePalette.bg.hover,
  'editor.rangeHighlightBackground': interfacePalette.bg.hover,
  'editorBracketMatch.background': interfacePalette.bg.hover,
  'editorBracketMatch.border': interfacePalette.border.focus,
  'editorCursor.foreground': interfacePalette.text.primary,
  'editorWhitespace.foreground': interfacePalette.text.subtle,
  'editorIndentGuide.background1': interfacePalette.border.default,
  'editorIndentGuide.activeBackground1': interfacePalette.border.focus,
  'editorLineNumber.foreground': interfacePalette.text.subtle,
  'editorLineNumber.activeForeground': interfacePalette.text.muted,
  'editorRuler.foreground': interfacePalette.border.default,
  
  // Editor Groups
  'editorGroup.border': interfacePalette.border.default,
  'editorGroup.dropBackground': interfacePalette.bg.overlay,
  'editorGroupHeader.noTabsBackground': interfacePalette.bg.base,
  'editorGroupHeader.tabsBackground': interfacePalette.bg.base,
  'editorGroupHeader.tabsBorder': interfacePalette.border.default,
  
  // Activity Bar
  'activityBar.background': interfacePalette.bg.base,
  'activityBar.foreground': interfacePalette.text.muted,
  'activityBar.activeBorder': interfacePalette.state.info,
  'activityBar.activeBackground': interfacePalette.bg.hover,
  'activityBar.inactiveForeground': interfacePalette.text.inactive,
  'activityBar.border': interfacePalette.border.default,
  'activityBarBadge.background': interfacePalette.state.info,
  'activityBarBadge.foreground': interfacePalette.bg.base,
  
  // Side Bar
  'sideBar.background': interfacePalette.bg.base,
  'sideBar.foreground': interfacePalette.text.primary,
  'sideBar.border': interfacePalette.border.default,
  'sideBarTitle.foreground': interfacePalette.text.primary,
  'sideBarSectionHeader.background': interfacePalette.bg.elevated,
  'sideBarSectionHeader.foreground': interfacePalette.text.primary,
  'sideBarSectionHeader.border': interfacePalette.border.default,
  
  // Status Bar
  'statusBar.background': interfacePalette.bg.base,
  'statusBar.foreground': interfacePalette.text.muted,
  'statusBar.border': interfacePalette.border.default,
  'statusBar.noFolderBackground': interfacePalette.bg.base,
  'statusBar.debuggingBackground': interfacePalette.state.warning,
  'statusBar.debuggingForeground': interfacePalette.bg.base,
  'statusBarItem.activeBackground': interfacePalette.bg.selection,
  'statusBarItem.hoverBackground': interfacePalette.bg.hover,
  'statusBarItem.prominentBackground': interfacePalette.state.info,
  'statusBarItem.prominentForeground': interfacePalette.bg.base,
  'statusBarItem.prominentHoverBackground': interfacePalette.state.info,
  'statusBarItem.errorBackground': interfacePalette.state.error,
  'statusBarItem.errorForeground': interfacePalette.bg.base,
  'statusBarItem.warningBackground': interfacePalette.state.warning,
  'statusBarItem.warningForeground': interfacePalette.bg.base,
  
  // Tabs
  'tab.activeBackground': interfacePalette.bg.elevated,
  'tab.activeForeground': interfacePalette.text.primary,
  // 'tab.activeBorder': удалено (transparent недопустим),
  'tab.activeBorderTop': interfacePalette.state.info,
  'tab.inactiveBackground': interfacePalette.bg.base,
  'tab.inactiveForeground': interfacePalette.text.muted,
  'tab.border': interfacePalette.border.default,
  'tab.hoverBackground': interfacePalette.bg.hover,
  'tab.hoverForeground': interfacePalette.text.primary,
  // 'tab.hoverBorder': удалено (transparent недопустим),
  'tab.unfocusedActiveBackground': interfacePalette.bg.elevated,
  'tab.unfocusedActiveForeground': interfacePalette.text.muted,
  'tab.unfocusedInactiveBackground': interfacePalette.bg.base,
  'tab.unfocusedInactiveForeground': interfacePalette.text.inactive,
  'tab.lastPinnedBorder': interfacePalette.border.default,
  
  // Lists
  'list.activeSelectionBackground': interfacePalette.bg.selection,
  'list.activeSelectionForeground': interfacePalette.text.primary,
  'list.inactiveSelectionBackground': interfacePalette.bg.hover,
  'list.inactiveSelectionForeground': interfacePalette.text.primary,
  'list.hoverBackground': interfacePalette.bg.hover,
  'list.hoverForeground': interfacePalette.text.primary,
  'list.focusBackground': interfacePalette.bg.selection,
  'list.focusForeground': interfacePalette.text.primary,
  'list.dropBackground': interfacePalette.bg.overlay,
  'list.highlightForeground': interfacePalette.state.info,
  'list.invalidItemForeground': interfacePalette.state.error,
  'list.errorForeground': interfacePalette.state.error,
  'list.warningForeground': interfacePalette.state.warning,
  
  // Tree
  'tree.indentGuidesStroke': interfacePalette.border.default,
  
  // Input
  'input.background': interfacePalette.bg.input,
  'input.foreground': interfacePalette.text.primary,
  'input.border': interfacePalette.border.default,
  'input.placeholderForeground': interfacePalette.text.subtle,
  'inputOption.activeBackground': interfacePalette.bg.selection,
  'inputOption.activeBorder': interfacePalette.border.focus,
  'inputValidation.errorBackground': interfacePalette.state.error,
  'inputValidation.errorForeground': interfacePalette.bg.base,
  'inputValidation.errorBorder': interfacePalette.state.error,
  'inputValidation.infoBackground': interfacePalette.state.info,
  'inputValidation.infoForeground': interfacePalette.bg.base,
  'inputValidation.infoBorder': interfacePalette.state.info,
  'inputValidation.warningBackground': interfacePalette.state.warning,
  'inputValidation.warningForeground': interfacePalette.bg.base,
  'inputValidation.warningBorder': interfacePalette.state.warning,
  
  // Button
  'button.background': interfacePalette.state.info,
  'button.foreground': interfacePalette.bg.base,
  'button.hoverBackground': interfacePalette.state.info,
  // 'button.border': удалено (transparent недопустим),
  'button.separator': interfacePalette.border.default,
  'button.secondaryBackground': interfacePalette.bg.elevated,
  'button.secondaryForeground': interfacePalette.text.primary,
  'button.secondaryHoverBackground': interfacePalette.bg.hover,
  
  // Dropdown
  'dropdown.background': interfacePalette.bg.elevated,
  'dropdown.foreground': interfacePalette.text.primary,
  'dropdown.border': interfacePalette.border.default,
  'dropdown.listBackground': interfacePalette.bg.elevated,
  
  // Badge
  'badge.background': interfacePalette.state.info,
  'badge.foreground': interfacePalette.bg.base,
  
  // Progress Bar
  'progressBar.background': interfacePalette.state.info,
  
  // Panel
  'panel.background': interfacePalette.bg.base,
  'panel.border': interfacePalette.border.default,
  'panel.dropBorder': interfacePalette.state.info,
  'panelTitle.activeBorder': interfacePalette.state.info,
  'panelTitle.activeForeground': interfacePalette.text.primary,
  'panelTitle.inactiveForeground': interfacePalette.text.muted,
  'panelInput.border': interfacePalette.border.default,
  'panelSection.border': interfacePalette.border.default,
  'panelSection.dropBackground': interfacePalette.bg.overlay,
  'panelSectionHeader.background': interfacePalette.bg.elevated,
  'panelSectionHeader.foreground': interfacePalette.text.primary,
  'panelSectionHeader.border': interfacePalette.border.default,
  
  // Terminal
  'terminal.background': interfacePalette.bg.base,
  'terminal.foreground': interfacePalette.text.primary,
  'terminal.selectionBackground': interfacePalette.bg.selection,
  'terminal.border': interfacePalette.border.default,
  'terminal.dropBackground': interfacePalette.bg.overlay,
  'terminal.tab.activeBorder': interfacePalette.state.info,
  'terminalCursor.background': interfacePalette.bg.base,
  'terminalCursor.foreground': interfacePalette.text.primary,
  
  // Scrollbar
  'scrollbar.shadow': interfacePalette.bg.overlay,
  'scrollbarSlider.background': interfacePalette.bg.hover,
  'scrollbarSlider.hoverBackground': interfacePalette.bg.active,
  'scrollbarSlider.activeBackground': interfacePalette.bg.selection,
  
  // Notifications
  'notifications.background': interfacePalette.bg.elevated,
  'notifications.foreground': interfacePalette.text.primary,
  'notifications.border': interfacePalette.border.default,
  'notificationCenter.border': interfacePalette.border.default,
  'notificationCenterHeader.foreground': interfacePalette.text.primary,
  'notificationCenterHeader.background': interfacePalette.bg.elevated,
  'notificationToast.border': interfacePalette.border.default,
  'notificationsErrorIcon.foreground': interfacePalette.state.error,
  'notificationsWarningIcon.foreground': interfacePalette.state.warning,
  'notificationsInfoIcon.foreground': interfacePalette.state.info,
  
  // Extensions
  'extensionButton.prominentBackground': interfacePalette.state.info,
  'extensionButton.prominentForeground': interfacePalette.bg.base,
  'extensionButton.prominentHoverBackground': interfacePalette.state.info,
  'extensionBadge.remoteBackground': interfacePalette.state.info,
  'extensionBadge.remoteForeground': interfacePalette.bg.base,
  
  // Git
  'gitDecoration.addedResourceForeground': interfacePalette.state.success,
  'gitDecoration.modifiedResourceForeground': interfacePalette.state.info,
  'gitDecoration.deletedResourceForeground': interfacePalette.state.error,
  'gitDecoration.untrackedResourceForeground': interfacePalette.state.success,
  'gitDecoration.ignoredResourceForeground': interfacePalette.text.inactive,
  'gitDecoration.conflictingResourceForeground': interfacePalette.state.warning,
  'gitDecoration.submoduleResourceForeground': interfacePalette.text.muted,
  
  // Diff Editor
  'diffEditor.insertedTextBackground': withAlpha(interfacePalette.state.success, 0.15),
  'diffEditor.removedTextBackground': withAlpha(interfacePalette.state.error, 0.15),
  'diffEditor.insertedLineBackground': withAlpha(interfacePalette.state.success, 0.1),
  'diffEditor.removedLineBackground': withAlpha(interfacePalette.state.error, 0.1),
  'diffEditor.diagonalFill': interfacePalette.bg.overlay,
  
  // Settings
  'settings.headerForeground': interfacePalette.text.primary,
  'settings.modifiedItemIndicator': interfacePalette.state.info,
  'settings.dropdownBackground': interfacePalette.bg.elevated,
  'settings.dropdownForeground': interfacePalette.text.primary,
  'settings.dropdownBorder': interfacePalette.border.default,
  'settings.checkboxBackground': interfacePalette.bg.elevated,
  'settings.checkboxForeground': interfacePalette.text.primary,
  'settings.checkboxBorder': interfacePalette.border.default,
  'settings.textInputBackground': interfacePalette.bg.input,
  'settings.textInputForeground': interfacePalette.text.primary,
  'settings.textInputBorder': interfacePalette.border.default,
  'settings.numberInputBackground': interfacePalette.bg.input,
  'settings.numberInputForeground': interfacePalette.text.primary,
  'settings.numberInputBorder': interfacePalette.border.default,
  
  // Breadcrumbs
  'breadcrumb.foreground': interfacePalette.text.muted,
  'breadcrumb.background': interfacePalette.bg.base,
  'breadcrumb.focusForeground': interfacePalette.text.primary,
  'breadcrumb.activeSelectionForeground': interfacePalette.text.primary,
  'breadcrumbPicker.background': interfacePalette.bg.elevated,
  
  // Widgets
  'widget.border': interfacePalette.border.default,
  // 'widget.foreground': удалено (запрещенное свойство),
  
  // Peek View Widget
  'peekView.border': interfacePalette.border.focus,
  'peekViewEditor.background': interfacePalette.bg.elevated,
  'peekViewEditor.matchHighlightBackground': interfacePalette.bg.selection,
  'peekViewResult.background': interfacePalette.bg.base,
  'peekViewResult.fileForeground': interfacePalette.text.primary,
  'peekViewResult.lineForeground': interfacePalette.text.muted,
  'peekViewResult.matchHighlightBackground': interfacePalette.bg.selection,
  'peekViewResult.selectionBackground': interfacePalette.bg.selection,
  'peekViewResult.selectionForeground': interfacePalette.text.primary,
  'peekViewTitle.background': interfacePalette.bg.overlay,
  'peekViewTitleDescription.foreground': interfacePalette.text.muted,
  'peekViewTitleLabel.foreground': interfacePalette.text.primary,
  
  // Editor Widget
  'editorWidget.background': interfacePalette.bg.elevated,
  'editorWidget.foreground': interfacePalette.text.primary,
  'editorWidget.border': interfacePalette.border.default,
  'editorWidget.resizeBorder': interfacePalette.border.focus,
  
  // Editor Suggest Widget
  'editorSuggestWidget.background': interfacePalette.bg.elevated,
  'editorSuggestWidget.border': interfacePalette.border.default,
  'editorSuggestWidget.foreground': interfacePalette.text.primary,
  'editorSuggestWidget.highlightForeground': interfacePalette.state.info,
  'editorSuggestWidget.selectedBackground': interfacePalette.bg.selection,
  'editorSuggestWidget.selectedForeground': interfacePalette.text.primary,
  'editorSuggestWidget.selectedIconForeground': interfacePalette.text.primary,
  'editorSuggestWidgetStatus.foreground': interfacePalette.text.muted,
  
  // Editor Hover Widget
  'editorHoverWidget.background': interfacePalette.bg.elevated,
  'editorHoverWidget.border': interfacePalette.border.default,
  'editorHoverWidget.foreground': interfacePalette.text.primary,
  'editorHoverWidget.highlightForeground': interfacePalette.state.info,
  'editorHoverWidget.statusBarBackground': interfacePalette.bg.overlay,
  
  // Debug Exception Widget
  'debugExceptionWidget.background': interfacePalette.state.error,
  'debugExceptionWidget.border': interfacePalette.state.error,
  
  // Editor Marker Navigation
  'editorMarkerNavigation.background': interfacePalette.bg.elevated,
  'editorMarkerNavigationError.background': interfacePalette.state.error,
  'editorMarkerNavigationWarning.background': interfacePalette.state.warning,
  'editorMarkerNavigationInfo.background': interfacePalette.state.info,
  
  // Merge Conflicts (удалены устаревшие свойства)
  'merge.border': interfacePalette.border.default,
  
  // Editor Overview Ruler
  'editorOverviewRuler.border': interfacePalette.border.default,
  'editorOverviewRuler.findMatchForeground': interfacePalette.state.warning,
  'editorOverviewRuler.rangeHighlightForeground': interfacePalette.state.info,
  'editorOverviewRuler.selectionHighlightForeground': interfacePalette.bg.selection,
  'editorOverviewRuler.wordHighlightForeground': interfacePalette.bg.hover,
  'editorOverviewRuler.wordHighlightStrongForeground': interfacePalette.bg.selection,
  'editorOverviewRuler.modifiedForeground': interfacePalette.state.info,
  'editorOverviewRuler.addedForeground': interfacePalette.state.success,
  'editorOverviewRuler.deletedForeground': interfacePalette.state.error,
  'editorOverviewRuler.errorForeground': interfacePalette.state.error,
  'editorOverviewRuler.warningForeground': interfacePalette.state.warning,
  'editorOverviewRuler.infoForeground': interfacePalette.state.info,
  'editorOverviewRuler.bracketMatchForeground': interfacePalette.border.focus,
  
  // Minimap
  'minimap.findMatchHighlight': interfacePalette.state.warning,
  'minimap.selectionHighlight': interfacePalette.bg.selection,
  'minimap.errorHighlight': interfacePalette.state.error,
  'minimap.warningHighlight': interfacePalette.state.warning,
  'minimap.background': interfacePalette.bg.base,
  'minimap.selectionOccurrenceHighlight': interfacePalette.bg.hover,
  'minimapSlider.background': interfacePalette.bg.hover,
  'minimapSlider.hoverBackground': interfacePalette.bg.active,
  'minimapSlider.activeBackground': interfacePalette.bg.selection,
  'minimapGutter.addedBackground': interfacePalette.state.success,
  'minimapGutter.modifiedBackground': interfacePalette.state.info,
  'minimapGutter.deletedBackground': interfacePalette.state.error,
  
  // Problem Matcher
  'problemsErrorIcon.foreground': interfacePalette.state.error,
  'problemsWarningIcon.foreground': interfacePalette.state.warning,
  'problemsInfoIcon.foreground': interfacePalette.state.info,
  
  // Charts (для расширений)
  'charts.foreground': interfacePalette.text.primary,
  'charts.lines': interfacePalette.border.default,
  'charts.red': interfacePalette.state.error,
  'charts.blue': interfacePalette.state.info,
  'charts.yellow': interfacePalette.state.warning,
  'charts.orange': interfacePalette.state.warning,
  'charts.green': interfacePalette.state.success,
  'charts.purple': interfacePalette.state.info,
  
  // Ports
  'ports.iconRunningProcessForeground': interfacePalette.state.success,
  
  // Checkbox
  'checkbox.background': interfacePalette.bg.elevated,
  'checkbox.foreground': interfacePalette.text.primary,
  'checkbox.border': interfacePalette.border.default,
  
  // Toolbar
  'toolbar.hoverBackground': interfacePalette.bg.hover,
  'toolbar.hoverOutline': interfacePalette.border.focus,
  'toolbar.activeBackground': interfacePalette.bg.selection,
  
  // Icon
  'icon.foreground': interfacePalette.text.muted,
  
  // Keybinding
  'keybindingLabel.background': interfacePalette.bg.elevated,
  'keybindingLabel.foreground': interfacePalette.text.primary,
  'keybindingLabel.border': interfacePalette.border.default,
  'keybindingLabel.bottomBorder': interfacePalette.border.default,
  
  // Welcome Page
  'welcomePage.background': interfacePalette.bg.base,
  'welcomePage.progress.background': interfacePalette.bg.elevated,
  'welcomePage.progress.foreground': interfacePalette.state.info,
  'welcomePage.tileBackground': interfacePalette.bg.elevated,
  'welcomePage.tileHoverBackground': interfacePalette.bg.hover,
  'welcomePage.tileBorder': interfacePalette.border.default,
  
  // Walkthrough
  'walkThrough.embeddedEditorBackground': interfacePalette.bg.elevated,
  
  // Debug
  'debugToolBar.background': interfacePalette.bg.elevated,
  'debugToolBar.border': interfacePalette.border.default,
  'debugIcon.breakpointForeground': interfacePalette.state.error,
  'debugIcon.breakpointDisabledForeground': interfacePalette.text.inactive,
  'debugIcon.breakpointUnverifiedForeground': interfacePalette.text.muted,
  'debugIcon.breakpointCurrentStackframeForeground': interfacePalette.state.warning,
  'debugIcon.breakpointStackframeForeground': interfacePalette.state.info,
  'debugIcon.startForeground': interfacePalette.state.success,
  'debugIcon.pauseForeground': interfacePalette.state.info,
  'debugIcon.stopForeground': interfacePalette.state.error,
  'debugIcon.disconnectForeground': interfacePalette.state.error,
  'debugIcon.restartForeground': interfacePalette.state.success,
  'debugIcon.stepOverForeground': interfacePalette.state.info,
  'debugIcon.stepIntoForeground': interfacePalette.state.info,
  'debugIcon.stepOutForeground': interfacePalette.state.info,
  'debugIcon.continueForeground': interfacePalette.state.success,
  'debugIcon.stepBackForeground': interfacePalette.state.info,
  'debugConsole.infoForeground': interfacePalette.state.info,
  'debugConsole.warningForeground': interfacePalette.state.warning,
  'debugConsole.errorForeground': interfacePalette.state.error,
  'debugConsole.sourceForeground': interfacePalette.text.primary,
  'debugConsoleInputIcon.foreground': interfacePalette.text.primary,
  
  // Testing
  'testing.iconFailed': interfacePalette.state.error,
  'testing.iconErrored': interfacePalette.state.error,
  'testing.iconPassed': interfacePalette.state.success,
  'testing.runAction': interfacePalette.state.success,
  'testing.iconQueued': interfacePalette.state.warning,
  'testing.iconUnset': interfacePalette.text.muted,
  'testing.iconSkipped': interfacePalette.text.inactive,
  'testing.peekBorder': interfacePalette.border.focus,
  'testing.peekHeaderBackground': interfacePalette.bg.overlay,
  // Удалены запрещенные testing.message.* свойства
})

/**
 * Генерация финальной темы
 */
export const generateTheme = (): VSCodeTheme => ({
  name: 'Tokyo Night Dark',
  type: 'dark',
  colors: generateInterfaceColors(),
  tokenColors: generateTokenColors(),
  semanticTokenColors: generateSemanticTokens(),
})