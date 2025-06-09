import { useNavigate } from "react-router-dom"
import { SearchIcon } from "../icons/SearchIcon"
import { Button } from "./Button"
import { useState } from "react"

export const Users = ({ users, loggedInUserId }) => {

    const filteredUsers = users.filter(user => user._id !== loggedInUserId);

    {/* max-w-2xl mx-auto -- for centering it(use for both balance and users in the outer parent div) */}
    return (
        <div className="m-4 px-6 py-5 bg-white text-md text-gray-800 font-medium border border-gray-200 rounded-xl shadow-sm">
            <h3 className="mb-4 text-2xl text-gray-700 font-semibold">Users</h3>
            <div className="mb-6 px-3 py-2 flex items-center gap-2 border rounded-md bg-gray-50 shadow-sm">
                <SearchIcon />
                <input type="text" className="w-full bg-transparent focus:outline-none" placeholder="Search users..." />
            </div>
            <div className="space-y-4">
                {filteredUsers.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function send() {
        setLoading(true);

        await new Promise(res => setTimeout(res, 1000));

        setLoading(false);
        navigate("/send?id=" + user._id + "&name=" + user.firstName);
    }
    return (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow transition-shadow">
            <div className="flex items-center gap-3">
                <div className="bg-blue-500 w-10 h-10 flex justify-center items-center text-lg text-white font-bold rounded-full">
                    {user.firstName[0]}
                </div>
                <div className="text-gray-800 font-medium">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div>
                <Button title="Send Money" variant="primary" size="sm" loading={loading} loadingTitle="Sending..." onClick={send} />
            </div>
        </div>
    )
}