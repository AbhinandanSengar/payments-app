import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/bulk`);
                setUsers(response.data.users);
            } catch (error) {
                console.error("failed to fetch users: ", error);
            }
        };

        fetchUsers();
    }, []);

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