import { motion } from 'framer-motion';
import { useGameStore } from '../game/gameStore';
import { satelliteService } from '../services/satelliteService';
import { useState, useEffect } from 'react';

interface DecisionSceneProps {
  fieldId: string;
  onBack: () => void;
  onDecisionMade: (correct: boolean) => void;
}

const DECISION_OPTIONS = [
  { id: 'water', label: '💧 Увеличить полив', correct: true },
  { id: 'fertilizer', label: '🌱 Внести удобрения', correct: false },
  { id: 'observe', label: '👁 Продолжить наблюдение', correct: false },
];

export const DecisionScene: React.FC<DecisionSceneProps> = ({ 
  fieldId, 
  onBack,
  onDecisionMade,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [solution, setSolution] = useState<string>('');
  
  useEffect(() => {
    const loadSolution = async () => {
      try {
        const data = await satelliteService.getFieldAnalysis(fieldId);
        setSolution(data.solution);
      } catch (error) {
        console.error('Failed to load solution:', error);
      }
    };
    
    loadSolution();
  }, [fieldId]);
  
  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const option = DECISION_OPTIONS.find(o => o.id === selectedOption);
    if (option) {
      onDecisionMade(option.correct);
    }
  };
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#fef3c7',
      color: '#1e293b',
      padding: 20,
      overflow: 'auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: '2px solid #1e293b',
            color: '#1e293b',
            padding: '8px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 10,
          }}
        >
          ← Назад
        </button>
        
        <div style={{ 
          fontSize: 12, 
          fontWeight: 'bold',
        }}>
          Выбор решения
        </div>
        
        <div style={{ width: 60 }} />
      </div>
      
      {/* Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: 24 }}
      >
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Что сделать с участком?</h2>
        <p style={{ fontSize: 10, color: '#64748b', lineHeight: 1.6 }}>
          Основываясь на данных спутникового анализа,<br />
          выберите правильное решение
        </p>
      </motion.div>
      
      {/* Decision options */}
      <div className="decision-options">
        {DECISION_OPTIONS.map((option, index) => (
          <motion.div
            key={option.id}
            className={`decision-option ${selectedOption === option.id ? 'selected' : ''}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(option.id)}
          >
            <div style={{ 
              fontSize: 12,
              fontWeight: selectedOption === option.id ? 'bold' : 'normal',
            }}>
              {option.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Hint */}
      <motion.div
        style={{
          marginTop: 24,
          padding: 12,
          background: 'rgba(59, 130, 246, 0.1)',
          border: '2px dashed #3b82f6',
          borderRadius: 8,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div style={{ fontSize: 9, color: '#1e40af', lineHeight: 1.6 }}>
          💡 Подсказка: обратите внимание на показатель влажности 
          в данных спутникового анализа.
        </div>
      </motion.div>
      
      {/* Submit button */}
      <motion.button
        className="game-button"
        style={{
          width: '100%',
          marginTop: 24,
          opacity: selectedOption ? 1 : 0.5,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: selectedOption ? 1 : 0.5 }}
        transition={{ delay: 0.6 }}
        disabled={!selectedOption}
        onClick={handleSubmit}
      >
        Применить решение
      </motion.button>
    </div>
  );
};
