import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NPSCardProps {
  nps: number;
}

const NPSCard: React.FC<NPSCardProps> = ({ nps }) => {
  const getNPSColor = (score: number) => {
    if (score >= 50) return 'text-green-400';
    if (score >= 0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getNPSLabel = (score: number) => {
    if (score >= 70) return 'Excelente';
    if (score >= 50) return 'Bueno';
    if (score >= 0) return 'Pasivo';
    return 'Crítico';
  };

  const getNPSGradient = (score: number) => {
    if (score >= 50) return 'from-green-500 to-emerald-500';
    if (score >= 0) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          📈 Net Promoter Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className={`text-5xl font-bold ${getNPSColor(nps)}`}>
            {nps}
          </div>
          
          <div className="space-y-2">
            <div className={`text-lg font-medium ${getNPSColor(nps)}`}>
              {getNPSLabel(nps)}
            </div>
            
            <div className="bg-white/10 rounded-full h-4">
              <div 
                className={`bg-gradient-to-r ${getNPSGradient(nps)} h-4 rounded-full transition-all duration-1000`}
                style={{ width: `${Math.max(0, Math.min(100, (nps + 100) / 2))}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-400">
              <span>-100</span>
              <span>0</span>
              <span>+100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NPSCard;