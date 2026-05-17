import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_6_1_2 = VersionInfo.of({
  version: '2.6.1:2',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 1.5.2).',
    es_ES: 'Actualizaciones internas (start-sdk 1.5.2).',
    de_DE: 'Interne Aktualisierungen (start-sdk 1.5.2).',
    pl_PL: 'Aktualizacje wewnętrzne (start-sdk 1.5.2).',
    fr_FR: 'Mises à jour internes (start-sdk 1.5.2).',
  },
  migrations: {
    up: async () => {
      // Clean up legacy 0.3.5.1 `start9` directory if present on the main volume.
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(() => {})
    },
    down: IMPOSSIBLE,
  },
})
