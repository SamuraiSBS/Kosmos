import { mockSatelliteData, SatelliteData } from './mockSatelliteData'

export const satelliteService = {
  async getFieldAnalysis(fieldId: string): Promise<SatelliteData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const data = mockSatelliteData[fieldId]
    
    if (!data) {
      throw new Error(`No data available for field ${fieldId}`)
    }
    
    return data
  },
  
  async scanField(fieldId: string): Promise<void> {
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 1500))
  },
}
