import { motion } from 'framer-motion';
import { useGameStore } from '../game/gameStore';
import { satelliteService } from '../services/satelliteService';
import { useState, useEffect } from 'react';

interface AnalysisSceneProps {
  fieldId: string;
  onBack: () => void;
  onComplete: () => void;
}

export const AnalysisScene: React.FC<AnalysisSceneProps> = ({ 
  fieldId, 
  onBack,
  onComplete,
}) => {
  const [loading, setLoading] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const analysisCompleted = useGameStore((state: any) => state.analysisCompleted);
  const setAnalysisCompleted = useGameStore((state: any) => state.setAnalysisCompleted);
  
  const [data, setData] = useState<{
    fieldName: string;
    plantHealth: number;
    moisture: number;
    vegetationIndexChange: number;
    riskLevel: string;
    problem: string;
    description: string;
  } | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await satelliteService.getFieldAnalysis(fieldId);
        setData(result);
        
        // Animate scan progress
        for (let i = 0; i <= 100; i += 5) {
          setScanProgress(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        setLoading(false);
        setAnalysisCompleted(true);
      } catch (error) {
        console.error('Failed to load analysis:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [fieldId, setAnalysisCompleted]);
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#9ca3af';
    }
  };
  
  const getValueColor = (value: number, inverse = false) => {
    if (inverse) {
      // For moisture - higher is better
      if (value > 60) return '#22c55e';
      if (value > 40) return '#eab308';
      return '#ef4444';
    } else {
      // For plant health - higher is better
      if (value > 80) return '#22c55e';
      if (value > 60) return '#eab308';
      return '#ef4444';
    }
  };
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1e293b',
      padding: 20,
      overflow: 'auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: '2px solid #fef3c7',
            color: '#fef3c7',
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
          color: '#fef3c7',
          fontWeight: 'bold',
        }}>
          🛰 Спутниковый сканер
        </div>
        
        <div style={{ width: 60 }} />
      </div>
      
      {/* Field name */}
      <div style={{
        fontSize: 14,
        color: '#fef3c7',
        marginBottom: 16,
        textAlign: 'center',
      }}>
        {data?.fieldName || 'Загрузка...'}
      </div>
      
      {/* Satellite image placeholder */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        maxWidth: 280,
        margin: '0 auto 20px',
        background: '#0f172a',
        borderRadius: 8,
        border: '3px solid #334155',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />
        
        {/* Problem area highlight */}
        {!loading && data && data.riskLevel === 'high' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              position: 'absolute',
              top: '10%',
              left: '20%',
              right: '20%',
              bottom: '40%',
              background: 'rgba(249, 115, 22, 0.4)',
              border: '2px dashed #f97316',
              borderRadius: 4,
            }}
          />
        )}
        
        {/* Scan line */}
        {loading && (
          <motion.div
            className="scanline"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 3,
              background: 'rgba(59, 130, 246, 0.8)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}
        
        {/* Loading text */}
        {loading && (
          <div style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 10,
            color: '#60a5fa',
          }}>
            Анализ участка... {scanProgress}%
          </div>
        )}
      </div>
      
      {/* Stats */}
      {!loading && data && (
        <motion.div
          className="analysis-panel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="analysis-stat">
            <span className="stat-label">Состояние растений</span>
            <span 
              className="stat-value"
              style={{ color: getValueColor(data.plantHealth) }}
            >
              {data.plantHealth}%
            </span>
          </div>
          
          <div className="analysis-stat">
            <span className="stat-label">Влажность</span>
            <span 
              className="stat-value"
              style={{ color: getValueColor(data.moisture, true) }}
            >
              {data.moisture}%
            </span>
          </div>
          
          <div className="analysis-stat">
            <span className="stat-label">Изменение индекса</span>
            <span 
              className="stat-value"
              style={{ 
                color: data.vegetationIndexChange < -10 ? '#ef4444' : 
                       data.vegetationIndexChange < 0 ? '#eab308' : '#22c55e',
              }}
            >
              {data.vegetationIndexChange > 0 ? '+' : ''}{data.vegetationIndexChange}%
            </span>
          </div>
          
          <div className="analysis-stat">
            <span className="stat-label">Риск</span>
            <span 
              className="stat-value high"
              style={{ color: getRiskColor(data.riskLevel) }}
            >
              {data.riskLevel === 'high' ? 'Высокий' :
               data.riskLevel === 'medium' ? 'Средний' : 'Низкий'}
            </span>
          </div>
        </motion.div>
      )}
      
      {/* Problem description */}
      {!loading && data && (
        <motion.div
          style={{
            marginTop: 20,
            padding: 16,
            background: 'rgba(249, 115, 22, 0.1)',
            border: '2px solid #f97316',
            borderRadius: 8,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div style={{
            fontSize: 12,
            color: '#fcd34d',
            marginBottom: 8,
            fontWeight: 'bold',
          }}>
            ⚠ {data.problem}
          </div>
          <div style={{
            fontSize: 10,
            color: '#fef3c7',
            lineHeight: 1.6,
          }}>
            {data.description}
          </div>
        </motion.div>
      )}
      
      {/* Continue button */}
      {!loading && (
        <motion.button
          className="game-button"
          style={{
            width: '100%',
            marginTop: 24,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onComplete}
        >
          Выбрать решение
        </motion.button>
      )}
    </div>
  );
};
