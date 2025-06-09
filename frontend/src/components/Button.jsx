import { ClipLoader } from "react-spinners"

export const Button = ({ title, variant, size, onClick, loading, loadingTitle }) => {
    const defaultStyles = "w-full font-semibold rounded-lg cursor-pointer transition-colors duration-200";
    const variantStyles = {
        primary: "bg-slate-800 text-white hover:bg-slate-900",
        secondary: "bg-slate-400 text-black hover:bg-slate-600"
    }

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg"
    }
    return (
        <button className={`${defaultStyles} ${variantStyles[variant]} ${sizeStyles[size]}`} onClick={onClick} disabled={loading}>
            {loading
                ? <div className="flex items-center justify-center gap-2">
                    <ClipLoader size={18} color="#fff" />
                    <span>{loadingTitle}</span>
                </div>
                : <div>
                    {title}
                </div>
            }
        </button>
    )
}