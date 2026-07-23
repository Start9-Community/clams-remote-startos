import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_6_1_3 } from './v2.6.1_3'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_6_1_3],
})
