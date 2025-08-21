interface ButtonProps {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    title?: string;
    id?: string;
}

const Button = ({
    label,
    onClick,
    icon,
    className = "",
    disabled = false,
    type = "button",
    fullWidth = false,
    title,
    id,
}: ButtonProps) => {
    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`flex items-center justify-center gap-2 bg-button-light hover:bg-hover-buttonLight text-stone-50 font-semibold p-2 rounded-full shadow-md transition-colors duration-300 ${
                fullWidth ? "w-full" : ""
            } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {label}
        </button>
    );
};

export default Button;