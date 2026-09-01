import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 199,
            }}
            onClick={onClose}
          />
          
          {/* Bottom Sheet Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'absolute',
              bottom: 80,
              left: 12,
              right: 12,
              background: '#fef3c7',
              color: '#1e293b',
              padding: 16,
              borderRadius: 8,
              border: '3px solid #1e293b',
              zIndex: 200,
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle bar */}
            <div
              style={{
                width: 40,
                height: 4,
                background: '#1e293b',
                borderRadius: 2,
                margin: '0 auto 12px',
                opacity: 0.5,
              }}
            />
            
            {/* Title */}
            <h3 
              style={{ 
                fontSize: 12, 
                marginBottom: 8,
                fontWeight: 'bold',
              }}
            >
              {title}
            </h3>
            
            {/* Content */}
            <div style={{ fontSize: 9, lineHeight: 1.4 }}>
              {children}
            </div>
            
            {/* Footer with actions */}
            {footer && (
              <div style={{ marginTop: 12 }}>
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
