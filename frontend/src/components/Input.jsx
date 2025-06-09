export const Input = ({ label, type, placeholder }) => {
    return (
        <div className="w-full my-3 flex flex-col gap-1 text-base font-medium">
            <label className="text-gray-700">
                {label}
            </label>
            <input type={type} placeholder={placeholder} className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"/>
        </div>
    )
}