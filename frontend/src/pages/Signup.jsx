import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Bottom } from "../components/Bottom";


export const SignUp = () => {
    const [loading, setLoading] = useState(false);

    async function signup() {
        setLoading(true);

        await new Promise(res => setTimeout(res, 2000));

        setLoading(false);
    }
    return (
        <div className="h-screen w-screen bg-[#7f7f7f] flex items-center justify-center">
            <div className="bg-white w-96 p-4 flex flex-col justify-center items-center rounded-2xl">
                <Heading heading="Sign Up" />
                <SubHeading subHeading="Enter your information to create an account" />
                <Input type="text" label="First Name" placeholder="Abhinandan" />
                <Input type="text" label="Last Name" placeholder="Sengar" />
                <Input type="text" label="Username" placeholder="abhisengar" />
                <Input type="password" label="Password" placeholder="Wa@e61" />
                <Button title="Sign Up" variant="primary" size="lg" loading={loading} loadingTitle="Signing up..." onClick={signup} />
                <Bottom title="Already have an account?" linkText="Login" linkTo="/signin" />
            </div>
        </div>
    )
}