
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MetricCard from './MetricCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface MetricsData {
  probabilidadVolver: number;
  calificacionLugar: number;
  calificacionComida: number;
  experienciaMentores: number;
  calificacionMiniGames: number;
  calificacionConsigna: number;
  dinamicaPitch: number;
  decisionJueces: number;
}

const RealTimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      console.log('Fetching metrics from API...');
      const response = await fetch('https://augustus2425.app.n8n.cloud/webhook/picanthon-metrics');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Metrics received:', data);
      setMetrics(data);
      setError(null);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setError('Error al cargar métricas. Verifique la conexión.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // 30 segundos
    return () => clearInterval(interval);
  }, []);

  const metricsConfig = [
    { key: 'probabilidadVolver', title: 'Probabilidad de Volver', icon: '↩️' },
    { key: 'calificacionLugar', title: 'Calificación Lugar', icon: '🏢' },
    { key: 'calificacionComida', title: 'Calificación Comida', icon: '🍕' },
    { key: 'experienciaMentores', title: 'Experiencia Mentores', icon: '👥' },
    { key: 'calificacionMiniGames', title: 'Mini Games', icon: '🎮' },
    { key: 'calificacionConsigna', title: 'Consigna', icon: '📋' },
    { key: 'dinamicaPitch', title: 'Dinámica Pitch', icon: '🎤' },
    { key: 'decisionJueces', title: 'Decisión Jueces', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen picanthon-gradient py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Métricas en Tiempo Real de Picanthon
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Dashboard actualizado cada 30 segundos
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <Button 
              onClick={fetchMetrics} 
              variant="outline" 
              className="text-white border-white/20 hover:bg-white/10"
              disabled={loading}
            >
              🔄 Actualizar Ahora
            </Button>
            
            {lastUpdate && (
              <span className="text-sm text-gray-400">
                Última actualización: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && !metrics && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={fetchMetrics} />}

        {/* Metrics Grid */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsConfig.map((config) => (
              <MetricCard
                key={config.key}
                title={config.title}
                value={metrics[config.key as keyof MetricsData]}
                icon={config.icon}
                isLoading={loading}
              />
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Datos actualizados automáticamente • Conexión segura con API
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;
