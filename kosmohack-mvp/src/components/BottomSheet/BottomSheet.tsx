import React from 'react'
import { motion } from 'framer-motion'
import './BottomSheet.css'

export interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <motion.div
      className={`bottom-sheet-overlay ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bottom-sheet"
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bottom-sheet-header">
          <h3 className="bottom-sheet-title">{title}</h3>
          <button className="bottom-sheet-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="bottom-sheet-content">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
