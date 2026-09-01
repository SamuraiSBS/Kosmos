import { motion } from 'framer-motion';
import { useGameStore } from '../game/gameStore';
import { GameAsset } from '../components/GameAsset/GameAsset';
import { Field } from '../components/Field/Field';
import { useState, useEffect } from 'react';

const TILE_SIZE = 40;
const MAP_SIZE = 1200;

// Map objects configuration
const MAP_OBJECTS = [
  { id: 'house', type: 'farmHouse' as const, x: 8, y: 12 },
  { id: 'satellite', type: 'satelliteStation' as const, x: 18, y: 6 },
  { id: 'water', type: 'water' as const, x: 4, y: 18, width: 4, height: 3 },
  { id: 'tree-1', type: 'tree' as const, x: 3, y: 5 },
  { id: 'tree-2', type: 'tree' as const, x: 25, y: 8 },
  { id: 'tree-3', type: 'tree' as const, x: 22, y: 18 },
];

interface MapSceneProps {
  onFieldSelect: (fieldId: string) => void;
}

export const MapScene: React.FC<MapSceneProps> = ({ onFieldSelect }) => {
  const fields = useGameStore((state: any) => state.fields);
  const xp = useGameStore((state: any) => state.xp);
  const farmHealth = useGameStore((state: any) => state.farmHealth);
  const currentMissionId = useGameStore((state: any) => state.currentMissionId);
  
  // Calculate viewport transform for mobile
  const getViewportScale = () => {
    const viewportWidth = Math.min(window.innerWidth, 390);
    const viewportHeight = Math.min(window.innerHeight, 844);
    
    // Account for HUD and nav
    const availableWidth = viewportWidth - 20;
    const availableHeight = viewportHeight - 150;
    
    return Math.min(availableWidth / MAP_SIZE, availableHeight / MAP_SIZE);
  };
  
  const [scale, setScale] = useState(getViewportScale());
  
  useEffect(() => {
    const handleResize = () => setScale(getViewportScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const missions = useGameStore((state: any) => state.missions);
  const currentMission = missions.find((m: any) => m.id === currentMissionId);
  
  return (
    <div className="map-scene">
      {/* HUD */}
      <div className="hud">
        <div style={{ background: 'rgba(30, 41, 59, 0.9)', padding: '8px 12px', borderRadius: 4 }}>
          <div style={{ fontSize: 10, color: '#fcd34d', marginBottom: 4 }}>⭐ XP</div>
          <div style={{ fontSize: 14 }}>{xp}</div>
        </div>
        
        <div style={{ background: 'rgba(30, 41, 59, 0.9)', padding: '8px 12px', borderRadius: 4 }}>
          <div style={{ fontSize: 10, color: '#86efac', marginBottom: 4 }}>🌱 Здоровье</div>
          <div style={{ 
            width: 100, 
            height: 12, 
            background: '#1e293b',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${farmHealth}%`,
              height: '100%',
              background: farmHealth > 70 ? '#22c55e' : farmHealth > 40 ? '#eab308' : '#ef4444',
            }} />
          </div>
          <div style={{ fontSize: 10, marginTop: 2 }}>{farmHealth}%</div>
        </div>
      </div>
      
      {/* Mission indicator */}
      {currentMission && !currentMission.locked && (
        <div style={{
          position: 'absolute',
          top: 70,
          left: 12,
          right: 12,
          background: 'rgba(254, 243, 199, 0.95)',
          color: '#1e293b',
          padding: 10,
          borderRadius: 6,
          border: '3px solid #1e293b',
          fontSize: 9,
          zIndex: 50,
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>📍 Миссия:</div>
          <div>{currentMission.description}</div>
        </div>
      )}
      
      {/* Map container with pan/zoom */}
      <motion.div
        className="map-container"
        style={{
          transform: `scale(${scale})`,
        }}
        drag
        dragMomentum={false}
      >
        {/* Background grass */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#86efac',
        }} />
        
        {/* Roads */}
        <div style={{
          position: 'absolute',
          left: '40%',
          top: 0,
          bottom: 0,
          width: TILE_SIZE * 1.5,
          background: '#9ca3af',
          border: '2px solid #4b5563',
        }} />
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: TILE_SIZE,
          background: '#9ca3af',
          border: '2px solid #4b5563',
        }} />
        
        {/* Fields */}
        {fields.map((field: any) => (
          <Field
            key={field.id}
            field={field}
            tileSize={TILE_SIZE}
            onSelect={() => onFieldSelect(field.id)}
          />
        ))}
        
        {/* Map objects */}
        {MAP_OBJECTS.map((obj) => (
          <motion.div
            key={obj.id}
            style={{
              position: 'absolute',
              left: obj.x * TILE_SIZE,
              top: obj.y * TILE_SIZE,
              width: (obj.width || 1) * TILE_SIZE,
              height: (obj.height || 1) * TILE_SIZE,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <GameAsset
              asset={obj.type}
              width={(obj.width || 1) * TILE_SIZE}
              height={(obj.height || 1) * TILE_SIZE}
            />
          </motion.div>
        ))}
        
        {/* Player placeholder - centered on map */}
        <motion.div
          style={{
            position: 'absolute',
            left: 12 * TILE_SIZE,
            top: 10 * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE * 1.2,
          }}
        >
          <GameAsset asset="player" width={TILE_SIZE} height={TILE_SIZE * 1.2} />
        </motion.div>
      </motion.div>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active">Карта</button>
        <button className="nav-item">Анализ</button>
        <button className="nav-item">Задания</button>
        <button className="nav-item">Профиль</button>
      </nav>
    </div>
  );
};
