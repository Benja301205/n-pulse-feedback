
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AIAnalyticsDashboard from "@/components/analytics/AIAnalyticsDashboard";
import { AIFeedbackData } from "@/types/analytics";

const Resultados = () => {
  const navigate = useNavigate();

  // Mock data con la nueva estructura de IA
  const mockAIData: AIFeedbackData = {
    probabilidadVolver: 4.2,
    calificacionLugar: 4.5,
    calificacionComida: 4.1,
    experienciaMentores: 4.7,
    calificacionMiniGames: 3.8,
    calificacionConsigna: 4.0,
    dinamicaPitch: 4.3,
    decisionJueces: 3.9,
    nps_global: 45,
    análisis_detallado: {
      executive_summary: {
        key_message: "Evento exitoso con excelente respuesta de participantes. Mentores destacados como fortaleza principal.",
        trend: "mejorando",
        overall_health_score: 7.8
      },
      pattern_analysis: {
        recurring_themes: [
          {
            theme: "MENTORES_EXCELENTES",
            frequency: "89%",
            sentiment: 0.9,
            impact: "muy positivo"
          },
          {
            theme: "NETWORKING_VALIOSO",
            frequency: "76%",
            sentiment: 0.8,
            impact: "positivo"
          },
          {
            theme: "TIEMPO_DESARROLLO_CORTO",
            frequency: "68%",
            sentiment: -0.4,
            severity: "media"
          }
        ]
      },
      segment_analysis: {
        high_engaged: {
          percentage: 45,
          avg_nps: 9.2
        },
        at_risk: {
          percentage: 15,
          avg_nps: 4.5
        }
      }
    }
  };


  return (
    <div className="min-h-screen picanthon-gradient py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate("/")} variant="ghost" className="text-white hover:bg-white/10 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🧠 Análisis de Feedback con IA
              </h1>
              <p className="text-gray-300 text-lg">
                Insights procesados automáticamente sobre la experiencia de los participantes.
              </p>
            </div>
            
          </div>
        </div>

        <AIAnalyticsDashboard 
          apiUrl="https://augustus2425.app.n8n.cloud/webhook/picanthon-metrics"
          mockData={mockAIData}
        />

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            🤖 Análisis procesado con IA • Datos actualizados en tiempo real • Información anónima y segura
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resultados;
