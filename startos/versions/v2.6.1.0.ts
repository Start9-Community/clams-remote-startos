import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_6_1_0 = VersionInfo.of({
  version: '2.6.1:0',
  releaseNotes: {
    en_US:
      'Update Clams Remote to v2.6.1 and migrate the package to StartOS 0.4.0. Release notes: https://github.com/clams-tech/Remote/releases/tag/remote-2.6.1',
    es_ES:
      'Actualización de Clams Remote a v2.6.1 y migración del paquete a StartOS 0.4.0. Notas de la versión: https://github.com/clams-tech/Remote/releases/tag/remote-2.6.1',
    de_DE:
      'Aktualisierung von Clams Remote auf v2.6.1 und Migration des Pakets auf StartOS 0.4.0. Versionshinweise: https://github.com/clams-tech/Remote/releases/tag/remote-2.6.1',
    pl_PL:
      'Aktualizacja Clams Remote do v2.6.1 oraz migracja pakietu do StartOS 0.4.0. Informacje o wydaniu: https://github.com/clams-tech/Remote/releases/tag/remote-2.6.1',
    fr_FR:
      'Mise à jour de Clams Remote vers v2.6.1 et migration du paquet vers StartOS 0.4.0. Notes de version : https://github.com/clams-tech/Remote/releases/tag/remote-2.6.1',
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
