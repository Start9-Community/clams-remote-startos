import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_6_1_1 = VersionInfo.of({
  version: '2.6.1:1',
  releaseNotes: {
    en_US: `- Adds an in-app Instructions tab
- Internal updates (start-sdk 1.5.1)`,
    es_ES: `- Añade una pestaña de Instrucciones en la app
- Actualizaciones internas (start-sdk 1.5.1)`,
    de_DE: `- Fügt eine In-App-Anleitungs-Registerkarte hinzu
- Interne Aktualisierungen (start-sdk 1.5.1)`,
    pl_PL: `- Dodaje zakładkę Instrukcje w aplikacji
- Aktualizacje wewnętrzne (start-sdk 1.5.1)`,
    fr_FR: `- Ajoute un onglet Instructions dans l'application
- Mises à jour internes (start-sdk 1.5.1)`,
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
