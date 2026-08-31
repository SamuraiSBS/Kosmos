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
        border: isCritical ? '3px solid #c2410c' : '3px solid rgba(0, 0, 0, 0.2)',
      }}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      animate={isCritical ? { boxShadow: ['0 0 0 rgba(249, 115, 22, 0)', '0 0 20px rgba(249, 115, 22, 0.6)', '0 0 0 rgba(249, 115, 22, 0)'] } : {}}
      transition={isCritical ? { duration: 1.5, repeat: Infinity } : {}}
    >
      {/* Render individual tiles */}
      {Array.from({ length: field.tiles }).map((_, i) => (
        <div
          key={i}
          className={`field-tile ${isCritical ? 'critical' : ''}`}
          style={{
            backgroundColor: getStateColor(field.state),
            borderRadius: 2,
          }}
        />
      ))}
      
      {/* Field label */}
      <div style={{
        position: 'absolute',
        bottom: -24,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 8,
        color: '#1e293b',
        fontWeight: 'bold',
        background: 'rgba(254, 243, 199, 0.9)',
        padding: '2px 4px',
        borderRadius: 2,
      }}>
        {field.name}
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
