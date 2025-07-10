
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, TrendingUp, AlertTriangle } from 'lucide-react';

interface NPSCardProps {
  nps: number;
}

const NPSCard: React.FC<NPSCardProps> = ({ nps }) => {
  const getNPSColor = (score: number) => {
    if (score >= 50) return 'text-emerald-600';
    if (score >= 0) return 'text-amber-600';
    return 'text-red-500';
  };

  const getNPSLabel = (score: number) => {
    if (score >= 70) return 'Excelente';
    if (score >= 50) return 'Bueno';
    if (score >= 0) return 'Pasivo';
    return 'Crítico';
  };

  const getNPSIcon = (score: number) => {
    if (score >= 50) return <Heart className="w-5 h-5 text-emerald-600" fill="currentColor" />;
    if (score >= 0) return <TrendingUp className="w-5 h-5 text-amber-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const getRotationAngle = (score: number) => {
    return ((score + 100) / 200) * 180;
  };

  const angle = getRotationAngle(nps);

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-800 flex items-center text-lg font-semibold">
          📊 Net Promoter Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-8">
          {/* Velocímetro moderno */}
          <div className="relative w-56 h-32 mx-auto">
            {/* Fondo con sombra suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-full opacity-30"></div>
            
            <svg
              width="224"
              height="128"
              viewBox="0 0 224 128"
              className="absolute inset-0 drop-shadow-sm"
            >
              {/* Arco base más ancho */}
              <path
                d="M 20 108 A 92 92 0 0 1 204 108"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Segmento rojo (-100 a 0) con gradiente */}
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#dc2626", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#ef4444", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#d97706", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#f59e0b", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#059669", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#10b981", stopOpacity: 1}} />
                </linearGradient>
              </defs>
              
              <path
                d="M 20 108 A 92 92 0 0 1 112 20"
                fill="none"
                stroke="url(#redGradient)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Segmento amarillo (0 a 50) */}
              <path
                d="M 112 20 A 92 92 0 0 1 158 36"
                fill="none"
                stroke="url(#yellowGradient)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Segmento verde (50 a 100) */}
              <path
                d="M 158 36 A 92 92 0 0 1 204 108"
                fill="none"
                stroke="url(#greenGradient)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Aguja moderna */}
              <g transform={`rotate(${angle} 112 108)`}>
                <line
                  x1="112"
                  y1="108"
                  x2="112"
                  y2="32"
                  stroke="#374151"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle
                  cx="112"
                  cy="108"
                  r="8"
                  fill="#374151"
                />
                <circle
                  cx="112"
                  cy="108"
                  r="4"
                  fill="white"
                />
              </g>
            </svg>
            
            {/* Marcadores modernos */}
            <div className="absolute inset-0 text-sm font-medium text-gray-500">
              <span className="absolute left-3 bottom-2">-100</span>
              <span className="absolute left-1/2 top-3 transform -translate-x-1/2">0</span>
              <span className="absolute right-3 bottom-2">+100</span>
            </div>
          </div>
          
          {/* Valor NPS con diseño moderno */}
          <div className="space-y-3">
            <div className={`text-5xl font-bold ${getNPSColor(nps)} tracking-tight`}>
              {Math.round(nps)}
            </div>
            
            {/* Etiqueta con ícono */}
            <div className="flex items-center justify-center space-x-2">
              {getNPSIcon(nps)}
              <span className={`text-xl font-semibold ${getNPSColor(nps)}`}>
                {getNPSLabel(nps)}
              </span>
            </div>
            
            {/* Descripción contextual */}
            <div className="text-gray-600 text-sm font-medium">
              {nps >= 50 && "¡Excelente! Tus clientes te recomiendan activamente"}
              {nps >= 0 && nps < 50 && "Bien, pero hay oportunidades de mejora"}
              {nps < 0 && "Atención: es urgente mejorar la experiencia"}
            </div>
          </div>
          
          {/* Barra de progreso sutil */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                nps >= 50 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                nps >= 0 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                'bg-gradient-to-r from-red-500 to-red-600'
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
