import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const LoginForm = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const { setLoggedIn, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (input1.trim() === "" || input2.trim() === "") {
      alert("Por gentileza, informe o usuário e a senha.");
      return;
    }

    console.log("Tentando login com:", { email: input1, password: input2 });

    try {
      const loginData = { email: input1, password: input2 };
      const response = await axios.post("http://localhost:3001/login", loginData);

      console.log("Login bem-sucedido!", response.data.user);

      setLoggedIn(true);
      setUser(response.data.user);

      // a nova lógica do painel admin está aqui
      if(response.data.user.role === 'admin') {
        // alert('Redirecionando para o Painel Admin');
        navigate('/admin/dashboard'); //rota do painel admin
      
      } else {
        // console.log("AQUI: " + response.data.user.role)
        navigate("/bookings"); //rota normal do cliente
      }
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro no login:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado ao tentar fazer login.");
      }
    }
  };

  return (
    <div className="bg-primary text-white flex flex-col w-full md:w-2/5 rounded-3xl items-center justify-center px-4 py-8">
      <h1 className="font-sans text-3xl uppercase">Login</h1>
      <p className="text-center mb-4">
        Entre com seu usuário e senha para realizar seus agendamentos.
      </p>

      <form className="flex flex-col w-full p-4 gap-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário (seu e-mail)"
          className="p-2 rounded-xl text-black py-4"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />

        <button
          type="button"
          className="uppercase text-xs font-bold text-right hover:text-sky-400"
          onClick={() => alert("Função não implementada na demo!")}
        >
          Esqueci meu usuário
        </button>

        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded-xl text-black py-4"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />

        <button
          type="button"
          className="uppercase text-xs font-bold text-right hover:text-sky-400"
          onClick={() => alert("Função não implementada na demo!")}
        >
          Esqueci minha senha
        </button>

        <div className="flex gap-x-2">
          <Button type="button" style="alternate" onClick={() => navigate("/signup")}>
            Cadastrar-se
          </Button>

          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </div>
  );
};
