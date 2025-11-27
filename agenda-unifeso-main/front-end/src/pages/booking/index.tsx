import { useContext, useEffect } from "react";
import { BookingForm } from "../../components";
import { Context } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const BookingPage = () => {
  const {loggedIn} = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loggedIn) {
      navigate("/"); // Redireciona para a página inicial se o usuário não estiver logado
    }
  }, [loggedIn, navigate]); // Executa sempre que `loggedIn` ou `navigate` mudar

  // Se `loggedIn` for falso, o redirecionamento será tratado antes de exibir qualquer conteúdo
  if (!loggedIn) {
    return null; // Evita exibir o conteúdo antes do redirecionamento
  }

  // Conteúdo da página de agendamento.
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="h-full w-1/4 hidden md:block"></div>
      <BookingForm />
    </div>
  );
};
