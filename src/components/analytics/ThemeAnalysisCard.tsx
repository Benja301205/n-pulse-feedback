import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecurringTheme } from '@/types/analytics';

interface ThemeAnalysisCardProps {
  themes: RecurringTheme[];
}

const ThemeAnalysisCard: React.FC<ThemeAnalysisCardProps> = ({ themes }) => {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'bg-green-500/20 text-green-300 border-green-500/20';
    if (sentiment < -0.3) return 'bg-red-500/20 text-red-300 border-red-500/20';
    return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20';
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baja': return '🟢';
      default: return '📊';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          🔍 Temas Recurrentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {themes.map((theme, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getSeverityIcon(theme.severity)}</span>
                  <span className="text-white font-medium">
                    {theme.theme.replace(/_/g, ' ')}
                  </span>
                </div>
                <Badge className={getSentimentColor(theme.sentiment)}>
                  {theme.frequency}
                </Badge>
              </div>
              
              <div className="bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    theme.sentiment > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: theme.frequency }}
                ></div>
              </div>
              
              {theme.impact && (
                <p className="text-gray-300 text-sm">
                  Impacto: {theme.impact}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeAnalysisCard;