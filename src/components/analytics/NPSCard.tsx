
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, TrendingUp, AlertTriangle } from 'lucide-react';

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

  const getNPSIcon = (score: number) => {
    if (score >= 50) return <Heart className="w-5 h-5 text-green-400" fill="currentColor" />;
    if (score >= 0) return <TrendingUp className="w-5 h-5 text-yellow-400" />;
    return <AlertTriangle className="w-5 h-5 text-red-400" />;
  };

  // Fixed rotation calculation: -100 should be at 0 degrees (left), +100 should be at 180 degrees (right)
  const getRotationAngle = (score: number) => {
    // Clamp the score between -100 and 100
    const clampedScore = Math.max(-100, Math.min(100, score));
    // Map -100 to 0 degrees, +100 to 180 degrees
    return ((clampedScore + 100) / 200) * 180;
  };

  const angle = getRotationAngle(nps);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center text-lg font-semibold">
          📊 Net Promoter Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          {/* Velocímetro moderno */}
          <div className="relative w-56 h-32 mx-auto">
            {/* Fondo con sombra suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 rounded-t-full"></div>
            
            <svg
              width="224"
              height="128"
              viewBox="0 0 224 128"
              className="absolute inset-0 drop-shadow-lg"
            >
              {/* Arco base */}
              <path
                d="M 20 108 A 92 92 0 0 1 204 108"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Gradientes para los segmentos */}
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#f87171", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#ef4444", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#fbbf24", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#f59e0b", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#4ade80", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#22c55e", stopOpacity: 1}} />
                </linearGradient>
              </defs>
              
              {/* Segmento rojo (-100 a 0) */}
              <path
                d="M 20 108 A 92 92 0 0 1 112 20"
                fill="none"
                stroke="url(#redGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              
              {/* Segmento amarillo (0 a 50) */}
              <path
                d="M 112 20 A 92 92 0 0 1 158 36"
                fill="none"
                stroke="url(#yellowGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              
              {/* Segmento verde (50 a 100) */}
              <path
                d="M 158 36 A 92 92 0 0 1 204 108"
                fill="none"
                stroke="url(#greenGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              
              {/* Aguja moderna con transformación fija */}
              <g transform={`rotate(${angle} 112 108)`} style={{ transformOrigin: '112px 108px' }}>
                <line
                  x1="112"
                  y1="108"
                  x2="112"
                  y2="32"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                />
                <circle
                  cx="112"
                  cy="108"
                  r="8"
                  fill="white"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                />
                <circle
                  cx="112"
                  cy="108"
                  r="4"
                  fill="rgba(255, 255, 255, 0.9)"
                />
              </g>
            </svg>
            
            {/* Marcadores modernos con mejor alineación */}
            <div className="absolute inset-0 text-xs font-medium text-white/70">
              <span className="absolute left-2 bottom-0 transform translate-y-1">-100</span>
              <span className="absolute left-1/2 top-2 transform -translate-x-1/2">0</span>
              <span className="absolute right-2 bottom-0 transform translate-y-1">+100</span>
            </div>
            
            {/* Número del NPS centrado en el velocímetro */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className={`text-4xl font-bold ${getNPSColor(nps)} tracking-tight`}>
                {Math.round(nps)}
              </div>
            </div>
          </div>
          
          {/* Etiqueta con ícono */}
          <div className="flex items-center justify-center space-x-2">
            {getNPSIcon(nps)}
            <span className={`text-xl font-semibold ${getNPSColor(nps)}`}>
              {getNPSLabel(nps)}
            </span>
          </div>
          
          {/* Descripción contextual */}
          <div className="text-white/70 text-sm font-medium">
            {nps >= 50 && "¡Excelente! Tus clientes te recomiendan activamente"}
            {nps >= 0 && nps < 50 && "Bien, pero hay oportunidades de mejora"}
            {nps < 0 && "Atención: es urgente mejorar la experiencia"}
          </div>
          
          {/* Barra de progreso sutil */}
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                nps >= 50 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                nps >= 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                'bg-gradient-to-r from-red-400 to-red-500'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, (nps + 100) / 2))}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NPSCard;
