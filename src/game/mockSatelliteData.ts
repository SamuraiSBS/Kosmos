export interface SatelliteData {
  fieldId: string;
  fieldName: string;
  plantHealth: number;
  moisture: number;
  vegetationIndexChange: number;
  riskLevel: 'low' | 'medium' | 'high';
  problem: string;
  description: string;
  solution: string;
}

export const mockSatelliteData: Record<string, SatelliteData> = {
  'field-a': {
    fieldId: 'field-a',
    fieldName: 'Северный участок A-04',
    plantHealth: 72,
    moisture: 41,
    vegetationIndexChange: -18,
    riskLevel: 'high',
    problem: 'Недостаток влаги',
    description: 'Спутниковые данные показывают снижение состояния растительности и уровня влажности на северной части участка.',
    solution: 'Увеличить полив',
  },
  'field-b': {
    fieldId: 'field-b',
    fieldName: 'Западный участок B-01',
    plantHealth: 95,
    moisture: 78,
    vegetationIndexChange: 3,
    riskLevel: 'low',
    problem: 'Нет проблем',
    description: 'Участок в отличном состоянии. Продолжайте мониторинг.',
    solution: 'Продолжить наблюдение',
  },
  'field-c': {
    fieldId: 'field-c',
    fieldName: 'Восточный участок C-02',
    plantHealth: 88,
    moisture: 65,
    vegetationIndexChange: -5,
    riskLevel: 'medium',
    problem: 'Лёгкое снижение показателей',
    description: 'Незначительное снижение индекса растительности. Требуется наблюдение.',
    solution: 'Продолжить наблюдение',
  },
};

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
