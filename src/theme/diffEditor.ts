import { palette } from '../palette'
import {
  diffEditorInsertedTextBackground,
  diffEditorRemovedTextBackground,
  diffEditorInsertedTextBorder,
  diffEditorRemovedTextBorder,
  diffEditorInsertedLineBackground,
  diffEditorRemovedLineBackground,
  diffEditorDiagonalFill,
} from '../palette'

export const getDiffEditorColors = () => ({
  // Редактор сравнения (Diff)
  'diffEditor.insertedTextBackground': diffEditorInsertedTextBackground,
  'diffEditor.removedTextBackground': diffEditorRemovedTextBackground,
  'diffEditor.insertedTextBorder': diffEditorInsertedTextBorder,
  'diffEditor.removedTextBorder': diffEditorRemovedTextBorder,
  'diffEditor.insertedLineBackground': diffEditorInsertedLineBackground,
  'diffEditor.removedLineBackground': diffEditorRemovedLineBackground,
  'diffEditor.diagonalFill': diffEditorDiagonalFill,
})
