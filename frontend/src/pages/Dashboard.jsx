import { AppBar } from "../frontend/src/components/AppBar"
import { Balance } from "../frontend/src/components/Balance"
import { Users } from "../frontend/src/components/Users"

export const Dashboard = ({ users }) => {
    return (
        <div className="min-h-screen w-screen bg-gray-50">
            <div className="w-auto h-full bg-white">
                <AppBar users={users} />
                <Balance />
                <Users users={users} />
            </div>
        </div>
    )
}