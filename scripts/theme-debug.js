#!/usr/bin/env node

/**
 * Theme debugging tool for Tokyo Night Lod
 * Helps developers inspect and debug theme properties
 */

const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
}

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`
}

function log(message, color = 'reset') {
  console.log(colorize(message, color))
}

function printHelp() {
  log('Tokyo Night Lod Theme Debugger', 'bold')
  log('=============================\n', 'bold')
  
  log('USAGE:', 'cyan')
  log('  npm run debug [command] [options]', 'blue')
  log('  node scripts/theme-debug.js [command] [options]\n', 'blue')
  
  log('COMMANDS:', 'cyan')
  log('  colors     - Show color palette', 'blue')
  log('  tokens     - Show semantic tokens', 'blue')
  log('  inspect    - Inspect specific theme property', 'blue')
  log('  search     - Search for properties by name', 'blue')
  log('  compare    - Compare with previous version', 'blue')
  log('  validate   - Validate theme properties', 'blue')
  log('  help       - Show this help', 'blue')
  
  log('\nOPTIONS:', 'cyan')
  log('  -v, --verbose    Verbose output', 'blue')
  log('  -f, --filter     Filter results', 'blue')
  log('  -o, --output     Output to file', 'blue')
}

function loadTheme() {
  const themePath = path.join(process.cwd(), 'themes', 'tokyo-night-dark-color-theme.json')
  if (!fs.existsSync(themePath)) {
    log('❌ Theme file not found. Please build the theme first.', 'red')
    process.exit(1)
  }
  
  try {
    const content = fs.readFileSync(themePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    log(`❌ Error loading theme: ${error.message}`, 'red')
    process.exit(1)
  }
}

function showColors() {
  const theme = loadTheme()
  log('🎨 Color Palette', 'bold')
  log('===============\n', 'bold')
  
  // Show main color categories
  if (theme.colors) {
    log('UI Colors:', 'cyan')
    const uiColors = Object.entries(theme.colors).filter(([key]) => 
      !key.includes('editor') && 
      !key.includes('token') && 
      !key.includes('semantic')
    )
    
    uiColors.forEach(([key, value]) => {
      log(`  ${key}: ${value}`, 'blue')
    })
    
    log('\nEditor Colors:', 'cyan')
    const editorColors = Object.entries(theme.colors).filter(([key]) => 
      key.includes('editor')
    )
    
    editorColors.forEach(([key, value]) => {
      log(`  ${key}: ${value}`, 'blue')
    })
  }
}

function showTokens() {
  const theme = loadTheme()
  log('🎯 Semantic Tokens', 'bold')
  log('=================\n', 'bold')
  
  if (theme.semanticTokenColors) {
    Object.entries(theme.semanticTokenColors).forEach(([token, style]) => {
      if (typeof style === 'string') {
        log(`  ${token}: ${style}`, 'blue')
      } else {
        const parts = []
        if (style.foreground) parts.push(`foreground: ${style.foreground}`)
        if (style.bold) parts.push('bold')
        if (style.italic) parts.push('italic')
        if (style.underline) parts.push('underline')
        log(`  ${token}: { ${parts.join(', ')} }`, 'blue')
      }
    })
  }
}

function inspectProperty(propertyName) {
  const theme = loadTheme()
  log(`🔍 Inspecting: ${propertyName}`, 'bold')
  log('========================\n', 'bold')
  
  // Check in colors
  if (theme.colors && theme.colors[propertyName]) {
    log('Found in UI Colors:', 'cyan')
    log(`  ${propertyName}: ${theme.colors[propertyName]}`, 'blue')
    return
  }
  
  // Check in semantic tokens
  if (theme.semanticTokenColors && theme.semanticTokenColors[propertyName]) {
    log('Found in Semantic Tokens:', 'cyan')
    const style = theme.semanticTokenColors[propertyName]
    if (typeof style === 'string') {
      log(`  ${propertyName}: ${style}`, 'blue')
    } else {
      const parts = []
      if (style.foreground) parts.push(`foreground: ${style.foreground}`)
      if (style.bold) parts.push('bold')
      if (style.italic) parts.push('italic')
      if (style.underline) parts.push('underline')
      log(`  ${propertyName}: { ${parts.join(', ')} }`, 'blue')
    }
    return
  }
  
  // Check in token colors
  if (theme.tokenColors) {
    const matches = theme.tokenColors.filter(token => 
      Array.isArray(token.scope) 
        ? token.scope.includes(propertyName)
        : token.scope === propertyName
    )
    
    if (matches.length > 0) {
      log('Found in Token Colors:', 'cyan')
      matches.forEach(match => {
        log(`  Name: ${match.name || 'Unnamed'}`, 'blue')
        log(`  Scope: ${Array.isArray(match.scope) ? match.scope.join(', ') : match.scope}`, 'blue')
        if (match.settings) {
          Object.entries(match.settings).forEach(([key, value]) => {
            log(`  ${key}: ${value}`, 'blue')
          })
        }
        log('')
      })
      return
    }
  }
  
  log('Property not found', 'yellow')
}

function searchProperties(searchTerm) {
  const theme = loadTheme()
  log(`🔍 Search results for: ${searchTerm}`, 'bold')
  log('========================\n', 'bold')
  
  const results = []
  
  // Search in colors
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({ type: 'UI Color', name: key, value })
      }
    })
  }
  
  // Search in semantic tokens
  if (theme.semanticTokenColors) {
    Object.entries(theme.semanticTokenColors).forEach(([key, value]) => {
      if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({ type: 'Semantic Token', name: key, value })
      }
    })
  }
  
  // Search in token colors
  if (theme.tokenColors) {
    theme.tokenColors.forEach(token => {
      if (token.name && token.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({ type: 'Token Color', name: token.name, value: token.scope })
      }
      
      if (Array.isArray(token.scope)) {
        token.scope.forEach(scope => {
          if (scope.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({ type: 'Token Scope', name: scope, value: token.name || 'Unnamed' })
          }
        })
      } else if (token.scope && token.scope.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({ type: 'Token Scope', name: token.scope, value: token.name || 'Unnamed' })
      }
    })
  }
  
  if (results.length > 0) {
    results.forEach(result => {
      log(`${result.type}: ${result.name}`, 'cyan')
      log(`  Value: ${typeof result.value === 'object' ? JSON.stringify(result.value) : result.value}`, 'blue')
      log('')
    })
  } else {
    log('No results found', 'yellow')
  }
}

function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args.includes('-h') || args.includes('--help') || args[0] === 'help') {
    printHelp()
    return
  }
  
  const command = args[0]
  
  switch (command) {
    case 'colors':
      showColors()
      break
      
    case 'tokens':
      showTokens()
      break
      
    case 'inspect':
      if (args.length < 2) {
        log('❌ Please specify a property name to inspect', 'red')
        process.exit(1)
      }
      inspectProperty(args[1])
      break
      
    case 'search':
      if (args.length < 2) {
        log('❌ Please specify a search term', 'red')
        process.exit(1)
      }
      searchProperties(args[1])
      break
      
    default:
      log(`❌ Unknown command: ${command}`, 'red')
      log('Use --help for available commands', 'yellow')
      process.exit(1)
  }
}

if (require.main === module) {
  main()
}