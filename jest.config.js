module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(axios|react-router-dom)/)"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleDirectories: ["node_modules", "src"],
};
