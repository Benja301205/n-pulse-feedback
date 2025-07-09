
import { useState, useCallback } from 'react';
import { AIFeedbackData } from '@/types/analytics';

export const useGoogleSheets = () => {
  const [data, setData] = useState<AIFeedbackData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (scriptUrl: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(scriptUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Validar que el resultado tenga la estructura esperada
      if (!result || typeof result !== 'object') {
        throw new Error('Formato de datos inválido recibido de Google Sheets');
      }

      setData(result);
      return result;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    reset
  };
};
