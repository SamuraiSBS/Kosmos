import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SpaceSceneProps {
  onComplete: () => void;
}

export const SpaceScene: React.FC<SpaceSceneProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'space' | 'approach' | 'clouds' | 'field'>('space');
  const [showSkip, setShowSkip] = useState(true);
  
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    // Phase 1: Space view (2 seconds)
    timers.push(setTimeout(() => {
      setPhase('approach');
    }, 2000));
    
    // Phase 2: Approach Earth (1.5 seconds)
    timers.push(setTimeout(() => {
      setPhase('clouds');
    }, 3500));
    
    // Phase 3: Through clouds (1 second)
    timers.push(setTimeout(() => {
      setPhase('field');
    }, 4500));
    
    // Phase 4: Field view -> complete (0.5 seconds)
    timers.push(setTimeout(() => {
      onComplete();
    }, 5000));
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);
  
  const handleSkip = () => {
    setShowSkip(false);
    onComplete();
  };
  
  // Generate stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    size: Math.random() * 3 + 1 + 'px',
    delay: Math.random() * 2 + 's',
  }));
  
  // Generate clouds
  const clouds = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100 + '%',
    top: Math.random() * 60 + 20 + '%',
    width: Math.random() * 100 + 80 + 'px',
    height: Math.random() * 40 + 30 + 'px',
    delay: Math.random() * 2 + 's',
  }));
  
  return (
    <div className="space-scene">
      {/* Stars */}
      <AnimatePresence>
        {phase === 'space' || phase === 'approach' && (
          <>
            {stars.map((star) => (
              <motion.div
                key={`star-${star.id}`}
                className="star"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2,
                  delay: parseFloat(star.delay),
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Satellite */}
      <motion.div
        className="satellite"
        initial={{ x: '-50%', y: 0 }}
        animate={phase === 'approach' ? { scale: 0.5, opacity: 0 } : {}}
        transition={{ duration: 1.5 }}
      />
      
      {/* Earth */}
      <motion.div
        className="earth"
        initial={{ scale: 0.3, opacity: 0.8 }}
        animate={phase === 'approach' ? { scale: 3, opacity: 0 } : {}}
        transition={{ duration: 1.5, ease: 'easeIn' }}
      />
      
      {/* Cloud layer */}
      <motion.div
        className="cloud-layer"
        style={{ position: 'absolute' }}
        initial={{ opacity: 0 }}
        animate={phase === 'clouds' || phase === 'field' ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {clouds.map((cloud) => (
          <motion.div
            key={`cloud-${cloud.id}`}
            className="cloud"
            style={{
              left: cloud.left,
              top: cloud.top,
              width: cloud.width,
              height: cloud.height,
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={phase === 'clouds' ? { x: [0, 100, 200], opacity: [0, 1, 0] } : {}}
            transition={{
              duration: 2,
              delay: parseFloat(cloud.delay),
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
      
      {/* Field appearing */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#86efac',
        }}
        initial={{ opacity: 0 }}
        animate={phase === 'field' ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      />
      
      {/* Skip button */}
      {showSkip && (
        <button className="skip-button" onClick={handleSkip}>
          Пропустить
        </button>
      )}
    </div>
  );
};
