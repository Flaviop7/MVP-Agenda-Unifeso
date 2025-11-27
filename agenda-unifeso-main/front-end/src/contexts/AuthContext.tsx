import { createContext, useState } from 'react';

// Definição do tipo do Usuário
interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Definição do Contexto 
interface IAuthContext {
  loggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

// Interface para as Props do Provider
interface IAuthProps {
  children: React.ReactNode;
}

// Exportação do Contexto
export const Context = createContext({} as IAuthContext);

// Exportação do Provider 
export const AuthContext = ({ children }: IAuthProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  // O estado que guarda o usuário logado
  const [user, setUser] = useState<IUser | null>(null);

  return (
   
    //  Fornece os valores corretos
    <Context.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </Context.Provider>
  );
}