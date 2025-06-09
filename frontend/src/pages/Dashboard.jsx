import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"


export const Dashboard = ({ users }) => {
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setLoggedInUserId(id);
    }, []);
    return (
        <div className="min-h-screen w-screen bg-gray-50">
            <div className="w-auto h-full bg-white">
                <AppBar users={users} loggedInUserId={loggedInUserId} />
                <Balance />
                <Users users={users} loggedInUserId={loggedInUserId} />
            </div>
        </div>
    )
}