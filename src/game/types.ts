export type GameState = 
  | 'LOADING'
  | 'SPACE'
  | 'INTRO'
  | 'MAP'
  | 'MISSION'
  | 'ANALYSIS'
  | 'DECISION'
  | 'RESULT';

export type FieldState = 
  | 'healthy'
  | 'warning'
  | 'critical'
  | 'resolved';

export interface Field {
  id: string;
  name: string;
  state: FieldState;
  x: number;
  y: number;
  tiles: number;
  locked?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  locked?: boolean;
}

export interface GameStore {
  // Game state
  gameState: GameState;
  introCompleted: boolean;
  
  // Player stats
  xp: number;
  farmHealth: number;
  
  // Missions
  currentMissionId: string | null;
  missions: Mission[];
  
  // Fields
  fields: Field[];
  selectedField: string | null;
  
  // Analysis & Decision
  analysisCompleted: boolean;
  decisionMade: boolean;
  correctDecision: boolean | null;
  
  // Actions
  setGameState: (state: GameState) => void;
  setIntroCompleted: (completed: boolean) => void;
  addXP: (amount: number) => void;
  setFarmHealth: (health: number) => void;
  selectField: (fieldId: string | null) => void;
  updateFieldState: (fieldId: string, state: FieldState) => void;
  setAnalysisCompleted: (completed: boolean) => void;
  setDecisionMade: (correct: boolean) => void;
  completeMission: (missionId: string) => void;
  resetGame: () => void;
}
