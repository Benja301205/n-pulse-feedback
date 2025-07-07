
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, BarChart3 } from "lucide-react";

const Resultados = () => {
  const navigate = useNavigate();
  const [realTimeData, setRealTimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Mock data - usado como fallback
  const mockResults = {
    topTemasMantenidos: [{
      tema: "Excelente networking y mentores",
      count: 23
    }, {
      tema: "Ambiente increíble y buena energía",
      count: 19
    }, {
      tema: "Dinámicas de pitch muy útiles",
      count: 16
    }],
    promedioVolver: 4.2,
    sugerenciasCambios: ["Más tiempo para el desarrollo", "Mejor comunicación de los criterios", "Espacios de descanso más cómodos"],
    ideasAgregar: ["Workshops técnicos adicionales", "Más tiempo de networking", "Actividades de team building"],
    testimoniosDestacados: ["La experiencia superó mis expectativas. Los mentores fueron increíbles y aprendí muchísimo.", "El formato de la hackathon es perfecto, solo necesitamos más tiempo para desarrollar las ideas.", "Excelente organización y muy buena onda de todos los participantes."],
    promediosPorPregunta: [{
      pregunta: "Probabilidad de volver",
      promedio: 4.2
    }, {
      pregunta: "Lugar",
      promedio: 4.5
    }, {
      pregunta: "Comida",
      promedio: 4.1
    }, {
      pregunta: "Mentores",
      promedio: 4.7
    }, {
      pregunta: "Mini games",
      promedio: 3.8
    }, {
      pregunta: "Consigna",
      promedio: 4.0
    }, {
      pregunta: "Pitch",
      promedio: 4.3
    }, {
      pregunta: "Decisión jueces",
      promedio: 3.9
    }]
  };

  const fetchRealTimeData = async () => {
    try {
      setLoading(true);
      console.log('Fetching real-time data...');
      const response = await fetch('https://augustus2425.app.n8n.cloud/webhook/picanthon-metrics');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Real-time data received:', data);
      setRealTimeData(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      setRealTimeData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealTimeData();
  }, []);

  // Usar datos reales si están disponibles, sino usar mock
  const currentResults = realTimeData ? {
    ...mockResults,
    promedioVolver: realTimeData.probabilidadVolver,
    promediosPorPregunta: [
      { pregunta: "Probabilidad de volver", promedio: realTimeData.probabilidadVolver },
      { pregunta: "Lugar", promedio: realTimeData.calificacionLugar },
      { pregunta: "Comida", promedio: realTimeData.calificacionComida },
      { pregunta: "Mentores", promedio: realTimeData.experienciaMentores },
      { pregunta: "Mini games", promedio: realTimeData.calificacionMiniGames },
      { pregunta: "Consigna", promedio: realTimeData.calificacionConsigna },
      { pregunta: "Pitch", promedio: realTimeData.dinamicaPitch },
      { pregunta: "Decisión jueces", promedio: realTimeData.decisionJueces }
    ]
  } : mockResults;

  return (
    <div className="min-h-screen picanthon-gradient py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate("/")} variant="ghost" className="text-white hover:bg-white/10 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Resultados del Feedback
              </h1>
              <p className="text-gray-300 text-lg">
                Esto es lo que los participantes nos dijeron sobre la Picanthón.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <div className="flex gap-2">
                <Button 
                  onClick={fetchRealTimeData} 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10"
                  disabled={loading}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
                
                <Button 
                  onClick={() => navigate("/metricas")} 
                  variant="outline" 
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard Completo
                </Button>
              </div>
              
              {realTimeData && lastUpdate && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-300">
                    TIEMPO REAL - {lastUpdate.toLocaleTimeString()}
                  </span>
                </div>
              )}
              
              {!realTimeData && !loading && (
                <span className="text-sm text-yellow-300">
                  📊 Usando datos de ejemplo
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lo que más gustó - Top Temas */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                ❤️ Lo que más les gustó
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentResults.topTemasMantenidos.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white">{item.tema}</span>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      {item.count} menciones
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Intención de Volver */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                ❤️ Intención de Volver
                {realTimeData && <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">REAL</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {currentResults.promedioVolver}/5
                </div>
                <div className="text-pink-300 text-lg">
                  {Math.round(currentResults.promedioVolver * 20)}% de probabilidad promedio
                </div>
                <div className="mt-4 bg-white/10 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full transition-all duration-1000" 
                    style={{ width: `${currentResults.promedioVolver * 20}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lo que cambiarían */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                🔧 Lo que cambiarían
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentResults.sugerenciasCambios.map((sugerencia, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white">{sugerencia}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lo que agregarían */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                ➕ A los participantes les encantaría agregar...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentResults.ideasAgregar.map((idea, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white">{idea}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonios Destacados */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              📝 Testimonios Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentResults.testimoniosDestacados.map((testimonio, index) => (
                <div key={index} className="border-l-4 border-purple-400 pl-4">
                  <p className="text-gray-300 italic">"{testimonio}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Promedios */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              📊 Promedio por Pregunta
              {realTimeData && <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">TIEMPO REAL</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentResults.promediosPorPregunta.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white text-sm">{item.pregunta}</span>
                    <span className="text-white font-semibold">{item.promedio}/5</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${item.promedio / 5 * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            {realTimeData 
              ? 'Datos en tiempo real • Actualizado automáticamente'
              : 'Resultados procesados automáticamente con IA • Datos anónimos y seguros'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resultados;
