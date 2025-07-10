
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ExecutiveSummary } from '@/types/analytics';

interface ExecutiveSummaryCardProps {
  summary: ExecutiveSummary;
}

const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({ summary }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'mejorando':
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'empeorando':
        return <TrendingDown className="h-5 w-5 text-red-400" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          📋 Resumen Ejecutivo
          {getTrendIcon(summary.trend)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-white text-lg font-medium">
            {summary.key_message}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Salud General del Evento:</span>
            <span className={`text-xl font-bold ${getHealthColor(summary.overall_health_score)}`}>
              {Math.round(summary.overall_health_score)}/10
            </span>
          </div>
          
          <div className="bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${summary.overall_health_score * 10}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummaryCard;
