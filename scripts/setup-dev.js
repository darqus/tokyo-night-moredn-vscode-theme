#!/usr/bin/env node

/**
 * Development setup script for Tokyo Night Lod theme
 * This script helps new developers get started with the project
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`
}

function log(message, color = 'reset') {
  console.log(colorize(message, color))
}

function runCommand(command, description) {
  log(`\n\x1b[36m🔧 ${description}\x1b[0m`, 'cyan')
  log(`   \x1b[34m${command}\x1b[0m`, 'blue')
  
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' })
    if (output.trim()) {
      log(output.trim(), 'green')
    }
    return true
  } catch (error) {
    log(`\x1b[31m❌ Command failed: ${error.message}\x1b[0m`, 'red')
    if (error.stdout) log(error.stdout, 'yellow')
    if (error.stderr) log(error.stderr, 'red')
    return false
  }
}

function checkPrerequisites() {
  log('\x1b[1m🔍 Checking prerequisites...\x1b[0m', 'bold')
  
  // Check Node.js
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim()
    log(`\x1b[32m✅ Node.js: ${nodeVersion}\x1b[0m`, 'green')
  } catch (error) {
    log('\x1b[31m❌ Node.js not found. Please install Node.js (version 16 or higher)\x1b[0m', 'red')
    return false
  }
  
  // Check npm
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim()
    log(`\x1b[32m✅ npm: ${npmVersion}\x1b[0m`, 'green')
  } catch (error) {
    log('\x1b[31m❌ npm not found. Please install npm (version 7 or higher)\x1b[0m', 'red')
    return false
  }
  
  return true
}

function setupDevelopmentEnvironment() {
  log('\n\x1b[1m🚀 Setting up development environment...\x1b[0m', 'bold')
  
  // Install dependencies
  if (!runCommand('npm install', 'Installing dependencies')) {
    return false
  }
  
  // Build the theme
  if (!runCommand('npm run build', 'Building the theme')) {
    return false
  }
  
  // Run tests
  if (!runCommand('npm test', 'Running tests')) {
    return false
  }
  
  return true
}

function showNextSteps() {
  log('\n\x1b[32m🎉 Development environment setup complete!\x1b[0m', 'green')
  log('\n\x1b[1m📋 Next steps:\x1b[0m', 'bold')
  log('1. Open the project in your favorite code editor', 'cyan')
  log('2. Run `npm run test:watch` to start testing in watch mode', 'cyan')
  log('3. Run `npm run build` to rebuild the theme after changes', 'cyan')
  log('4. Check out the documentation in the docs/ folder', 'cyan')
  
  log('\n\x1b[1m🔧 Useful commands:\x1b[0m', 'bold')
  log('npm run build       - Build the theme', 'blue')
  log('npm test            - Run all tests', 'blue')
  log('npm run test:watch  - Run tests in watch mode', 'blue')
  log('npm run validate    - Validate theme files', 'blue')
  log('npm run validate --fix --all - Auto-fix theme issues', 'blue')
  
  log('\n\x1b[1m📖 Documentation:\x1b[0m', 'bold')
  log('docs/ARCHITECTURE.md     - Project architecture', 'blue')
  log('docs/COLOR_SYSTEM.md     - Color system', 'blue')
  log('docs/SEMANTIC_TOKENS.md  - Semantic tokens guide', 'blue')
  log('docs/CONTRIBUTING.md     - Contribution guidelines', 'blue')
}

function main() {
  log('Tokyo Night Lod Development Setup', 'bold')
  log('=================================\n', 'bold')
  
  if (!checkPrerequisites()) {
    log('\n\x1b[31m❌ Prerequisites check failed. Please fix the issues above.\x1b[0m', 'red')
    process.exit(1)
  }
  
  if (!setupDevelopmentEnvironment()) {
    log('\n\x1b[31m❌ Setup failed. Please check the errors above.\x1b[0m', 'red')
    process.exit(1)
  }
  
  showNextSteps()
}

if (require.main === module) {
  main()
}