import React from 'react'
import { assetRegistry, AssetConfig } from '../../game/assetRegistry'
import './GameAsset.css'

export interface GameAssetProps {
  id: string
  asset: string
  width?: number
  height?: number
  className?: string
  onClick?: () => void
}

export const GameAsset: React.FC<GameAssetProps> = ({
  id,
  asset,
  width = 32,
  height = 32,
  className = '',
  onClick,
}) => {
  const config: AssetConfig | undefined = assetRegistry[asset]
  
  if (!config) {
    return (
      <div 
        id={id}
        className={`game-asset game-asset-missing ${className}`}
        style={{ width, height }}
      >
        ?
      </div>
    )
  }
  
  if (config.type === 'image' && config.src) {
    return (
      <img
        id={id}
        src={config.src}
        alt={asset}
        className={`game-asset game-asset-image ${className}`}
        style={{ width, height }}
        onClick={onClick}
      />
    )
  }
  
  // Placeholder rendering
  return (
    <div
      id={id}
      className={`game-asset game-asset-placeholder ${className}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {config.label || asset}
    </div>
  )
}
