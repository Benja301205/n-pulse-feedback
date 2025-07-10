
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

  // Convertir NPS (-100 a +100) a ángulo del velocímetro (0° a 180°)
  const getRotationAngle = (score: number) => {
    // Normalizar de -100/+100 a 0-180 grados
    return ((score + 100) / 200) * 180;
  };

  const angle = getRotationAngle(nps);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          📈 Net Promoter Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          {/* Velocímetro */}
          <div className="relative w-48 h-24 mx-auto">
            {/* Arco base del velocímetro */}
            <svg
              width="192"
              height="96"
              viewBox="0 0 192 96"
              className="absolute inset-0"
            >
              {/* Arco de fondo */}
              <path
                d="M 16 80 A 80 80 0 0 1 176 80"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Segmento rojo (-100 a 0) */}
              <path
                d="M 16 80 A 80 80 0 0 1 96 16"
                fill="none"
                stroke="#ef4444"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Segmento amarillo (0 a 50) */}
              <path
                d="M 96 16 A 80 80 0 0 1 136 32"
                fill="none"
                stroke="#eab308"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Segmento verde (50 a 100) */}
              <path
                d="M 136 32 A 80 80 0 0 1 176 80"
                fill="none"
                stroke="#22c55e"
                strokeWidth="12"
                strokeLinecap="round"
              />
              
              {/* Aguja del velocímetro */}
              <g transform={`rotate(${angle} 96 80)`}>
                <line
                  x1="96"
                  y1="80"
                  x2="96"
                  y2="24"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="96"
                  cy="80"
                  r="4"
                  fill="white"
                />
              </g>
            </svg>
            
            {/* Marcadores de valores */}
            <div className="absolute inset-0 text-xs text-gray-400">
              <span className="absolute left-2 bottom-0">-100</span>
              <span className="absolute left-1/2 top-2 transform -translate-x-1/2">0</span>
              <span className="absolute right-2 bottom-0">+100</span>
            </div>
          </div>
          
          {/* Valor NPS */}
          <div className={`text-4xl font-bold ${getNPSColor(nps)}`}>
            {Math.round(nps)}
          </div>
          
          {/* Etiqueta */}
          <div className={`text-lg font-medium ${getNPSColor(nps)}`}>
            {getNPSLabel(nps)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NPSCard;
