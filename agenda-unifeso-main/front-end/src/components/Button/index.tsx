import clsx from "clsx";
import { Link } from "react-router-dom";

interface IButtonProps {
  children: string | React.ReactNode;
  onClick?: () => void; // Torne opcional para links
  type?: "button" | "submit" | "reset" | "link"; // Adiciona "link" como tipo
  to?: string; // Apenas para o tipo "link"
  style?: "default" | "alternate";
  className?: string;
  full?: boolean;
}

// Componente base para botões
export const Button = ({ className = "", children, onClick, type = "button", to, style = "default", full = false }: IButtonProps) => {
  const baseClass = clsx(
    {
      "bg-highlight hover:bg-highlight-hover": style === "default",
      "bg-muted hover:bg-muted-hover": style === "alternate",
      "w-full": full,
    },
    `${className} text-white px-2 py-4 rounded-md w-1/2 hover:transition-all whitespace-nowrap px-2 py-4 rounded-md w-1/2 self-end text-center`
  );

  if (type === "link") {
    if (!to) {
      console.error("O tipo 'link' exige a propriedade 'to'.");
      return null;
    }
    return (
      <Link to={to} className={baseClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {children}
    </button>
  );
};
