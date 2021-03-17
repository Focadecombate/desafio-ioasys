export default {

  collectCoverageFrom: ['<rootDir/src/**/*.ts>'],
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
