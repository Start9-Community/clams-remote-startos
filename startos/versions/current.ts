import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '2.6.1:7',
  releaseNotes: {
    en_US: `- The network interface left behind by the StartOS 0.3.5 version of this package is removed and its port freed. A domain or .onion address you had added to it no longer reaches Clams Remote; add one to the Web UI interface instead.`,
    es_ES: `- Se elimina la interfaz de red que dejó la versión de este paquete para StartOS 0.3.5 y se libera su puerto. Un dominio o una dirección .onion que hubieras añadido a ella ya no lleva a Clams Remote; añade uno a la interfaz «Interfaz web» en su lugar.`,
    de_DE: `- Die Netzwerkschnittstelle, die die StartOS-0.3.5-Version dieses Pakets hinterlassen hatte, wird entfernt und ihr Port freigegeben. Eine Domain oder .onion-Adresse, die Sie ihr hinzugefügt hatten, führt nicht mehr zu Clams Remote; fügen Sie stattdessen eine der Schnittstelle „Weboberfläche“ hinzu.`,
    pl_PL: `- Interfejs sieciowy pozostawiony przez wersję tego pakietu dla StartOS 0.3.5 zostaje usunięty, a jego port zwolniony. Domena lub adres .onion dodany do niego nie prowadzi już do Clams Remote; zamiast tego dodaj go do interfejsu „Interfejs internetowy”.`,
    fr_FR: `- L’interface réseau laissée par la version de ce paquet pour StartOS 0.3.5 est supprimée et son port libéré. Un domaine ou une adresse .onion que vous y aviez ajouté ne mène plus à Clams Remote ; ajoutez-en un à l’interface « Interface web » à la place.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'clams-remote').retire()
    },
    down: IMPOSSIBLE,
  },
})
