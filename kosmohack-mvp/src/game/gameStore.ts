import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FieldState = 'healthy' | 'warning' | 'critical' | 'resolved' | 'locked'

export type SceneState = 
  | 'LOADING'
  | 'INTRO'
  | 'MAP'
  | 'MISSION'
  | 'ANALYSIS'
  | 'DECISION'
  | 'RESULT'

export interface FieldTile {
  id: string
  x: number
  y: number
  state: FieldState
}

export interface Mission {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
}

interface GameState {
  // Progression
  xp: number
  farmHealth: number
  currentMissionId: string | null
  missionProgress: Record<string, number>
  
  // World state
  fieldStates: Record<string, FieldState>
  fieldTiles: FieldTile[]
  
  // Scene & flow
  scene: SceneState
  introCompleted: boolean
  selectedFieldId: string | null
  analysisCompleted: boolean
  
  // Actions
  setScene: (scene: SceneState) => void
  addXP: (amount: number) => void
  setFarmHealth: (health: number) => void
  completeMission: (missionId: string) => void
  updateFieldState: (fieldId: string, state: FieldState) => void
  updateFieldTiles: (tiles: FieldTile[]) => void
  setSelectedField: (fieldId: string | null) => void
  setAnalysisCompleted: (completed: boolean) => void
  setIntroCompleted: (completed: boolean) => void
  resetGame: () => void
}

const INITIAL_TILES: FieldTile[] = [
  // Field A - 5x5 grid with some critical/warning tiles in northern area
  { id: 'a-0-0', x: 0, y: 0, state: 'critical' },
  { id: 'a-1-0', x: 1, y: 0, state: 'critical' },
  { id: 'a-2-0', x: 2, y: 0, state: 'warning' },
  { id: 'a-3-0', x: 3, y: 0, state: 'healthy' },
  { id: 'a-4-0', x: 4, y: 0, state: 'healthy' },
  { id: 'a-0-1', x: 0, y: 1, state: 'critical' },
  { id: 'a-1-1', x: 1, y: 1, state: 'warning' },
  { id: 'a-2-1', x: 2, y: 1, state: 'warning' },
  { id: 'a-3-1', x: 3, y: 1, state: 'healthy' },
  { id: 'a-4-1', x: 4, y: 1, state: 'healthy' },
  { id: 'a-0-2', x: 0, y: 2, state: 'warning' },
  { id: 'a-1-2', x: 1, y: 2, state: 'healthy' },
  { id: 'a-2-2', x: 2, y: 2, state: 'healthy' },
  { id: 'a-3-2', x: 3, y: 2, state: 'healthy' },
  { id: 'a-4-2', x: 4, y: 2, state: 'healthy' },
  { id: 'a-0-3', x: 0, y: 3, state: 'healthy' },
  { id: 'a-1-3', x: 1, y: 3, state: 'healthy' },
  { id: 'a-2-3', x: 2, y: 3, state: 'healthy' },
  { id: 'a-3-3', x: 3, y: 3, state: 'healthy' },
  { id: 'a-4-3', x: 4, y: 3, state: 'healthy' },
  { id: 'a-0-4', x: 0, y: 4, state: 'healthy' },
  { id: 'a-1-4', x: 1, y: 4, state: 'healthy' },
  { id: 'a-2-4', x: 2, y: 4, state: 'healthy' },
  { id: 'a-3-4', x: 3, y: 4, state: 'healthy' },
  { id: 'a-4-4', x: 4, y: 4, state: 'healthy' },
]

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Initial state
      xp: 0,
      farmHealth: 72,
      currentMissionId: 'mission-01',
      missionProgress: {},
      
      fieldStates: {
        'field-a': 'warning',
        'field-b': 'locked',
        'field-c': 'locked',
      } as Record<string, FieldState>,
      
      fieldTiles: INITIAL_TILES,
      
      scene: 'LOADING',
      introCompleted: false,
      selectedFieldId: null,
      analysisCompleted: false,
      
      // Actions
      setScene: (scene) => set({ scene }),
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      setFarmHealth: (health) => set({ farmHealth: health }),
      
      completeMission: (missionId) => set((state) => ({
        missionProgress: {
          ...state.missionProgress,
          [missionId]: 100,
        },
      })),
      
      updateFieldState: (fieldId, state) => set((gameState) => ({
        fieldStates: {
          ...gameState.fieldStates,
          [fieldId]: state,
        },
      })),
      
      updateFieldTiles: (tiles) => set({ fieldTiles: tiles }),
      
      setSelectedField: (fieldId) => set({ selectedFieldId: fieldId }),
      
      setAnalysisCompleted: (completed) => set({ analysisCompleted: completed }),
      
      setIntroCompleted: (completed) => set({ introCompleted: completed }),
      
      resetGame: () => set({
        xp: 0,
        farmHealth: 72,
        currentMissionId: 'mission-01',
        missionProgress: {},
        fieldStates: {
          'field-a': 'warning',
          'field-b': 'locked',
          'field-c': 'locked',
        },
        fieldTiles: INITIAL_TILES,
        scene: 'LOADING',
        introCompleted: false,
        selectedFieldId: null,
        analysisCompleted: false,
      }),
    }),
    {
      name: 'kosmohack-game-state',
    }
  )
)
