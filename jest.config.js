module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  moduleNameMapper: {
    '(.+)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true
}