import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const AppBar = ({ users, loggedInUserId }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef();

    const currentUser = users.find(user => user._id === loggedInUserId);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        const handleEscape = (event) => {
            if(event.key === "Escape") {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        }
    }, []);

    async function profile() {
        setOpen(false);
        navigate("/profile");
    }

    async function logOut() {
        setOpen(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/signin")
    }

    return (
        <div className="px-10 py-4 flex items-center justify-between border-b relative z-10">
            <div>
                <p className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/dashboard")}>Payments App</p>
            </div>
            <div className="relative" ref={dropDownRef}>
                <div className="flex items-center gap-2">
                    <div className="text-lg font-medium text-gray-700">Hello, {currentUser?.firstName || "User"}</div>
                    <div className="bg-blue-500 w-10 h-10 flex justify-center items-center text-lg text-white font-bold rounded-full leading-none cursor-pointer" onClick={() => setOpen(!open)}>
                        {currentUser?.firstName[0] || "U"}
                    </div>
                </div>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-20">
                        <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={profile}>
                            Profile
                        </div>
                        <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={logOut}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}