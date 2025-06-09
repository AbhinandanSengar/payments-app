import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const AppBar = ({ users }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const dropDownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className="px-10 py-4 flex items-center justify-between border-b relative z-10">
            <div>
                <p className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/dashboard")}>Payments App</p>
            </div>
            <div className="relative" ref={dropDownRef}>
                <div className="flex items-center gap-2">
                    <div className="text-lg font-medium text-gray-700">Hello, User</div>
                    <div className="bg-blue-500 w-10 h-10 flex justify-center items-center text-lg text-white font-bold rounded-full leading-none cursor-pointer" onClick={() => setOpen(!open)}>
                        U
                    </div>
                </div>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-20">
                        <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => {
                            setOpen(false);
                            navigate("/profile");
                        }}>
                            Profile
                        </div>
                        <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => {
                            setOpen(false);
                            navigate("/signin")
                        }}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}