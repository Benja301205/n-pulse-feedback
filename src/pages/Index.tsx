
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen picanthon-gradient flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Contanos cómo viviste la
          <span className="block text-6xl md:text-8xl bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Picanthón
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Queremos entender qué funcionó y qué mejorar para la próxima edición.
          Tu feedback es fundamental para hacer de la Picanthón una experiencia aún mejor.
        </p>

        <Button 
          onClick={() => navigate("/formulario")}
          className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          Compartir mi experiencia
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-gray-500 text-sm">
          Una iniciativa de <span className="text-red-400 font-semibold">Picante Fund</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
