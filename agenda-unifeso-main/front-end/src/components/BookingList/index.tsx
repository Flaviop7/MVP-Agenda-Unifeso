import { useContext } from "react";
import { BookingItem } from "../BookingItem";
import { Context } from "../../contexts/ListingContext";

export const BookingList = () => {
  const { listings } = useContext(Context);

  if (!listings || listings.length === 0) {
    return (
      <div className="flex w-full items-center justify-center p-8 text-lg">
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      </div>
    );
  }

  // Ordenar os agendamentos por data e horário
  const sortedListings = [...listings].sort((b, a) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime(); // Ordem ascendente (mais antigos primeiro)
  });

  // Componente que renderiza a lista de agendamentos
  return (
    <div className="w-full md:w-8/12">
      <div className="w-full hidden md:flex">
          <span className="flex w-4/12 font-bold">Tipo do Agendamento</span>
          <span className="flex w-2/12 font-bold">Local</span>
          <span className="flex w-2/12 font-bold">Data</span>
          <span className="flex w-2/12 font-bold">Horário</span>
          <span className="flex w-2/12 font-bold justify-center">Cancelar?</span>
      </div>
      <div className="w-full md:w8/12">
        {sortedListings.map((booking, index) => (
          <BookingItem
            key={`${index}-${booking.city}-${booking.date}-${booking.time}`}
            type={booking.type}
            city={booking.city}
            date={booking.date}
            time={booking.time}
          />
        ))}
      </div>
    </div>
  );
};
