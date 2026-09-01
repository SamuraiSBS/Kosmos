import { motion } from 'framer-motion';
import { useGameStore } from '../game/gameStore';
import { useState, useEffect } from 'react';

interface IntroSceneProps {
  onComplete: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const setIntroCompleted = useGameStore((state: any) => state.setIntroCompleted);
  
  const handleStart = () => {
    setIntroCompleted(true);
    onComplete();
  };
  
  return (
    <div className="intro-overlay">
      {/* NPC container */}
      <motion.div
        className="npc-container"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* NPC sprite placeholder */}
        <div className="npc-sprite">
          <div style={{
            width: 48,
            height: 64,
            backgroundColor: '#60a5fa',
            borderRadius: 4,
            border: '3px solid #1e40af',
            margin: '0 auto',
            position: 'relative',
          }}>
            <div style={{
              fontSize: 24,
              lineHeight: 1,
              textAlign: 'center',
              marginTop: 8,
            }}>🤖</div>
          </div>
        </div>
        
        {/* Dialogue box */}
        <motion.div
          className="dialog-box"
          style={{ maxWidth: 280 }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <p style={{ marginBottom: 12 }}>Связь установлена.</p>
          <p style={{ marginBottom: 12 }}>
            Спутник обнаружил аномалию на северном участке.
          </p>
          <p style={{ marginBottom: 16 }}>
            Проверь поле и выясни, что произошло.
          </p>
          
          <button className="game-button" onClick={handleStart}>
            Начать
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
