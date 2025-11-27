import { IoIosMenu } from "react-icons/io";
import { MobileNav } from "../MobileNav";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { MobileMenuContext } from "../../contexts/MobileMenuContext";

export const Header = () => {
  const {menuVisible, setMobileMenuVisible} = useContext(MobileMenuContext);

  // Renderização do componente
  return (
    <header className="flex w-full py-8 px-8 items-center justify-between bg-primary text-white">
      <div className="flex flex-1 md:flex-[1]">
        <img src="/images/unifesowhite.png" alt="" width={96} />
      </div>

      {
        // TODO: melhorar a responsividade dessa parte
      }
      <div className="text-center hidden xs:flex flex-1 md:flex-[3] flex-col">
        <p className="text-lg font-secondary font-bold whitespace-nowrap">AGENDA FÁCIL - NAF</p>
        <p className="text-xs font-secondary">NÚCLEO DE APOIO CONTÁBIL E FISCAL</p>
      </div>

      <div className="flex flex-1 md:hidden justify-end ">
        <a href="#" onClick={() => setMobileMenuVisible(!menuVisible)}>
          { menuVisible ? <IoClose size={32}/> : <IoIosMenu size={32}/> }
        </a>
      </div>
      <MobileNav />
    </header>
  );
};
