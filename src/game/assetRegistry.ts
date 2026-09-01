export const assetRegistry: Record<string, { type: string; label?: string; src?: string }> = {
  // Player assets - current and future
  player: {
    type: 'placeholder',
    label: 'PLAYER',
  },
  'player-idle': {
    type: 'placeholder',
    label: 'PLAYER-IDLE',
  },
  'player-walk-up': {
    type: 'placeholder',
    label: 'PLAYER-WALK-UP',
  },
  'player-walk-down': {
    type: 'placeholder',
    label: 'PLAYER-WALK-DOWN',
  },
  'player-walk-left': {
    type: 'placeholder',
    label: 'PLAYER-WALK-LEFT',
  },
  'player-walk-right': {
    type: 'placeholder',
    label: 'PLAYER-WALK-RIGHT',
  },
  
  // NPC assets - current and future
  npcHelper: {
    type: 'placeholder',
    label: 'NPC',
  },
  'npc-helper': {
    type: 'placeholder',
    label: 'NPC-HELPER',
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
  
  // Nature assets - current and future
  tree: {
    type: 'placeholder',
    label: 'TREE',
  },
  'tree-01': {
    type: 'placeholder',
    label: 'TREE-01',
  },
  'tree-02': {
    type: 'placeholder',
    label: 'TREE-02',
  },
  'tree-03': {
    type: 'placeholder',
    label: 'TREE-03',
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
