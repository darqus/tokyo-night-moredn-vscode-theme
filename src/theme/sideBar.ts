import { palette } from '../palette'

export const getSideBarColors = () => ({
  // Боковая панель - улучшенная иерархия
  'tree.indentGuidesStroke': palette.line.border,
  'sideBar.foreground': palette.fg.panelText, // Улучшенная читаемость для текста в боковой панели
  'sideBar.background': palette.bg.hover,
  'sideBar.border': palette.line.border,
  'sideBarTitle.foreground': palette.fg.activeTitle,
  'sideBarSectionHeader.background': palette.bg.elevated,
  'sideBarSectionHeader.foreground': palette.fg.primary,
  'sideBarSectionHeader.border': palette.line.border,
  'sideBar.dropBackground': palette.bg.drop,
})
