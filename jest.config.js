module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '(.+)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true
}