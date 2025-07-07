
import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
      <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
      <p className="text-white mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="text-white border-white/20 hover:bg-white/10">
          Reintentar
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
