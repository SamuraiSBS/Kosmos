import { motion } from 'framer-motion';

interface ResultSceneProps {
  correct: boolean;
  xpGained: number;
  onContinue: () => void;
}

export const ResultScene: React.FC<ResultSceneProps> = ({ 
  correct, 
  xpGained,
  onContinue,
}) => {
  return (
    <div className="result-screen">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        {/* Result icon */}
        <div className="result-icon">
          {correct ? '✅' : '❌'}
        </div>
        
        {/* Title */}
        <motion.h2
          className="result-title"
          style={{ color: correct ? '#22c55e' : '#ef4444' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {correct ? 'Решение принято!' : 'Неверно'}
        </motion.h2>
        
        {/* XP gain */}
        {correct && (
          <motion.div
            className="xp-gain"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            +{xpGained} XP
          </motion.div>
        )}
        
        {/* Message */}
        <motion.p
          className="result-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {correct 
            ? 'Состояние участка улучшилось. Отличная работа! Спутниковые данные подтверждают эффективность решения.'
            : 'Это решение не соответствует данным наблюдения.\n\nПодсказка: обратите внимание на показатель влажности в данных анализа.'
          }
        </motion.p>
        
        {/* Continue button */}
        <motion.button
          className="game-button"
          style={{ marginTop: 24 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onContinue}
        >
          {correct ? 'Вернуться на карту' : 'Попробовать снова'}
        </motion.button>
      </motion.div>
    </div>
  );
};
