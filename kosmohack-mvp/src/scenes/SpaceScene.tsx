import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../../game/gameStore'
import './SpaceScene.css'

export const SpaceScene: React.FC = () => {
  const setScene = useGameStore((state) => state.setScene)
  const introCompleted = useGameStore((state) => state.introCompleted)
  const skipIntro = useGameStore((state) => state.setIntroCompleted)

  useEffect(() => {
    if (!introCompleted) {
      const timer = setTimeout(() => {
        skipIntro(true)
        setScene('MAP')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [introCompleted, setScene, skipIntro])

  const handleSkip = () => {
    skipIntro(true)
    setScene('MAP')
  }

  return (
    <motion.div
      className="space-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Stars */}
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Earth */}
      <motion.div
        className="earth"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: introCompleted ? 15 : 1, opacity: 1 }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      >
        <div className="earth-surface" />
      </motion.div>

      {/* Clouds layer */}
      <motion.div
        className="clouds-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: introCompleted ? 0 : 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="cloud"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Satellite placeholder */}
      <motion.div
        className="satellite"
        initial={{ x: -100, y: -100, rotate: 0 }}
        animate={{ 
          x: introCompleted ? 500 : 0, 
          y: introCompleted ? 500 : 0,
          rotate: introCompleted ? 360 : 0
        }}
        transition={{ duration: 5, ease: 'linear' }}
      >
        <div className="satellite-body" />
        <div className="satellite-panel-left" />
        <div className="satellite-panel-right" />
      </motion.div>

      {/* Skip button */}
      {!introCompleted && (
        <motion.button
          className="skip-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleSkip}
        >
          Пропустить
        </motion.button>
      )}

      {/* Transition overlay */}
      <motion.div
        className="transition-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: introCompleted ? 1 : 0 }}
        transition={{ delay: 4, duration: 0.5 }}
      />
    </motion.div>
  )
}
