import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameStore, FieldState } from './types';

const INITIAL_FIELDS = [
  { id: 'field-a', name: 'Северное поле', state: 'critical' as FieldState, x: 5, y: 3, tiles: 16 },
  { id: 'field-b', name: 'Западное поле', state: 'healthy' as FieldState, x: 2, y: 7, tiles: 16 },
  { id: 'field-c', name: 'Восточное поле', state: 'healthy' as FieldState, x: 8, y: 7, tiles: 16 },
];

const INITIAL_MISSIONS = [
  {
    id: 'mission-01',
    title: 'Аномалия на северном поле',
    description: 'Исследуйте северный участок поля и выявите проблему',
    xp: 120,
    completed: false,
  },
  {
    id: 'mission-02',
    title: 'Мониторинг западного поля',
    description: 'Станет доступно позже',
    xp: 150,
    completed: false,
    locked: true,
  },
  {
    id: 'mission-03',
    title: 'Проверка восточного поля',
    description: 'Станет доступно позже',
    xp: 150,
    completed: false,
    locked: true,
  },
];

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      // Initial state
      gameState: 'LOADING',
      introCompleted: false,
      
      // Player stats
      xp: 0,
      farmHealth: 72,
      
      // Missions
      currentMissionId: 'mission-01',
      missions: INITIAL_MISSIONS,
      
      // Fields
      fields: INITIAL_FIELDS,
      selectedField: null,
      
      // Analysis & Decision
      analysisCompleted: false,
      decisionMade: false,
      correctDecision: null,
      
      // Actions
      setGameState: (state) => set({ gameState: state }),
      
      setIntroCompleted: (completed) => set({ introCompleted: completed }),
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      setFarmHealth: (health) => set({ farmHealth: health }),
      
      selectField: (fieldId) => set({ selectedField: fieldId }),
      
      updateFieldState: (fieldId, state) => set((store) => ({
        fields: store.fields.map((f) => 
          f.id === fieldId ? { ...f, state } : f
        ),
      })),
      
      setAnalysisCompleted: (completed) => set({ analysisCompleted: completed }),
      
      setDecisionMade: (correct) => set({ decisionMade: true, correctDecision: correct }),
      
      completeMission: (missionId) => set((state) => ({
        missions: state.missions.map((m) =>
          m.id === missionId ? { ...m, completed: true } : m
        ),
        currentMissionId: null,
      })),
      
      resetGame: () => set({
        gameState: 'LOADING',
        introCompleted: false,
        xp: 0,
        farmHealth: 72,
        currentMissionId: 'mission-01',
        missions: INITIAL_MISSIONS,
        fields: INITIAL_FIELDS,
        selectedField: null,
        analysisCompleted: false,
        decisionMade: false,
        correctDecision: null,
      }),
    }),
    {
      name: 'kosmo-game-storage',
      partialize: (state) => ({
        introCompleted: state.introCompleted,
        xp: state.xp,
        farmHealth: state.farmHealth,
        missions: state.missions,
        fields: state.fields,
      }),
    }
  )
);
