import { palette } from '../palette'
import {
  mergeCurrentHeaderBackground,
  mergeCurrentContentBackground,
  mergeIncomingHeaderBackground,
  mergeIncomingContentBackground,
} from '../palette'

export const getMergeColors = () => ({
  // Слияние (Merge)
  'merge.currentHeaderBackground': mergeCurrentHeaderBackground, // Заголовок текущей ветки
  'merge.currentContentBackground': mergeCurrentContentBackground, // Контент текущей ветки
  'merge.incomingHeaderBackground': mergeIncomingHeaderBackground, // Заголовок входящей ветки
  'merge.incomingContentBackground': mergeIncomingContentBackground, // Контент входящей ветки
})
