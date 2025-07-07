
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import RealTimeMetrics from '@/components/RealTimeMetrics';

const Metricas = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen picanthon-gradient">
      <div className="px-4 py-4">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost" 
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </div>
      
      <RealTimeMetrics />
    </div>
  );
};

export default Metricas;
