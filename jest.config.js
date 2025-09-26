module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/legacy/**/*.ts', // legacy files excluded from coverage
    '!src/generators/interfaceMapping.ts', // legacy mapping kept for reference
    '!src/types/**/*.ts',
    '!src/scripts/**/*.ts',
    '!src/plugins.ts', // plugin definitions excluded
    '!src/build-legacy.ts' // legacy build excluded
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setupTests.ts']
}
