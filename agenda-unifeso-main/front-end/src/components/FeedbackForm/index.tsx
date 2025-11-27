import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const FeedbackForm = () => {
  // Estados para controle das estrelas
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const navigate = useNavigate();

  // Função para enviar o feedback
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Por favor, selecione uma nota antes de enviar o feedback.");
      return;
    }

    alert("Feedback enviado! Obrigado pelo seu tempo.");
    navigate("/list");
  };

  // Componente do formulário de feedback
  return (
    <div className="bg-primary text-white flex flex-col w-full md:w-2/5 rounded-3xl items-center justify-center px-4 py-8">
      <h1 className="font-sans text-3xl uppercase">Feedback</h1>
      <p className="text-center mb-4 pb-4 border-b border-green-900 w-8/12">Seu feedback é muito importante para nós!</p>
      <form className="flex flex-col w-full p-4 gap-y-3" onSubmit={(e) => handleSubmit(e)}>

        {/* Estrelas para avaliação */}
        <p className="text-center">Qual é sua nota para o nosso site?</p>
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                size={30}
                className="cursor-pointer"
                color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(starValue)}
              />
            );
          })}
        </div>

        <textarea placeholder="Observações (Opcional)" className="p-2 rounded-xl text-black py-4" rows={8} />
        
        <div className="flex gap-x-2">
          <Button type="submit" full>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};
