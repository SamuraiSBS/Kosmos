import { AssetId, assetRegistry } from '../../game/assetRegistry';

interface GameAssetProps {
  asset: AssetId;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export const GameAsset: React.FC<GameAssetProps> = ({ 
  asset, 
  width = 48, 
  height = 48,
  className = '',
  onClick,
}) => {
  const assetConfig = assetRegistry[asset];
  
  if (!assetConfig || assetConfig.type !== 'placeholder') {
    // Future: render image asset
    return <div style={{ width, height }} className={className} />;
  }
  
  // Render placeholder based on asset type
  return (
    <div 
      className={`game-asset ${className}`}
      style={{ 
        width, 
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClick}
    >
      {asset === 'player' && <PlayerPlaceholder width={width} height={height} />}
      {asset === 'npcHelper' && <NPCPlaceholder width={width} height={height} />}
      {asset === 'farmHouse' && <HousePlaceholder width={width} height={height} />}
      {asset === 'satelliteStation' && <SatellitePlaceholder width={width} height={height} />}
      {asset === 'tree' && <TreePlaceholder width={width} height={height} />}
      {asset === 'water' && <WaterPlaceholder width={width} height={height} />}
      {asset === 'grass' && <GrassPlaceholder width={width} height={height} />}
      {asset === 'road' && <RoadPlaceholder width={width} height={height} />}
      {asset === 'fieldHealthy' && <FieldPlaceholder state="healthy" width={width} height={height} />}
      {asset === 'fieldWarning' && <FieldPlaceholder state="warning" width={width} height={height} />}
      {asset === 'fieldCritical' && <FieldPlaceholder state="critical" width={width} height={height} />}
      {asset === 'fieldResolved' && <FieldPlaceholder state="resolved" width={width} height={height} />}
    </div>
  );
};

// Placeholder components - easily replaceable with images later

const PlayerPlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{
    width: width * 0.6,
    height: height * 0.8,
    backgroundColor: '#4ade80',
    borderRadius: 2,
    border: '2px solid #166534',
  }}>
    <div style={{
      width: width * 0.4,
      height: height * 0.3,
      backgroundColor: '#fcd34d',
      margin: '2px auto',
      borderRadius: 2,
    }} />
  </div>
);

const NPCPlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{
    width: width * 0.6,
    height: height * 0.8,
    backgroundColor: '#60a5fa',
    borderRadius: 2,
    border: '2px solid #1e40af',
  }}>
    <div style={{
      fontSize: height * 0.4,
      lineHeight: 1,
    }}>🤖</div>
  </div>
);

const HousePlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ position: 'relative', width, height }}>
    <div style={{
      position: 'absolute',
      bottom: 0,
      width: width * 0.7,
      height: height * 0.6,
      backgroundColor: '#d97706',
      border: '2px solid #92400e',
      borderRadius: 2,
    }} />
    <div style={{
      position: 'absolute',
      bottom: height * 0.6,
      width: 0,
      height: 0,
      borderLeft: `${width * 0.4}px solid transparent`,
      borderRight: `${width * 0.4}px solid transparent`,
      borderBottom: `${height * 0.3}px solid #dc2626`,
    }} />
  </div>
);

const SatellitePlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ position: 'relative', width, height }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: width * 0.5,
      height: height * 0.5,
      backgroundColor: '#6366f1',
      borderRadius: '50%',
      border: '2px solid #3730a3',
    }} />
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: width * 0.3,
      height: height * 0.1,
      backgroundColor: '#9ca3af',
    }} />
    <div style={{
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      width: width * 0.3,
      height: height * 0.1,
      backgroundColor: '#9ca3af',
    }} />
  </div>
);

const TreePlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ position: 'relative', width, height }}>
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: width * 0.2,
      height: height * 0.4,
      backgroundColor: '#78350f',
      borderRadius: 2,
    }} />
    <div style={{
      position: 'absolute',
      bottom: height * 0.3,
      left: '50%',
      transform: 'translateX(-50%)',
      width: width * 0.7,
      height: height * 0.6,
      backgroundColor: '#16a34a',
      borderRadius: '50%',
      border: '2px solid #14532d',
    }} />
  </div>
);

const WaterPlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{
    width,
    height,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    border: '2px solid #1d4ed8',
    opacity: 0.8,
  }} />
);

const GrassPlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{
    width,
    height,
    backgroundColor: '#86efac',
    borderRadius: 2,
    border: '1px solid #166534',
  }} />
);

const RoadPlaceholder: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{
    width,
    height,
    backgroundColor: '#9ca3af',
    borderRadius: 2,
    border: '1px solid #4b5563',
  }} />
);

interface FieldPlaceholderProps {
  state: 'healthy' | 'warning' | 'critical' | 'resolved';
  width: number;
  height: number;
}

const FieldPlaceholder: React.FC<FieldPlaceholderProps> = ({ state, width, height }) => {
  const colors = {
    healthy: { bg: '#22c55e', border: '#15803d' },
    warning: { bg: '#eab308', border: '#a16207' },
    critical: { bg: '#f97316', border: '#c2410c' },
    resolved: { bg: '#4ade80', border: '#16a34a' },
  };
  
  const color = colors[state];
  
  return (
    <div style={{
      width,
      height,
      backgroundColor: color.bg,
      borderRadius: 2,
      border: `2px solid ${color.border}`,
    }} />
  );
};
