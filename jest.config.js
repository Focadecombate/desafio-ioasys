module.exports = {
  transform: {
    '.+\\ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir/src/**/*.ts>',
    '!<rootDir/src/main/**>'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  preset: 'ts-jest',
  coverageProvider: 'v8',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  testEnvironment: 'node'
}
