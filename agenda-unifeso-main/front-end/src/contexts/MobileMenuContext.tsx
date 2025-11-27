import {createContext, useState} from 'react';

// Interface para definir a tipagem do contexto
interface IMobileMenuContext{
  menuVisible: boolean;
  setMobileMenuVisible: (setMobileMenuVisible: boolean) => void;
}

// Declaração da interface para tipagem das propriedades.
interface IMobileMenuProps{
  children: React.ReactNode;
}

// Criação do contexto com os estados e funções de alteração
export const MobileMenuContext = createContext({} as IMobileMenuContext);

// Componente que irá prover o contexto para a aplicação
export const MobileMenuContextProvider = ({children}: IMobileMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);


  return(
    <MobileMenuContext.Provider value={{menuVisible, setMobileMenuVisible: setMenuVisible}}>
      {children}
    </MobileMenuContext.Provider>
  );
}