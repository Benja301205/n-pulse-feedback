
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Heart, Lightbulb, MessageSquare, BarChart3, Plus } from "lucide-react";

const Resultados = () => {
  const navigate = useNavigate();

  // Mock data - In real implementation, this would come from N8n/GPT analysis
  const mockResults = {
    topTemasMantenidos: [
      { tema: "Excelente networking y mentores", count: 23 },
      { tema: "Ambiente increíble y buena energía", count: 19 },
      { tema: "Dinámicas de pitch muy útiles", count: 16 }
    ],
    promedioVolver: 4.2,
    sugerenciasCambios: [
      "Más tiempo para el desarrollo",
      "Mejor comunicación de los criterios",
      "Espacios de descanso más cómodos"
    ],
    ideasAgregar: [
      "Workshops técnicos adicionales",
      "Más tiempo de networking",
      "Actividades de team building"
    ],
    testimoniosDestacados: [
      "La experiencia superó mis expectativas. Los mentores fueron increíbles y aprendí muchísimo.",
      "El formato de la hackathon es perfecto, solo necesitamos más tiempo para desarrollar las ideas.",
      "Excelente organización y muy buena onda de todos los participantes."
    ],
    promediosPorPregunta: [
      { pregunta: "Probabilidad de volver", promedio: 4.2 },
      { pregunta: "Lugar", promedio: 4.5 },
      { pregunta: "Comida", promedio: 4.1 },
      { pregunta: "Mentores", promedio: 4.7 },
      { pregunta: "Mini games", promedio: 3.8 },
      { pregunta: "Consigna", promedio: 4.0 },
      { pregunta: "Pitch", promedio: 4.3 },
      { pregunta: "Decisión jueces", promedio: 3.9 }
    ]
  };

  return (
    <div className="min-h-screen picanthon-gradient py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resultados del Feedback
          </h1>
          <p className="text-gray-300 text-lg">
            Esto es lo que los participantes nos dijeron sobre la Picanthón.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lo que más gustó - Top Temas */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-green-400" />
                ❤️ Lo que más les gustó
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResults.topTemasMantenidos.map((item, index) => (
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
                <Heart className="mr-2 h-6 w-6 text-pink-400" />
                ❤️ Intención de Volver
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {mockResults.promedioVolver}/5
                </div>
                <div className="text-pink-300 text-lg">
                  {Math.round(mockResults.promedioVolver * 20)}% de probabilidad promedio
                </div>
                <div className="mt-4 bg-white/10 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full"
                    style={{ width: `${mockResults.promedioVolver * 20}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lo que cambiarían */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="mr-2 h-6 w-6 text-yellow-400" />
                🔧 Lo que cambiarían
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockResults.sugerenciasCambios.map((sugerencia, index) => (
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
                <Plus className="mr-2 h-6 w-6 text-blue-400" />
                ➕ A los participantes les encantaría agregar...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockResults.ideasAgregar.map((idea, index) => (
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
              <MessageSquare className="mr-2 h-6 w-6 text-purple-400" />
              📝 Testimonios Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.testimoniosDestacados.map((testimonio, index) => (
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
              <BarChart3 className="mr-2 h-6 w-6 text-green-400" />
              📊 Promedio por Pregunta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.promediosPorPregunta.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white text-sm">{item.pregunta}</span>
                    <span className="text-white font-semibold">{item.promedio}/5</span>
                  </div>
                  <div className="bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.promedio / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Resultados procesados automáticamente con IA • Datos anónimos y seguros
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resultados;
