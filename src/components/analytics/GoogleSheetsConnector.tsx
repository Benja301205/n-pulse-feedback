
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, RefreshCw, Settings } from 'lucide-react';
import { AIFeedbackData } from '@/types/analytics';

interface GoogleSheetsConnectorProps {
  onDataReceived: (data: AIFeedbackData) => void;
  sheetUrl?: string;
}

const GoogleSheetsConnector: React.FC<GoogleSheetsConnectorProps> = ({ 
  onDataReceived, 
  sheetUrl 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [currentSheetUrl, setCurrentSheetUrl] = useState(sheetUrl || '');
  const [showConfig, setShowConfig] = useState(!sheetUrl);

  const fetchFromGoogleSheets = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching from Google Sheets:', url);
      
      // Google Apps Script URL debe terminar en /exec para APIs públicas
      const apiUrl = url.includes('/exec') ? url : `${url}/exec`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Data received from Google Sheets:', data);
      
      onDataReceived(data);
      setLastUpdate(new Date());
      
    } catch (error) {
      console.error('Error fetching from Google Sheets:', error);
      setError(`Error al conectar con Google Sheets: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    if (currentSheetUrl.trim()) {
      fetchFromGoogleSheets(currentSheetUrl.trim());
      setShowConfig(false);
    }
  };

  const handleAutoRefresh = () => {
    if (currentSheetUrl) {
      fetchFromGoogleSheets(currentSheetUrl);
    }
  };

  // Auto-refresh cada 2 minutos si hay URL configurada
  useEffect(() => {
    if (currentSheetUrl && !showConfig) {
      const interval = setInterval(() => {
        handleAutoRefresh();
      }, 120000); // 2 minutos

      return () => clearInterval(interval);
    }
  }, [currentSheetUrl, showConfig]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center">
            📊 Conexión Google Sheets
          </span>
          <Button
            onClick={() => setShowConfig(!showConfig)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showConfig && (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 block mb-2">
                URL de Google Apps Script:
              </label>
              <input
                type="url"
                value={currentSheetUrl}
                onChange={(e) => setCurrentSheetUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="bg-blue-500/20 border border-blue-500/20 rounded p-3">
              <p className="text-blue-300 text-sm">
                <strong>💡 Configuración requerida:</strong>
                <br />1. Crea un Google Apps Script
                <br />2. Publica como aplicación web
                <br />3. Copia la URL aquí
              </p>
            </div>
            
            <Button 
              onClick={handleConnect}
              disabled={!currentSheetUrl.trim() || loading}
              className="w-full"
            >
              {loading ? 'Conectando...' : 'Conectar'}
            </Button>
          </div>
        )}

        {!showConfig && currentSheetUrl && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">
                Estado: {loading ? 'Actualizando...' : 'Conectado'}
              </span>
              <Button
                onClick={handleAutoRefresh}
                disabled={loading}
                variant="outline"
                size="sm"
                className="text-white border-white/20 hover:bg-white/10"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>
            
            {lastUpdate && (
              <p className="text-xs text-gray-400">
                Última actualización: {lastUpdate.toLocaleString()}
              </p>
            )}
            
            <div className="text-xs text-gray-400">
              Auto-refresh cada 2 minutos
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/20 rounded p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {!showConfig && (
          <div className="border-t border-white/10 pt-3">
            <a
              href="https://script.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 text-sm flex items-center"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Abrir Google Apps Script
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsConnector;
