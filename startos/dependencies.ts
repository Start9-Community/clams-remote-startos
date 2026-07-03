import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => ({
  'c-lightning': {
    kind: 'running',
    versionRange: '>=26.6.1:2',
    healthChecks: ['lightningd'],
  },
}))
