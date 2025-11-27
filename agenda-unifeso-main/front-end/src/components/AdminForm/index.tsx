import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../Button";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

// Interface para tipar os itens do banco
interface Item {
  id: number;
  nome: string;
}

export const AdminForm = () => {
  // ESTADOS PARA OS INPUTS
  const [cityData, setCityData] = useState("");
  const [serviceData, setServiceData] = useState("");
  
  // ESTADOS PARA AS LISTAS (Banco) 
  const [cidades, setCidades] = useState<Item[]>([]);
  const [servicos, setServicos] = useState<Item[]>([]);

  // ESTADOS PARA OS SELECTS
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  // TODO: FUNÇÃO PARA BUSCAR DADOS DO BACK-END 
  const fetchData = async () => {
    try {
      // Busca as duas listas ao mesmo tempo
      const citiesResponse = await axios.get("http://localhost:3001/cidades");
      const servicesResponse = await axios.get("http://localhost:3001/servicos");
      
      setCidades(citiesResponse.data);
      setServicos(servicesResponse.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  // Carrega os dados assim que a tela abre
  useEffect(() => {
    fetchData();
  }, []);


  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceData) return alert("Digite o nome do serviço.");

    try {
      await axios.post("http://localhost:3001/servicos", { nome: serviceData });
      alert("Serviço adicionado com sucesso!");
      setServiceData(""); // Limpa o campo
      fetchData(); // Atualiza a lista
    } catch (error) {
      alert("Erro ao adicionar serviço.");
    }
  };

  const handleDeleteService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) return alert("Selecione um serviço para apagar.");

    try {
      await axios.delete(`http://localhost:3001/servicos/${selectedServiceId}`);
      alert("Serviço removido com sucesso!");
      setSelectedServiceId(""); // Limpa a seleção
      fetchData(); // Atualiza a lista
    } catch (error) {
      alert("Erro ao remover serviço.");
    }
  };

  //AÇÕES DE CIDADE

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityData) return alert("Digite o nome da cidade.");

    try {
      await axios.post("http://localhost:3001/cidades", { nome: cityData });
      alert("Cidade adicionada com sucesso!");
      setCityData("");
      fetchData();
    } catch (error) {
      alert("Erro ao adicionar cidade.");
    }
  };

  const handleDeleteCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId) return alert("Selecione uma cidade para apagar.");

    try {
      await axios.delete(`http://localhost:3001/cidades/${selectedCityId}`);
      alert("Cidade removida com sucesso!");
      setSelectedCityId("");
      fetchData();
    } catch (error) {
      alert("Erro ao remover cidade.");
    }
  };

 
  return (
    <div className="bg-primary text-white flex flex-col w-full md:w-2/5 rounded-t-3xl md:rounded-3xl items-center justify-center p-8 gap-y-8">
      
      {}
      <form onSubmit={handleAddService} className="flex flex-col w-full gap-y-4">
        <label className="uppercase text-xl font-bold font-secondary" htmlFor="addService">
          Agendamento (Serviço)
        </label>
        <div className="flex flex-col md:flex-row w-full gap-x-4 gap-y-4">
          <input 
            type="text" 
            id="addService" 
            value={serviceData} 
            placeholder="Nome do Agendamento" 
            className="p-2 rounded-xl text-black py-4 w-full" 
            onChange={(e) => setServiceData(e.target.value)} 
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-900 w-full md:w-4/12 flex items-center justify-center gap-x-2">
            <FaPlusCircle size={20} />
            Adicionar
          </Button>
        </div>
      </form>

      {}
      <form onSubmit={handleDeleteService} className="flex flex-col w-full gap-y-4 border-b border-green-800 pb-8">
        <div className="flex flex-col md:flex-row w-full gap-x-4 gap-y-4">
          <select 
            className="p-2 rounded-xl text-black py-4 w-full"
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
          >
            <option value="">Selecione um serviço para apagar...</option>
            {/*Lista os serviços do banco*/}
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome}
              </option>
            ))}
          </select>
          <Button type="submit" className="w-full md:w-4/12 flex justify-center items-center gap-x-2">
            <FaTrashAlt />
            Apagar
          </Button>
        </div>
      </form>
      <form onSubmit={handleAddCity} className="flex flex-col w-full gap-y-4 ">
        <label className="uppercase text-xl font-bold font-secondary" htmlFor="addCity">
          Cidade
        </label>
        <div className="flex flex-col md:flex-row w-full gap-x-4 gap-y-4">
          <input 
            type="text" 
            id="addCity" 
            value={cityData} 
            placeholder="Nome da Cidade" 
            className="p-2 rounded-xl text-black py-4 w-full" 
            onChange={(e) => setCityData(e.target.value)} 
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-900 w-full md:w-4/12 flex items-center justify-center gap-x-2">
            <FaPlusCircle size={20} />
            Adicionar
          </Button>
        </div>
      </form>
      <form onSubmit={handleDeleteCity} className="flex flex-col w-full gap-y-4 border-b border-green-800 pb-8">
        <div className="flex flex-col md:flex-row w-full gap-x-4 gap-y-4">
          <select 
            className="p-2 rounded-xl text-black py-4 w-full"
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
          >
            <option value="">Selecione uma cidade para apagar...</option>
            {/* Lista as cidades do banco */}
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
          <Button type="submit" className="w-full md:w-4/12 flex justify-center items-center gap-x-2">
            <FaTrashAlt />
            Apagar
          </Button>
        </div>
      </form>
      <div className="flex flex-col w-full gap-y-4 opacity-50 cursor-not-allowed">
        <label className="uppercase text-xl font-bold font-secondary">
          Data e Horário (Em breve)
        </label>
        <div className="flex flex-col md:flex-row w-full gap-x-4 gap-y-4">
          <input type="date" disabled className="p-2 rounded-xl text-black py-4 flex-1" />
          <input type="time" disabled className="p-2 rounded-xl text-black py-4" />
          <Button type="button" className="bg-gray-500 w-full md:w-3/12 flex items-center justify-center gap-x-2">
            <FaPlusCircle size={20} />
            Adicionar
          </Button>
        </div>
      </div>

    </div>
  );
};