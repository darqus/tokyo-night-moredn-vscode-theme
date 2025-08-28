import { palette } from '../palette'

export const getChartColors = () => ({
  // Диаграммы (нет прямых импортов из core)
  'charts.red': palette.accent.red, // Красные элементы диаграмм
  'charts.blue': palette.accent.blue, // Синие элементы диаграмм
  'charts.yellow': palette.accent.yellow, // Желтые элементы диаграмм
  'charts.orange': palette.accent.orange, // Оранжевые элементы диаграмм
  'charts.green': palette.accent.teal, // Зеленые элементы диаграмм
  'charts.purple': palette.accent.purple, // Пурпурные элементы диаграмм
  'charts.foreground': palette.ui.charts.foreground, // Основной текст диаграмм
  'charts.lines': palette.line.border, // Линии диаграмм
})
