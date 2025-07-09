
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AIFeedbackData } from '@/types/analytics';
import ExecutiveSummaryCard from './ExecutiveSummaryCard';
import ThemeAnalysisCard from './ThemeAnalysisCard';
import SegmentAnalysisCard from './SegmentAnalysisCard';
import NPSCard from './NPSCard';
import GoogleSheetsConnector from './GoogleSheetsConnector';
import MetricCard from '../MetricCard';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

interface AIAnalyticsDashboardProps {
  apiUrl?: string;
  mockData?: AIFeedbackData;
}

const AIAnalyticsDashboard: React.FC<AIAnalyticsDashboardProps> = ({ 
  apiUrl = 'https://augustus2425.app.n8n.cloud/webhook/picanthon-metrics',
  mockData
}) => {
  const [data, setData] = useState<AIFeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [dataSource, setDataSource] = useState<'api' | 'sheets'>('api');

  const fetchFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const fetchedData = await response.json();
      setData(fetchedData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching AI analytics:', error);
      setError('Error al cargar el análisis desde API. Usando datos de ejemplo.');
      
      if (mockData) {
        setData(mockData);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSheetsData = (sheetsData: AIFeedbackData) => {
    setData(sheetsData);
    setError(null);
    setDataSource('sheets');
  };

  useEffect(() => {
    if (dataSource === 'api') {
      fetchFromAPI();
    }
  }, [dataSource]);

  // Loading state
  if (loading && !data) {
    return <LoadingSpinner />;
  }

  // Error state without fallback data
  if (error && !data && !mockData) {
    return <ErrorMessage message={error} onRetry={fetchFromAPI} />;
  }

  const currentData = data || mockData;
  
  if (!currentData) {
    return <ErrorMessage message="No hay datos disponibles" onRetry={fetchFromAPI} />;
  }

  const basicMetrics = [
    { key: 'probabilidadVolver', title: 'Probabilidad de Volver', icon: '↩️' },
    { key: 'calificacionLugar', title: 'Calificación Lugar', icon: '🏢' },
    { key: 'calificacionComida', title: 'Calificación Comida', icon: '🍕' },
    { key: 'experienciaMentores', title: 'Experiencia Mentores', icon: '👥' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          📊 Análisis de Feedback con IA
        </h2>
        {lastUpdate && (
          <p className="text-gray-300 text-sm mt-1">
            Actualizado: {lastUpdate.toLocaleTimeString()} 
            <span className="ml-2 text-xs">
              ({dataSource === 'api' ? 'API' : 'Google Sheets'})
            </span>
          </p>
        )}
      </div>

      {/* Data Source Selector */}
      <Tabs value={dataSource} onValueChange={(value) => setDataSource(value as 'api' | 'sheets')}>
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="api" className="text-white">
            🔗 API / Webhook
          </TabsTrigger>
          <TabsTrigger value="sheets" className="text-white">
            📊 Google Sheets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sheets" className="mt-6">
          <GoogleSheetsConnector onDataReceived={handleGoogleSheetsData} />
        </TabsContent>
      </Tabs>

      {error && dataSource === 'api' && (
        <div className="bg-yellow-500/20 border border-yellow-500/20 rounded-lg p-4">
          <p className="text-yellow-300 text-sm">⚠️ {error}</p>
        </div>
      )}

      {/* Executive Summary */}
      <ExecutiveSummaryCard summary={currentData.análisis_detallado.executive_summary} />

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {basicMetrics.map((metric) => (
          <MetricCard
            key={metric.key}
            title={metric.title}
            value={currentData[metric.key as keyof AIFeedbackData] as number}
            icon={metric.icon}
            isLoading={loading}
          />
        ))}
      </div>

      {/* NPS and Advanced Analytics */}
      <div className="grid md:grid-cols-3 gap-6">
        <NPSCard nps={currentData.nps_global} />
        <ThemeAnalysisCard themes={currentData.análisis_detallado.pattern_analysis.recurring_themes} />
        <SegmentAnalysisCard segments={currentData.análisis_detallado.segment_analysis} />
      </div>
    </div>
  );
};

export default AIAnalyticsDashboard;
