import React from 'react'
import { useGameStore } from '../../game/gameStore'
import { GameAsset } from '../GameAsset/GameAsset'
import './MapScene.css'

const TILE_SIZE = 40
const MAP_WIDTH = 12
const MAP_HEIGHT = 12

export const MapScene: React.FC = () => {
  const fieldTiles = useGameStore((state) => state.fieldTiles)
  const setScene = useGameStore((state) => state.setScene)
  const setSelectedField = useGameStore((state) => state.setSelectedField)

  const handleTileClick = (tileId: string, state: string) => {
    if (state === 'locked') return
    
    setSelectedField('field-a')
    setScene('MISSION')
  }

  const getAssetForState = (state: string): string => {
    switch (state) {
      case 'healthy':
        return 'fieldHealthy'
      case 'warning':
        return 'fieldWarning'
      case 'critical':
        return 'fieldCritical'
      case 'resolved':
        return 'fieldResolved'
      default:
        return 'grass'
    }
  }

  return (
    <div className="map-scene">
      <div className="map-container">
        {/* Map background */}
        <div className="map-background" />
        
        {/* Field grid */}
        <div 
          className="field-grid"
          style={{
            gridTemplateColumns: `repeat(5, ${TILE_SIZE}px)`,
            gridTemplateRows: `repeat(5, ${TILE_SIZE}px)`,
          }}
        >
          {fieldTiles.map((tile) => (
            <div
              key={tile.id}
              className={`field-tile field-tile-${tile.state}`}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                gridColumn: tile.x + 1,
                gridRow: tile.y + 1,
              }}
              onClick={() => handleTileClick(tile.id, tile.state)}
            >
              <GameAsset
                id={`tile-${tile.id}`}
                asset={getAssetForState(tile.state)}
                width={TILE_SIZE}
                height={TILE_SIZE}
              />
            </div>
          ))}
        </div>

        {/* Other map objects */}
        <div className="map-objects">
          <div className="farm-house" style={{ left: 280, top: 320 }}>
            <GameAsset
              id="farm-house"
              asset="farmHouse"
              width={80}
              height={60}
            />
          </div>
          
          <div className="satellite-station" style={{ left: 360, top: 120 }}>
            <GameAsset
              id="satellite-station"
              asset="satelliteStation"
              width={60}
              height={60}
            />
          </div>
          
          <div className="tree" style={{ left: 120, top: 200 }}>
            <GameAsset
              id="tree-1"
              asset="tree"
              width={40}
              height={40}
            />
          </div>
          
          <div className="tree" style={{ left: 440, top: 280 }}>
            <GameAsset
              id="tree-2"
              asset="tree"
              width={40}
              height={40}
            />
          </div>
          
          <div className="water" style={{ left: 40, top: 360 }}>
            <GameAsset
              id="water"
              asset="water"
              width={80}
              height={60}
            />
          </div>
        </div>
        
        {/* Player placeholder */}
        <div className="player" style={{ left: 240, top: 240 }}>
          <GameAsset
            id="player"
            asset="player"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  )
}
