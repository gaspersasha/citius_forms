const config = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['./jest/setup.js', './jest/mocks.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
  testTimeout: 20000,
  verbose: true,

  // coverage settings
  coverageDirectory: './jest/coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  // temp. ignored
  coveragePathIgnorePatterns: [
    '<rootDir>/src/containers/goreserve',
    '<rootDir>/src/containers/gofinance',
    '<rootDir>/src/containers/almost-done',
    '<rootDir>/src/containers/authentication/AuthModal.jsx',
    '<rootDir>/src/pages',
    '<rootDir>/src/utils',
    '<rootDir>/src/contexts',
    '<rootDir>/src/services',
  ],
  coverageThreshold: {
    global: {
      statements: 81,
      branches: 71,
      functions: 80,
      lines: 81,
    },
  },
};

module.exports = config;
