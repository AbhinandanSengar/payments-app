import axios from "axios"
import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Bottom } from "../components/Bottom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function signup() {
        if(!firstName || !lastName || !username || !password) {
            return toast.error("All fields are required.")
        }

        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                firstName,
                lastName,
                username,
                password
            });

            toast.success(response.data.message);
    
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            
            navigate("/dashboard");
        } catch(error) {
            console.error("Error signing up: ", error);
            const errorMsg = error?.message?.data?.message || "Something went wrong while signing up."
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="h-screen w-screen bg-[#7f7f7f] flex items-center justify-center">
            <div className="bg-white w-96 p-4 flex flex-col justify-center items-center rounded-2xl">
                <Heading heading="Sign Up" />
                <SubHeading subHeading="Enter your information to create an account" />
                <Input type="text" label="First Name" placeholder="Abhinandan" onChange={(e) => { setFirstName(e.target.value) }} />
                <Input type="text" label="Last Name" placeholder="Sengar" onChange={(e) => { setLastName(e.target.value) }} />
                <Input type="text" label="Username" placeholder="abhisengar" onChange={(e) => { setUsername(e.target.value) }} />
                <Input type="password" label="Password" placeholder="Wa@e61" onChange={(e) => { setPassword(e.target.value) }} />
                <Button title="Sign Up" variant="primary" size="lg" className="w-full m-2" loading={loading} loadingTitle="Signing up..." onClick={signup} />
                <Bottom title="Already have an account?" linkText="Login" linkTo="/signin" />
            </div>
        </div>
    )
}