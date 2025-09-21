# Token Registry

Автогенерируемая таблица соответствия VS Code color tokens → поверхность/политики/подсказки контраста.

| Token | Surface | Alpha | Deprecated | Alias Of | BG Key | Contrast Hints | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| editorGroup.dropBackground | base | transparent |  |  |  |  |  |
| panelSection.dropBackground | panel | transparent |  |  |  |  |  |
| terminal.dropBackground | terminal | transparent |  |  |  |  |  |
| list.dropBackground | list | transparent |  |  |  |  |  |
| editor.hoverHighlightBackground | base | transparent |  |  |  |  |  |
| terminal.hoverHighlightBackground | terminal | transparent |  |  |  |  |  |
| editor.selectionBackground | base | transparent |  |  |  |  |  |
| list.activeSelectionBackground | list | transparent |  |  |  |  |  |
| list.inactiveSelectionBackground | list | transparent |  |  |  |  |  |
| editor.inactiveSelectionBackground | base | transparent |  |  |  |  |  |
| menubar.selectionBackground | menu | transparent |  |  |  |  |  |
| menu.selectionBackground | menu | transparent |  |  |  |  |  |
| scrollbarSlider.background | base | transparent |  |  |  |  |  |
| scrollbarSlider.hoverBackground | base | transparent |  |  |  |  |  |
| scrollbarSlider.activeBackground | base | transparent |  |  |  |  |  |
| minimapSlider.background | base | transparent |  |  |  |  |  |
| minimapSlider.hoverBackground | base | transparent |  |  |  |  |  |
| minimapSlider.activeBackground | base | transparent |  |  |  |  |  |
| list.filterMatchBackground | list | transparent |  |  |  |  |  |
| searchEditor.findMatchBackground | editor | transparent |  |  |  |  |  |
| editor.findMatchHighlightBackground | base | transparent |  |  |  |  |  |
| terminal.findMatchHighlightBackground | terminal | transparent |  |  |  |  |  |
| searchEditor.findMatchBackground | base | transparent |  |  |  |  |  |
| peekViewEditor.matchHighlightBackground | overlay | transparent |  |  |  |  |  |
| peekViewResult.matchHighlightBackground | base | transparent |  |  |  |  |  |
| peekViewResult.selectionBackground | base | transparent |  |  |  |  |  |
| editor.wordHighlightBackground | base | transparent |  |  |  |  |  |
| editor.wordHighlightStrongBackground | base | transparent |  |  |  |  |  |
| editor.rangeHighlightBackground | base | transparent |  |  |  |  |  |
| editor.background | base | opaque |  |  |  |  |  |
| panel.background | panel | opaque |  |  |  |  |  |
| menu.background | menu | opaque |  |  |  |  |  |
| editorHoverWidget.background | overlay | opaque |  |  |  |  |  |
| editorSuggestWidget.background | overlay | opaque |  |  |  |  |  |
| quickInput.background | quickInput | opaque |  |  |  |  |  |
| editorHoverWidget.foreground | overlay | opaque |  |  | editorHoverWidget.background | primary≥4.5, muted≥3 | Overlay widgets: primary text should reach ~WCAG AA (4.5) over overlay bg; muted at least 3.0 |
| editorSuggestWidgetStatus.foreground | overlay | opaque |  |  | editorSuggestWidget.background | muted≥3 |  |
| editorSuggestWidget.foreground | overlay | opaque |  |  | editorSuggestWidget.background | primary≥4.5 |  |
| activityBar.inactiveForeground | base | opaque |  |  | activityBar.background | muted≥3 |  |
| tab.unfocusedInactiveForeground | base | opaque |  |  | tab.unfocusedInactiveBackground | muted≥3 |  |
| editorWidget.foreground | overlay | opaque |  |  | editorWidget.background | primary≥4.5 |  |
| quickInput.foreground | overlay | opaque |  |  | quickInput.background | primary≥4.5 |  |
| menu.foreground | menu | opaque |  |  | menu.background | primary≥4.5 |  |
| menu.selectionForeground | menu | opaque |  |  | menu.background | primary≥4.5 |  |
| panelTitle.inactiveForeground | panel | opaque |  |  | panel.background | muted≥3 |  |
| panelTitle.activeForeground | panel | opaque |  |  | panel.background | primary≥4.5 |  |
| peekViewTitleLabel.foreground | overlay | opaque |  |  | peekViewTitle.background | primary≥4.5 | Title label should remain readable over overlay title background |
| peekViewTitleDescription.foreground | overlay | opaque |  |  | peekViewTitle.background | muted≥3 | Description text can be muted but should stay >=3.0 |
| sideBarSectionHeader.foreground | base | opaque |  |  | sideBarSectionHeader.background | primary≥4 | Headers over elevated background should be clearly readable |
| notificationCenterHeader.foreground | overlay | opaque |  |  | notificationCenterHeader.background | primary≥4.5 |  |
| terminal.initialHintForeground | terminal | opaque |  |  | terminal.background | muted≥3 |  |
| breadcrumb.foreground | base | opaque |  |  | breadcrumb.background | muted≥3 |  |
| statusBar.foreground | base | opaque |  |  | statusBar.background | muted≥3 |  |
| activityBar.foreground | base | opaque |  |  | activityBar.background | muted≥3 |  |
| sideBar.foreground | base | opaque |  |  | sideBar.background | primary≥4 |  |
| sideBarTitle.foreground | base | opaque |  |  | sideBar.background | primary≥4.5 |  |
| editor.foreground | base | opaque |  |  | editor.background | primary≥7 | Editor text vs editor background: aim higher (~7.0) for code readability |
| statusBar.foreground | base | opaque |  |  | statusBar.background | muted≥3 |  |
| statusBarItem.hoverForeground | base | opaque |  |  | statusBar.background | primary≥4.5 |  |
| quickInput.foreground | overlay | opaque |  |  | quickInput.background | primary≥4.5 |  |
| editorIndentGuide.background |  |  | yes | editorIndentGuide.background1 |  |  |  |
| editorIndentGuide.activeBackground |  |  | yes | editorIndentGuide.activeBackground1 |  |  |  |
