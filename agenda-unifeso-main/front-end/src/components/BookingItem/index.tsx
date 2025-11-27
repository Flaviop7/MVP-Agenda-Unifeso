import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Context } from "../../contexts/ListingContext";

interface IBooking {
  city: string;
  date: string; // date deve estar no formato ISO (yyyy-mm-dd) recebido via formulário
  time: string;
  type: number;
}

export const BookingItem = ({ city, date, time, type }: IBooking) => {
  const {removeListing} = useContext(Context)
  const bookingtype = [
    "Consultar meu imposto de renda",
    "Consultar minha restituição",
    "Emitir DARF para pagar o imposto",
    "Entregar documentos de malha fiscal",
    "Retificar notificação de lançamento",
    "Impugnar notificação de lançamento",
    "Declarar imposto de renda",
  ];

  // Função para formatar a data no formato dd/mm/aaaa
  const formatDate = (isoDate: string) => {
    const parsedDate = new Date(isoDate);
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Meses começam do zero
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para remover um agendamento
  const handleRemove = (listing: IBooking) => {
    const confirmation = confirm(`Tem certeza que deseja remover o agendamento: ${bookingtype[type] + " - " + city + " - " + time + " - " + date }?`);
    if (confirmation){
      removeListing(listing);
    }
  }

  // Componente que renderiza um agendamento
  return (
    <div className="flex flex-col md:flex-row items-center border-y hover:bg-neutral-200 cursor-pointer">
      <span className="flex w-full md:w-4/12 py-3 truncate"><span className="font-bold mr-2 md:hidden">Tipo:</span>{bookingtype[type]}</span>
      <span className="flex w-full md:w-2/12 py-3 truncate"><span className="font-bold mr-2 md:hidden">Local:</span>{city}</span>
      <span className="flex w-full md:w-2/12 py-3"><span className="font-bold mr-2 md:hidden">Data:</span>{formatDate(date)}</span>
      <span className="flex w-full md:w-2/12 py-3"><span className="font-bold mr-2 md:hidden">Horário:</span>{time} h</span>
      <span className="flex w-full md:w-2/12 py-3 justify-end md:justify-center" title="Cancelar esse agendamento?">
        <FaRegTrashAlt size={20} color="#aa0000" onClick={() => handleRemove({city, date, time, type})} />
      </span>
    </div>
  );
};
