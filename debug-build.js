const fs = require('fs')

// Read the build.ts file and check if high contrast theme is being generated
const buildContent = fs.readFileSync('./src/build.ts', 'utf8')

console.log('Build file contains highContrast references:', buildContent.includes('highContrast'))
console.log('Build file contains validateAndSaveTheme call for highContrast:', buildContent.includes('validateAndSaveTheme(highContrastTheme'))

// Check if the high contrast theme file exists
console.log('High contrast theme file exists:', fs.existsSync('./themes/tokyo-night-dark-high-contrast-color-theme.json'))