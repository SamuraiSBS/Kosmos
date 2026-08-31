import { useState, useEffect } from 'react';
import { useGameStore } from '../game/gameStore';
import { SpaceScene } from '../scenes/SpaceScene';
import { IntroScene } from '../scenes/IntroScene';
import { MapScene } from '../scenes/MapScene';
import { AnalysisScene } from '../scenes/AnalysisScene';
import { DecisionScene } from '../scenes/DecisionScene';
import { ResultScene } from '../scenes/ResultScene';
import { DebugPanel } from '../components/DebugPanel/DebugPanel';

function App() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);
  const introCompleted = useGameStore((state) => state.introCompleted);
  const selectedField = useGameStore((state) => state.selectedField);
  const selectField = useGameStore((state) => state.selectField);
  const analysisCompleted = useGameStore((state) => state.analysisCompleted);
  const decisionMade = useGameStore((state) => state.decisionMade);
  const correctDecision = useGameStore((state) => state.correctDecision);
  const updateFieldState = useGameStore((state) => state.updateFieldState);
  const addXP = useGameStore((state) => state.addXP);
  const setFarmHealth = useGameStore((state) => state.setFarmHealth);
  const completeMission = useGameStore((state) => state.completeMission);
  const currentMissionId = useGameStore((state) => state.currentMissionId);
  const fields = useGameStore((state) => state.fields);
  
  // Check for debug mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsDebugMode(params.get('debug') === 'true');
    
    // Set initial game state after loading
    const timer = setTimeout(() => {
      if (introCompleted) {
        setGameState('MAP');
      } else {
        setGameState('INTRO');
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [introCompleted, setGameState]);
  
  const handleSpaceComplete = () => {
    setGameState('INTRO');
  };
  
  const handleIntroComplete = () => {
    setGameState('MAP');
  };
  
  const handleFieldSelect = (fieldId: string) => {
    selectField(fieldId);
    setGameState('MISSION');
  };
  
  const handleMissionContinue = () => {
    if (selectedField) {
      setGameState('ANALYSIS');
    }
  };
  
  const handleAnalysisComplete = () => {
    setGameState('DECISION');
  };
  
  const handleDecisionMade = (correct: boolean) => {
    if (correct) {
      // Update field state
      if (selectedField) {
        updateFieldState(selectedField, 'resolved');
        
        // Update farm health
        const currentField = fields.find(f => f.id === selectedField);
        if (currentField && currentField.state === 'critical') {
          setFarmHealth(Math.min(100, (useGameStore.getState().farmHealth || 72) + 14));
        }
      }
      
      // Add XP
      addXP(120);
      
      // Complete mission
      if (currentMissionId) {
        completeMission(currentMissionId);
      }
    }
    
    setGameState('RESULT');
  };
  
  const handleResultContinue = () => {
    if (correctDecision) {
      // Return to map
      selectField(null);
      setGameState('MAP');
    } else {
      // Go back to decision
      setGameState('DECISION');
    }
  };
  
  const handleBackToMap = () => {
    selectField(null);
    setGameState('MAP');
  };
  
  const handleBackFromAnalysis = () => {
    selectField(null);
    setGameState('MAP');
  };
  
  const handleBackFromDecision = () => {
    setGameState('ANALYSIS');
  };
  
  // Render current scene based on game state
  const renderScene = () => {
    switch (gameState) {
      case 'LOADING':
        return (
          <div className="loading-screen">
            <div className="loading-spinner" />
            <div style={{ fontSize: 12 }}>Загрузка...</div>
          </div>
        );
        
      case 'INTRO':
        return <IntroScene onComplete={handleIntroComplete} />;
        
      case 'MAP':
        return <MapScene onFieldSelect={handleFieldSelect} />;
        
      case 'MISSION':
        // Show bottom sheet with mission info
        return (
          <>
            <MapScene onFieldSelect={handleFieldSelect} />
            {/* Bottom sheet would go here - simplified for MVP */}
            <div style={{
              position: 'absolute',
              bottom: 80,
              left: 12,
              right: 12,
              background: '#fef3c7',
              color: '#1e293b',
              padding: 16,
              borderRadius: 8,
              border: '3px solid #1e293b',
              zIndex: 200,
            }}>
              <h3 style={{ fontSize: 12, marginBottom: 8 }}>
                ⚠ Аномалия обнаружена
              </h3>
              <p style={{ fontSize: 9, marginBottom: 12, lineHeight: 1.4 }}>
                Спутниковые данные показывают проблему на этом участке.
                Необходим срочный анализ.
              </p>
              <button 
                className="game-button"
                style={{ width: '100%' }}
                onClick={handleMissionContinue}
              >
                Провести анализ
              </button>
            </div>
          </>
        );
        
      case 'ANALYSIS':
        return selectedField ? (
          <AnalysisScene 
            fieldId={selectedField}
            onBack={handleBackFromAnalysis}
            onComplete={handleAnalysisComplete}
          />
        ) : null;
        
      case 'DECISION':
        return selectedField ? (
          <DecisionScene
            fieldId={selectedField}
            onBack={handleBackFromDecision}
            onDecisionMade={handleDecisionMade}
          />
        ) : null;
        
      case 'RESULT':
        return (
          <ResultScene
            correct={correctDecision ?? false}
            xpGained={120}
            onContinue={handleResultContinue}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="app-container">
      {renderScene()}
      {isDebugMode && <DebugPanel />}
    </div>
  );
}

export default App;
