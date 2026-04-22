import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  'c-lightning': {
    kind: 'running',
    versionRange: '>=25.12.1:8',
    healthChecks: ['lightningd'],
  },
}))
