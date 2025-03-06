/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// import type { Config } from 'jest'

module.exports = {
  roots: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
     '@/(.*)': '<rootDir>/src/$1'
  },
  preset: '@shelf/jest-mongodb'

}
// export default config
