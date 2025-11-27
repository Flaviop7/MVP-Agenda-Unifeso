import clsx from "clsx";
import { FaCalendarAlt, FaHome, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { MobileMenuContext } from "../../contexts/MobileMenuContext";
import { useContext, useEffect, useRef } from "react";
import { IoMdExit } from "react-icons/io";

// Declaração de interface para tipagem das propriedades
interface MenuLinkProps {
  url: string;
  icon: React.ReactNode;
  text: string;
  display?: boolean;
}

// Renderização do componente de link de menu para dispositivos móveis
export const MobileMenuLink = ({ url, icon, text, display = true }: MenuLinkProps) => {
  const { menuVisible, setMobileMenuVisible } = useContext(MobileMenuContext);

  const handleClick = () => {
    setMobileMenuVisible(!menuVisible);
  };

  return (
    <Link to={url} className={clsx({ hidden: !display }, "flex gap-2 items-center border-b border-neutral-300 p-4 text-black hover:bg-neutral-300 transition-colors")} onClick={handleClick}>
      {icon}
      {text}
    </Link>
  );
};

// Renderização do componente de navegação para dispositivos móveis
export const MobileNav = () => {
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const { menuVisible, setMobileMenuVisible } = useContext(MobileMenuContext);
  const { loggedIn, user, setLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  const handleOutsideClick = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setMobileMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuVisible]);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div ref={mobileMenuRef} className={clsx({ block: menuVisible, hidden: !menuVisible }, "absolute top-24 right-6 shadow-md w-3/5")}>
      <div className="bg-white w-6 h-6 rotate-45 absolute right-2 -top-2 md:hidden"></div>
      <ul className="bg-white flex flex-col md:hidden rounded-lg overflow-hidden">
        <li>
          <MobileMenuLink url="/" icon={<FaHome size={20} />} text="HOME" display={!loggedIn} />
        </li>
        <li>
          <MobileMenuLink url="/signin" icon={<FaUser size={20} />} text="ENTRAR" display={!loggedIn} />
        </li>
        <li>
          <MobileMenuLink url="/bookings" icon={<FaCalendarAlt size={17} />} text="AGENDAMENTOS" display={loggedIn} />
        </li>
        <li>
          <MobileMenuLink url="/list" icon={<FaCalendarAlt size={17} />} text="LISTAR AGENDAMENTOS" display={loggedIn} />
        </li>
        <li>
          <MobileMenuLink url="/signup" icon={<FaUsers size={20} />} text="CADASTRO" display={!loggedIn} />
        </li>
        <li>
          <MobileMenuLink url="/feedback" icon={<FaStar size={20} />} text="AVALIAÇÃO E FEEDBACK" display={loggedIn} />
        </li>
        <li onClick={() => handleLogout()}>
          <MobileMenuLink url="#" icon={<IoMdExit size={20} />} text={`${user?.name} (SAIR)`} display={loggedIn} />
        </li>
      </ul>
    </div>
  );
};