import { useState } from "react";

interface InputPasswordProps {
  label: string;
  error?: string;
  register: any;
  name: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({ label, error, register, name }) => {
  const [show, setShow] = useState<boolean>(false);
  
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative group">
        <input
          type={show ? "text" : "password"}
          id={name}
          placeholder={label}
          {...register(name)}
          className={`w-full border rounded-lg p-2.5 pr-12 outline-none transition-all duration-200 
            ${error 
              ? "border-red-500 focus:ring-2 focus:ring-red-200" 
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-blue-600 focus:outline-none transition-colors"
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 font-medium italic">{error}</p>}
    </div>
  );
};