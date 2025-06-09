import { useState } from "react";
import { Bottom } from "../frontend/src/components/Bottom";
import { Button } from "../frontend/src/components/Button";
import { Heading } from "../frontend/src/components/Heading"
import { Input } from "../frontend/src/components/Input";
import { SubHeading } from "../frontend/src/components/Subheading"


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