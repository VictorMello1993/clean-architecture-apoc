/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@adaptadores/(.*)$": "<rootDir>/src/adaptadores/$1",
    "^@portas/(.*)$": "<rootDir>/src/core/portas/$1"
  }
};
