import clsx from "clsx";
import { useContext } from "react";
import { FaCalendarAlt, FaHome, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { MdAdminPanelSettings } from "react-icons/md";

// Interface do MenuLink
interface MenuLinkProps {
  url: string;
  icon: React.ReactNode;
  text: string;
  display?: boolean;
}

// Componente MenuLink
export const MenuLink = ({ url, icon, text, display = true }: MenuLinkProps) => {
  const location = useLocation();

  return (
    <Link to={url} className={clsx({ "bg-neutral-400 rounded-md": location.pathname === url, hidden: !display }, "flex uppercase py-2 px-8 whitespace-nowrap items-center gap-x-2 font-bold text-sm font-secondary")}>
      {icon}
      {text}
    </Link>
  );
};

// Componente Navigation
export const Navigation = () => {
  const { loggedIn, user, setLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="bg-white hidden md:flex min-h-16 justify-end items-center px-10 gap-x-10 drop-shadow-md">
      <MenuLink url="/" icon={<FaHome size={20} />} text="Home" display={!loggedIn}/>
      <MenuLink url="/signin" icon={<FaUser size={20} />} text="Entrar" display={!loggedIn} />
      
      <MenuLink url="/bookings" icon={<FaCalendarAlt size={17} />} text="AGENDAR" display={loggedIn && user?.role !== "admin"} />
      <MenuLink url="/list" icon={<FaCalendarAlt size={17} />} text="LISTAR AGENDAMENTOS" display={loggedIn} />
      
      <MenuLink url="/signup" icon={<FaUsers size={20} />} text="cadastrar" display={!loggedIn} />
      <MenuLink url="/feedback" icon={<FaStar size={20} />} text="Avaliação e Feedback" display={loggedIn && user?.role !== "admin"} />
        
      <MenuLink url="/admin/dashboard" icon={<MdAdminPanelSettings size={20} />} text="Administração" display={loggedIn && user?.role === "admin"} />       

      <div className={clsx({ hidden: !loggedIn }, "flex items-center gap-2")}>
        <span className="font-bold mr-2 text-gray-700">
            Olá, {user?.name}
        </span>
        
        <span className="ml-3 text-sm">
          (
          <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="hover:underline text-red-600">
            Sair
          </a>
          )
        </span>
      </div>
    </div>
  );
};