import clsx from "clsx";
import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

// Declaração de interface para tipagem das propriedades
interface IInfoButtonProps {
  className?: string;
  size?: number;
  text: string;
  title?: string;
  icon?: React.ReactNode;
}


// Renderização do componente base do botão de informação
export const InfoButton = ({ className, size, text, title, icon }: IInfoButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className={clsx({ block: isHovered, hidden: !isHovered }, "fixed bottom-16 z-10 max-w-xs bg-neutral-100 text-neutral-800 p-3 rounded-lg shadow-lg whitespace-pre-wrap break-words overflow-hidden text-justify border")}>
        <h3 className="flex w-full items-center justify-center font-bold uppercase border-b pb-2 mb-4">
          {icon}
          {title}
        </h3>
        <p>{text}</p>
      </div>
      <i className="fixed bottom-3 cursor-pointer rounded-full" onClick={() => setIsHovered(!isHovered)}>
        <FaCircleInfo size={size} color="rgb(24, 162, 204)" className="" />
      </i>
    </div>
  );
};
