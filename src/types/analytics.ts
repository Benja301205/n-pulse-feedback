export interface RecurringTheme {
  theme: string;
  frequency: string;
  sentiment: number;
  severity?: string;
  impact?: string;
}

export interface SegmentData {
  percentage: number;
  avg_nps: number;
}

export interface ExecutiveSummary {
  key_message: string;
  trend: string;
  overall_health_score: number;
}

export interface PatternAnalysis {
  recurring_themes: RecurringTheme[];
}

export interface SegmentAnalysis {
  high_engaged: SegmentData;
  at_risk: SegmentData;
}

export interface DetailedAnalysis {
  executive_summary: ExecutiveSummary;
  pattern_analysis: PatternAnalysis;
  segment_analysis: SegmentAnalysis;
}

export interface AIFeedbackData {
  probabilidadVolver: number;
  calificacionLugar: number;
  calificacionComida: number;
  experienciaMentores: number;
  calificacionMiniGames: number;
  calificacionConsigna: number;
  dinamicaPitch: number;
  decisionJueces: number;
  nps_global: number;
  análisis_detallado: DetailedAnalysis;
}