import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.tsx'],
};

export default config;
