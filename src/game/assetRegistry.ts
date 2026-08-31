export const assetRegistry: Record<string, { type: string; label?: string; src?: string }> = {
  // Player assets
  player: {
    type: 'placeholder',
    label: 'PLAYER',
  },
  
  // NPC assets
  npcHelper: {
    type: 'placeholder',
    label: 'NPC',
  },
  
  // Building assets
  farmHouse: {
    type: 'placeholder',
    label: 'HOUSE',
  },
  
  satelliteStation: {
    type: 'placeholder',
    label: 'SATELLITE',
  },
  
  // Nature assets
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
  
  // Field states
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
};

export type AssetId = keyof typeof assetRegistry;
