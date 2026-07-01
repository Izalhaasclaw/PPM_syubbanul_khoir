interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary";
    type?: "button" | "submit";
    onClick?: () => void;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    type = "button",
    isLoading = false,
    onClick, 
}) => {
    const baseStyle = "px-4 py-2 rounded font-medium transition-all active:scale-95";
    const varianStyle = {
        primary: "bg-[#35A2FD] text-white hover:bg-[#1D8DF5]",
        secondary: "bg-[#F2BB44] text-white hover:bg-[#DFA12B]",
    };

    return (
        <button
            type={type}
            disabled={isLoading}
            onClick={onClick} 
            className={`${baseStyle} ${varianStyle[variant]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isLoading ? "Loading..." : label}
        </button>
    );
};

export default Button;