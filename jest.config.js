/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@ports/(.*)$": "<rootDir>/src/core/ports/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1"
  },
  setupFiles: ["<rootDir>/tests/.env.ts"]
};
