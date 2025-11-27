import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { BookingList } from "../../components/";

export const ListingPage = () => {
  const { loggedIn } = useContext(Context);
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


  // Construção da página de listagem de agendamentos.
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="h-full w-1/4 hidden md:block"></div>
      <BookingList />
    </div>
  );
};
