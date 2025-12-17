import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",

  roots: ["<rootDir>/test"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testMatch: [
    "**/*.test.ts",
    "**/*.test.tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};

export default config;