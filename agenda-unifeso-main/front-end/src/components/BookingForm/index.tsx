import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../contexts/AuthContext";
import { Button } from "../Button";

// Interface para os itens do banco
interface Item {
  id: number;
  nome: string;
}

export const BookingForm = () => {
  const { user } = useContext(Context);

  // Estados do formulário
  const [formData, setFormData] = useState({
    cidade: "",
    data: "",
    horario: "",
    tipo: "-1", 
  });

  // Estados para as listas dinâmicas
  const [listaCidades, setListaCidades] = useState<Item[]>([]);
  const [listaServicos, setListaServicos] = useState<Item[]>([]);

  // Busca o Banco de Dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await axios.get("http://localhost:3001/cidades");
        const servicesResponse = await axios.get("http://localhost:3001/servicos");
        
        setListaCidades(citiesResponse.data);
        setListaServicos(servicesResponse.data);
      } catch (error) {
        console.error("Erro ao carregar opções:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { cidade, data, horario, tipo } = formData;

   
    console.log("1. Dados do Formulário:", formData);
    console.log("2. Usuário Logado:", user);

    // Validações
    if (tipo === "-1") return alert("Por favor, selecione o tipo do agendamento.");
    if (!cidade || cidade === "vazio") return alert("Por favor, selecione uma cidade.");
    if (!data) return alert("Por favor, selecione uma data.");
    if (!horario) return alert("Por favor, selecione um horário.");

    if (!user || !user.id) {
      console.error("ERRO CRÍTICO: Usuário sem ID ou deslogado", user);
      alert("Erro: Você não está logado corretamente. Faça login novamente.");
      return;
    }

    try {
      const bookingData = {
        local: cidade,       
        data: data,
        horario: horario,
        userId: user.id      
      };

      console.log("3. Enviando este pacote para o servidor:", bookingData);

      await axios.post('http://localhost:3001/agendamentos', bookingData);

      setFormData({ cidade: "", data: "", horario: "", tipo: "-1" });
      alert("Agendamento realizado com sucesso! Foi enviado um email de confirmação.");

    } catch (error: any) {
      console.error("Erro na requisição:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Erro do Servidor: ${error.response.data.message}`); 
      } else {
        alert("Erro inesperado ao tentar agendar.");
      }
    }
  };

  return (
    <div className="bg-primary text-white flex flex-col w-full md:w-2/5 rounded-3xl items-center justify-center px-4 py-8">
      <h1 className="font-sans text-3xl uppercase">Agendamento</h1>
      <form className="flex flex-col w-full p-4 gap-y-3" onSubmit={handleSubmit}>
        <label className="uppercase text-xl font-bold font-secondary" htmlFor="tipo">
          Agendamento
        </label>
        <select name="tipo" id="tipo" className="p-2 rounded-xl text-black py-4 w-full" value={formData.tipo} onChange={handleInputChange}>
          <option value="-1" className="text-neutral-500">
            --- TIPO DO AGENDAMENTO ---
          </option>
          {listaServicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome}
            </option>
          ))}
        </select>
        <label className="uppercase text-xl font-bold font-secondary" htmlFor="cidade">
          Cidade do Agendamento
        </label>
        <select name="cidade" id="cidade" className="p-2 rounded-xl text-black py-4 w-full" value={formData.cidade} onChange={handleInputChange}>
          <option value="vazio" className="text-neutral-500">
            --- SELECIONE UMA CIDADE ---
          </option>
       
          {listaCidades.map((cidade) => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>

        <label className="uppercase text-xl font-bold font-secondary" htmlFor="data">
          Selecione a Data
        </label>
        <input type="date" className="p-2 rounded-xl text-black py-4 w-full" name="data" id="data" value={formData.data} onChange={handleInputChange} />

        <label className="uppercase text-xl font-bold font-secondary" htmlFor="horario">
          Selecione o Horário
        </label>
        <input type="time" className="p-2 rounded-xl text-black py-4 w-full" name="horario" id="horario" value={formData.horario} onChange={handleInputChange} />

        <div className="flex gap-x-2 mt-6">
          <Button type="reset" style="alternate" onClick={() => setFormData({ cidade: "", data: "", horario: "", tipo: "-1" })}>
            Cancelar
          </Button>
          <Button type="submit">
            Agendar
          </Button>
        </div>
      </form>
    </div>
  );
};