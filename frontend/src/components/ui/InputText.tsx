interface InputProps {
  label: string;
  error?: string;
  register: any;
  name: string;
}

export const Input: React.FC<InputProps> = ({ label, error, register, name }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={name}
        placeholder={label}
        {...register(name)}
        className={`w-full border rounded-lg p-2.5 outline-none transition-all duration-200 
          ${error 
            ? "border-red-500 focus:ring-2 focus:ring-red-200" 
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
      />
      {error && <p className="text-xs text-red-500 font-medium italic">{error}</p>}
    </div>
  );
};