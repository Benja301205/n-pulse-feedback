
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface MetricCardProps {
  title: string;
  value: number;
  icon: string;
  isLoading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, isLoading = false }) => {
  const getColorClass = (value: number) => {
    if (value < 3) return 'text-red-500 border-red-200 bg-red-50/10';
    if (value <= 4) return 'text-yellow-500 border-yellow-200 bg-yellow-50/10';
    return 'text-green-500 border-green-200 bg-green-50/10';
  };

  const getProgressColor = (value: number) => {
    if (value < 3) return 'bg-red-500';
    if (value <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-white/20 rounded mb-4"></div>
        <div className="h-8 bg-white/20 rounded mb-4"></div>
        <div className="h-2 bg-white/20 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 transition-all duration-300 hover:scale-105 ${getColorClass(value)}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm text-gray-300">/5</span>
      </div>
      
      <h3 className="text-white text-sm font-medium mb-2">{title}</h3>
      
      <div className="text-3xl font-bold text-white mb-4 transition-all duration-500">
        {value.toFixed(1)}
      </div>
      
      <div className="space-y-2">
        <Progress value={(value / 5) * 100} className="h-2" />
        <div className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(value)}`} 
             style={{ width: `${(value / 5) * 100}%` }}>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
