import { createContext, useState, ReactNode } from 'react';

// Definição das interfaces utilizadas no contexto de listagem
interface IListing {
  city: string;
  date: string;
  time: string;
  type: number;
}

// Definição do contexto de listagem
interface IListingContext {
  listings: IListing[];
  addListing: (listing: IListing) => void;
  removeListing: (listing: IListing) => void;
}

//  Propriedades do contexto de listagem
interface IListingProps {
  children: ReactNode;
}

// Criação do contexto de listagem
export const Context = createContext({} as IListingContext);

// Componente que define o contexto de listagem
export const ListingContext = ({ children }: IListingProps) => {
  const [listings, setListings] = useState<IListing[]>([]);

  // Função que adiciona um item à lista de agendamentos
  const addListing = (listing: IListing) => {
    setListings((prevListings) => [...prevListings, listing]);
  };

  // Função que remove um item da lista de agendamentos
  const removeListing = (listing: IListing) => {
    setListings((prevListings) =>
      prevListings.filter(
        (item) =>
          item.city !== listing.city ||
          item.date !== listing.date ||
          item.time !== listing.time ||
          item.type !== listing.type
      )
    );
  };

  return (
    <Context.Provider value={{ listings, addListing, removeListing }}>
      {children}
    </Context.Provider>
  );
};