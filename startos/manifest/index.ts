import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'clams-remote',
  title: 'Clams Remote',
  license: 'gpl',
  packageRepo: 'https://github.com/Start9-Community/clams-remote-startos',
  upstreamRepo: 'https://github.com/clams-tech/Remote',
  marketingUrl: 'https://clams.tech/remote',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    'clams-remote': {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
