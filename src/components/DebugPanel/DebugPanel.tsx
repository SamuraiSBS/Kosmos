import { useGameStore } from '../../game/gameStore';

export const DebugPanel: React.FC = () => {
  const resetGame = useGameStore((state) => state.resetGame);
  const setGameState = useGameStore((state) => state.setGameState);
  const setIntroCompleted = useGameStore((state) => state.setIntroCompleted);
  const updateFieldState = useGameStore((state) => state.updateFieldState);
  const addXP = useGameStore((state) => state.addXP);
  const fields = useGameStore((state) => state.fields);
  
  return (
    <div className="debug-panel">
      <h3>🔧 DEBUG</h3>
      
      <button onClick={() => resetGame()}>
        Reset Game
      </button>
      
      <button onClick={() => setIntroCompleted(true)}>
        Skip Intro
      </button>
      
      <button onClick={() => setGameState('MAP')}>
        Go to MAP
      </button>
      
      <button onClick={() => setGameState('ANALYSIS')}>
        Go to ANALYSIS
      </button>
      
      <button onClick={() => setGameState('DECISION')}>
        Go to DECISION
      </button>
      
      <button onClick={() => setGameState('RESULT')}>
        Go to RESULT
      </button>
      
      <div style={{ marginTop: 12, borderTop: '1px solid #4b5563', paddingTop: 8 }}>
        <div style={{ marginBottom: 4 }}>Fields:</div>
        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: 4 }}>
            <button 
              onClick={() => updateFieldState(field.id, 'critical')}
              style={{ marginRight: 4 }}
            >
              Set Critical
            </button>
            <button 
              onClick={() => updateFieldState(field.id, 'healthy')}
            >
              Set Healthy
            </button>
            <div style={{ fontSize: 9, color: '#9ca3af' }}>{field.name}</div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 12, borderTop: '1px solid #4b5563', paddingTop: 8 }}>
        <button onClick={() => addXP(100)}>
          +100 XP
        </button>
      </div>
    </div>
  );
};
