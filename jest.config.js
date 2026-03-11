module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/js/characters.js'],
};