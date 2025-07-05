import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Formulario = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responses, setResponses] = useState({
    // Scale questions (1-5)
    probabilidadVolver: "",
    calificacionLugar: "",
    calificacionComida: "",
    experienciaMentores: "",
    calificacionMiniGames: "",
    calificacionConsigna: "",
    dinamicaPitch: "",
    decisionJueces: "",
    // Open questions
    queMantendrías: "",
    queCambiarías: "",
    queAgregarías: ""
  });

  const scaleQuestions = [
    { key: "probabilidadVolver", text: "¿Del 1 al 5 cuán probable es que vuelvas a anotarte a la segunda edición de la Picanthon?" },
    { key: "calificacionLugar", text: "¿Del 1 al 5 qué te pareció el lugar?" },
    { key: "calificacionComida", text: "¿Del 1 al 5 qué te pareció la comida?" },
    { key: "experienciaMentores", text: "¿Del 1 al 5 cómo fue la experiencia de tu grupo con los mentores?" },
    { key: "calificacionMiniGames", text: "¿Del 1 al 5 qué te parecieron los mini games?" },
    { key: "calificacionConsigna", text: "¿Del 1 al 5 qué te pareció la consigna y el output esperado?" },
    { key: "dinamicaPitch", text: "¿Del 1 al 5 qué te pareció la dinámica del pitch/pregunta de mentores? (¿Pudieron transmitir lo que habían creado?)" },
    { key: "decisionJueces", text: "¿Del 1 al 5 qué te pareció la decisión final de los jueces?" }
  ];

  const openQuestions = [
    { key: "queMantendrías", text: "¿Qué mantendrías de la hackathon? ¿Qué fue lo que más te gustó?" },
    { key: "queCambiarías", text: "¿Qué cambiarías de la hackathon? ¿Qué fue lo que menos te gustó?" },
    { key: "queAgregarías", text: "¿Qué agregarías a la Picanthon?" }
  ];

  const handleScaleChange = (questionKey: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionKey]: value }));
  };

  const handleOpenChange = (questionKey: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionKey]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if all scale questions are answered
      const allScaleAnswered = scaleQuestions.every(q => responses[q.key as keyof typeof responses]);
      if (!allScaleAnswered) {
        toast({
          title: "Campos incompletos",
          description: "Por favor responde todas las preguntas de escala (1-5).",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log("Submitting responses:", responses);

      // Updated webhook URL
      const response = await fetch("https://augustus2425.app.n8n.cloud/webhook-test/picanthon-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          responses: responses
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Gracias por tu feedback!",
          description: "Tu respuesta ha sido enviada exitosamente.",
        });
        navigate("/resultados");
      } else {
        throw new Error("Error al enviar respuestas");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu respuesta. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen picanthon-gradient py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            Formulario de Feedback
          </h1>
          <p className="text-gray-300 text-lg">
            Tu opinión nos ayuda a mejorar la experiencia para todos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Scale Questions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Califica tu experiencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {scaleQuestions.map((question) => (
                <div key={question.key} className="space-y-3">
                  <Label className="text-white text-base font-medium leading-relaxed">
                    {question.text}
                  </Label>
                  <RadioGroup
                    value={responses[question.key as keyof typeof responses]}
                    onValueChange={(value) => handleScaleChange(question.key, value)}
                    className="flex space-x-4"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={num.toString()} 
                          id={`${question.key}-${num}`}
                          className="border-white/50 text-white"
                        />
                        <Label 
                          htmlFor={`${question.key}-${num}`}
                          className="text-white cursor-pointer"
                        >
                          {num}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Open Questions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Cuéntanos más</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {openQuestions.map((question) => (
                <div key={question.key} className="space-y-3">
                  <Label className="text-white text-base font-medium leading-relaxed">
                    {question.text}
                  </Label>
                  <Textarea
                    value={responses[question.key as keyof typeof responses]}
                    onChange={(e) => handleOpenChange(question.key, e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar feedback
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
