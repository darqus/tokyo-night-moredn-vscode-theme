#!/usr/bin/env node

/**
 * Test script to verify visual regression testing detects changes
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function runTest() {
  console.log('Testing visual regression detection...')
  
  // Run the visual tests to confirm they pass initially
  console.log('\n1. Running initial tests...')
  try {
    execSync('npm run test:visual', { stdio: 'inherit' })
    console.log('✅ Initial tests passed')
  } catch (error) {
    console.log('❌ Initial tests failed')
    process.exit(1)
  }
  
  // Temporarily modify a theme color to simulate a change
  console.log('\n2. Modifying theme to simulate change...')
  const buttonsPath = path.join(__dirname, '..', 'src', 'theme', 'buttons.ts')
  const originalContent = fs.readFileSync(buttonsPath, 'utf8')
  
  // Change the button background color
  const modifiedContent = originalContent.replace(
    "'button.background': palette.brand.button.primary,",
    "'button.background': '#ff0000' as `#${string}`, // Temporary change for testing"
  )
  
  fs.writeFileSync(buttonsPath, modifiedContent)
  
  // Rebuild the theme
  console.log('3. Rebuilding theme with modified color...')
  try {
    execSync('npm run build', { stdio: 'inherit' })
    console.log('✅ Theme rebuilt')
  } catch (error) {
    console.log('❌ Failed to rebuild theme')
    // Restore original content before exiting
    fs.writeFileSync(buttonsPath, originalContent)
    process.exit(1)
  }
  
  // Run visual tests again - they should fail now
  console.log('\n4. Running tests with modified theme...')
  let visualTestsPassed = true
  try {
    execSync('npm run test:visual', { stdio: 'inherit' })
    console.log('❌ Visual tests should have failed but passed')
    visualTestsPassed = false
  } catch (error) {
    console.log('✅ Visual tests correctly failed')
  }
  
  // Restore original content
  console.log('\n5. Restoring original theme...')
  fs.writeFileSync(buttonsPath, originalContent)
  
  // Rebuild the theme again
  console.log('6. Rebuilding theme with original color...')
  try {
    execSync('npm run build', { stdio: 'inherit' })
    console.log('✅ Theme rebuilt with original colors')
  } catch (error) {
    console.log('❌ Failed to rebuild theme')
    process.exit(1)
  }
  
  // Run visual tests one more time - they should pass again
  console.log('\n7. Running tests with original theme...')
  try {
    execSync('npm run test:visual', { stdio: 'inherit' })
    console.log('✅ Visual tests passed with original theme')
  } catch (error) {
    console.log('❌ Visual tests failed with original theme')
    visualTestsPassed = false
  }
  
  // Final result
  console.log('\n🎉 Test Results:')
  if (visualTestsPassed) {
    console.log('✅ Visual regression testing is working correctly')
  } else {
    console.log('❌ Visual regression testing is not working correctly')
    process.exit(1)
  }
}

if (require.main === module) {
  runTest()
}