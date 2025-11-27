import { useContext, useEffect } from "react";
import { Button } from "../../components";
import { Context } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const {loggedIn} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/bookings");
    }
  });

  // O componente HomePage é responsável por exibir a página inicial do site
  return (
    <div className="flex w-full h-full items-center justify-center p-8">
      <div className="h-full w-1/4 hidden md:block mr-20"></div>
      <div className="flex w-full justify-center px-4 py-8 gap-x-7 flex-wrap">
        <img src="/images/details.png" alt="" className="w-64 mb-12" />
        <div className="flex flex-col">
          <h1 className="font-sans text-3xl uppercase mb-4 font-bold">Olá, seja bem vindo!</h1>
          <p className="">Bem vindo ao Agenda Fácil da Rede NAF.</p>
          <p className="mb-12">Um portal desenvolvido para facilitar a sua vida na hora de realizar os agendamentos.</p>
          <p className="mb-2 font-secondary">Clique em uma das opções abaixo para começar:</p>
          <div className="flex w-full gap-x-2">
            <Button type="link" to="/signup" style="alternate">
              Cadastrar-se
            </Button>
            <Button type="link" to="/signin">
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
