import { useState, ChangeEvent, FormEvent } from "react";
// Importação do Axios para a comunicação com o banco
import axios from "axios"; 
import { InputField, Button } from "../";
import { useNavigate } from "react-router-dom";

// Definição da interface 
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupForm = () => {
  const navigate = useNavigate();

  // Estado do formulário 
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Manipulador de mudança de campos 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Aletração do contexto para async
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validações
    const emptyFields = Object.entries(formData).filter(([, value]) => value.trim() === "");
    if (emptyFields.length > 0) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não conferem.");
      return;
    }

    
    try {
      const registerData = {
        name: formData.username,
        email: formData.email,
        password: formData.password
      };

      //Envia para o back-end
      await axios.post('http://localhost:3001/register', registerData);

      // mensagem de cadastro realizado
      alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      navigate("/signin");

    } catch (error) {
      // Erros
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro no cadastro:', error.response.data.message);
        alert(error.response.data.message); 
      } else {
        console.error('Erro inesperado:', error);
        alert('Erro inesperado ao tentar cadastrar.');
      }
    }
  };

  // Função para limpar os campos 
  const clearForm = () => {
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

 
  return (
    <div className="bg-primary text-white flex flex-col w-full md:w-2/5 rounded-3xl items-center justify-center px-4 py-8">
      <h1 className="font-sans text-3xl uppercase">Crie sua Conta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full p-4 gap-y-3">
        <InputField
          label="Usuário"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Usuário"
        />
        <InputField
          label="E-Mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-Mail"
        />
        <InputField
          label="Senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
        />
        <InputField
          label="Confirmação de Senha"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmação de Senha"
        />

        <div className="flex gap-x-2 mt-6">
          <Button type="button" onClick={clearForm} style="alternate">
            Limpar
          </Button>
          <Button type="submit" className="bg-rose-700 hover:bg-rose-600 hover:transition-all">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

