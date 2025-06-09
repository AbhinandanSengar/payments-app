export const Heading = ({ heading }) => {
    return (
        <div className="mt-6 mb-2 px-4 w-full text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                {heading}
            </h1>
        </div>
    )
}