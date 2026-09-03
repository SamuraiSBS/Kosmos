export type AssetType = 'placeholder' | 'image'

export interface AssetConfig {
  type: AssetType
  label?: string
  src?: string
  width?: number
  height?: number
}

export const assetRegistry: Record<string, AssetConfig> = {
  // Player
  player: {
    type: 'placeholder',
    label: 'PLAYER',
  },
  
  // NPC
  npcHelper: {
    type: 'placeholder',
    label: 'NPC',
  },
  
  // Buildings
  farmHouse: {
    type: 'placeholder',
    label: 'HOUSE',
  },
  
  satelliteStation: {
    type: 'placeholder',
    label: 'SATELLITE',
  },
  
  // Nature
  tree: {
    type: 'placeholder',
    label: 'TREE',
  },
  
  water: {
    type: 'placeholder',
    label: 'WATER',
  },
  
  grass: {
    type: 'placeholder',
    label: 'GRASS',
  },
  
  road: {
    type: 'placeholder',
    label: 'ROAD',
  },
  
  // Fields
  fieldHealthy: {
    type: 'placeholder',
    label: 'FIELD',
  },
  
  fieldWarning: {
    type: 'placeholder',
    label: 'WARNING',
  },
  
  fieldCritical: {
    type: 'placeholder',
    label: 'CRITICAL',
  },
  
  fieldResolved: {
    type: 'placeholder',
    label: 'RESOLVED',
  },
  
  // UI / FX
  missionMarker: {
    type: 'placeholder',
    label: 'MARKER',
  },
  
  lockedArea: {
    type: 'placeholder',
    label: 'LOCKED',
  },
}
