import { mockSatelliteData, type SatelliteData } from '../game/mockSatelliteData';

export const satelliteService = {
  async getFieldAnalysis(fieldId: string): Promise<SatelliteData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const data = mockSatelliteData[fieldId];
    if (!data) {
      throw new Error(`No data for field ${fieldId}`);
    }
    
    return data;
  },
};
