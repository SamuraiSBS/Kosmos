import { motion } from 'framer-motion';
import { Field as FieldType } from '../../game/types';

interface FieldProps {
  field: FieldType;
  tileSize: number;
  onSelect: () => void;
}

export const Field: React.FC<FieldProps> = ({ field, tileSize, onSelect }) => {
  const gridSize = Math.sqrt(field.tiles);
  const size = tileSize * gridSize;
  
  // Get field color based on state
  const getStateColor = (state: FieldType['state']) => {
    switch (state) {
      case 'healthy': return '#22c55e';
      case 'warning': return '#eab308';
      case 'critical': return '#f97316';
      case 'resolved': return '#4ade80';
    }
  };
  
  const isCritical = field.state === 'critical';
  const isLocked = field.locked === true;
  
  // Animation for tile-by-tile change
  const getTileAnimation = (index: number) => {
    if (isLocked) return {};
    
    return {
      initial: { opacity: 0.3 },
      animate: { opacity: 1 },
      transition: { delay: index * 0.05, duration: 0.3 },
    };
  };
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: field.x * tileSize,
        top: field.y * tileSize,
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        gap: 2,
        padding: 4,
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        border: isCritical 
          ? '3px solid #c2410c' 
          : isLocked 
            ? '3px solid #6b7280' 
            : '3px solid rgba(0, 0, 0, 0.2)',
        opacity: isLocked ? 0.5 : 1,
        pointerEvents: isLocked ? 'none' : 'auto',
      }}
      onClick={onSelect}
      whileHover={isLocked ? {} : { scale: 1.02 }}
      animate={isCritical ? { boxShadow: ['0 0 0 rgba(249, 115, 22, 0)', '0 0 20px rgba(249, 115, 22, 0.6)', '0 0 0 rgba(249, 115, 22, 0)'] } : {}}
      transition={isCritical ? { duration: 1.5, repeat: Infinity } : {}}
    >
      {/* Render individual tiles with animation */}
      {Array.from({ length: field.tiles }).map((_, i) => (
        <motion.div
          key={i}
          className={`field-tile ${isCritical ? 'critical' : ''}`}
          style={{
            backgroundColor: getStateColor(field.state),
            borderRadius: 2,
          }}
          {...getTileAnimation(i)}
        />
      ))}
      
      {/* Locked overlay */}
      {isLocked && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}>
          <div style={{
            fontSize: 24,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          }}>
            🔒
          </div>
        </div>
      )}
      
      {/* Field label */}
      <div style={{
        position: 'absolute',
        bottom: -24,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 8,
        color: isLocked ? '#6b7280' : '#1e293b',
        fontWeight: 'bold',
        background: 'rgba(254, 243, 199, 0.9)',
        padding: '2px 4px',
        borderRadius: 2,
      }}>
        {field.name}{isLocked ? ' (заблокировано)' : ''}
      </div>
      
      {/* Critical marker */}
      {isCritical && (
        <motion.div
          className="interactive-marker"
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 16,
            height: 16,
            background: '#ef4444',
            border: '2px solid white',
            borderRadius: '50%',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <span style={{ fontSize: 10, lineHeight: 1 }}>!</span>
        </motion.div>
      )}
    </motion.div>
  );
};
