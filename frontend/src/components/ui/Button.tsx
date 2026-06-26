interface ButtonProps { 
  label: string; 
  type?: "button" | "submit"; 
  variant?: "primary" | "outline"; 
  isLoading?: boolean; 
} 
 
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  type = "button", 
  variant = "primary", 
  isLoading = false 
}) => { 
  const base = "px-4 py-2 rounded font-medium"; 
 
  const styles = { 
    primary: "bg-blue-500 text-white", 
    outline: "border border-blue-500 text-blue-500" 
  }; 
 
  return ( 
    <button 
      type={type} 
      disabled={isLoading} 
      className={`${base} ${styles[variant]}`} 
    > 
      {isLoading ? "Loading..." : label} 
    </button> 
  ); 
};