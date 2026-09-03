import React, { useEffect } from 'react'
import { useGameStore } from './game/gameStore'
import { SpaceScene } from './scenes/SpaceScene'
import { MapScene } from './scenes/MapScene'
import { IntroScene } from './scenes/IntroScene'
import { AnalysisScene } from './scenes/AnalysisScene'
import { DecisionScene } from './scenes/DecisionScene'
import { ResultScene } from './scenes/ResultScene'
import { BottomNavigation } from './components/BottomNavigation/BottomNavigation'
import { HUD } from './components/HUD/HUD'
import { DebugPanel } from './components/DebugPanel/DebugPanel'
import './App.css'

const App: React.FC = () => {
  const scene = useGameStore((state) => state.scene)
  const introCompleted = useGameStore((state) => state.introCompleted)
  const debugMode = new URLSearchParams(window.location.search).get('debug') === 'true'

  // Handle initial scene transition
  useEffect(() => {
    const timer = setTimeout(() => {
      useGameStore.getState().setScene('INTRO')
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const renderScene = () => {
    switch (scene) {
      case 'LOADING':
      case 'INTRO':
        return <SpaceScene />
      
      case 'MAP':
      case 'MISSION':
        return <MapScene />
      
      case 'ANALYSIS':
        return <AnalysisScene />
      
      case 'DECISION':
        return <DecisionScene />
      
      case 'RESULT':
        return <ResultScene />
      
      default:
        return <SpaceScene />
    }
  }

  return (
    <div className="app">
      {renderScene()}
      
      {introCompleted && scene !== 'LOADING' && scene !== 'INTRO' && (
        <>
          <HUD />
          <BottomNavigation />
        </>
      )}
      
      {debugMode && <DebugPanel />}
    </div>
  )
}

export default App
