// Declaração de interface para tipar as propriedades do componente
interface IInputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

// Componente base para campos do  tipo input para formulário
export const InputField = ({label,name,onChange,placeholder,type,value}: IInputFieldProps) => {
  return (
    <div className="flex flex-col">
    <label className="uppercase text-xl font-bold font-secondary">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 rounded-xl text-black py-4"
    />
  </div>
  )
}