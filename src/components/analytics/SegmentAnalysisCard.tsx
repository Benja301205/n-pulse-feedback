import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SegmentAnalysis } from '@/types/analytics';

interface SegmentAnalysisCardProps {
  segments: SegmentAnalysis;
}

const SegmentAnalysisCard: React.FC<SegmentAnalysisCardProps> = ({ segments }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          👥 Análisis de Segmentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* High Engaged */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-300 font-medium flex items-center gap-2">
                🔥 Altamente Comprometidos
              </span>
              <span className="text-white font-bold">
                {segments.high_engaged.percentage}%
              </span>
            </div>
            <Progress value={segments.high_engaged.percentage} className="h-3" />
            <div className="text-right">
              <span className="text-sm text-gray-300">
                NPS Promedio: <span className="text-green-300 font-semibold">
                  {segments.high_engaged.avg_nps}
                </span>
              </span>
            </div>
          </div>

          {/* At Risk */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-red-300 font-medium flex items-center gap-2">
                ⚠️ En Riesgo
              </span>
              <span className="text-white font-bold">
                {segments.at_risk.percentage}%
              </span>
            </div>
            <Progress value={segments.at_risk.percentage} className="h-3" />
            <div className="text-right">
              <span className="text-sm text-gray-300">
                NPS Promedio: <span className="text-red-300 font-semibold">
                  {segments.at_risk.avg_nps}
                </span>
              </span>
            </div>
          </div>

          {/* Neutral Segment (calculated) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-yellow-300 font-medium flex items-center gap-2">
                😐 Neutros
              </span>
              <span className="text-white font-bold">
                {100 - segments.high_engaged.percentage - segments.at_risk.percentage}%
              </span>
            </div>
            <Progress 
              value={100 - segments.high_engaged.percentage - segments.at_risk.percentage} 
              className="h-3" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentAnalysisCard;