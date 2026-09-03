export interface SatelliteData {
  fieldId: string
  fieldName: string
  plantHealth: number
  moisture: number
  vegetationIndexChange: number
  risk: 'low' | 'medium' | 'high'
  problem: string
  description: string
}

export const mockSatelliteData: Record<string, SatelliteData> = {
  'field-a': {
    fieldId: 'field-a',
    fieldName: 'Участок A-04',
    plantHealth: 72,
    moisture: 41,
    vegetationIndexChange: -18,
    risk: 'high',
    problem: 'Недостаток влаги',
    description: 'Спутниковые данные показывают снижение состояния растительности и уровня влажности на северной части участка.',
  },
  'field-b': {
    fieldId: 'field-b',
    fieldName: 'Участок B-01',
    plantHealth: 85,
    moisture: 62,
    vegetationIndexChange: 5,
    risk: 'low',
    problem: '',
    description: 'Территория недоступна для анализа.',
  },
  'field-c': {
    fieldId: 'field-c',
    fieldName: 'Участок C-02',
    plantHealth: 90,
    moisture: 58,
    vegetationIndexChange: 3,
    risk: 'low',
    problem: '',
    description: 'Территория недоступна для анализа.',
  },
}
