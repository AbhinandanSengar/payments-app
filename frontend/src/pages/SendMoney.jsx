import { useState } from "react"
import { Button } from "../frontend/src/components/Button"
import { Input } from "../frontend/src/components/Input"

export const SendMoney = () => {
    const [loading, setLoading] = useState(false);

    async function transfer() {
        setLoading(true);

        await new Promise(res => setTimeout(res, 2000));

        setLoading(false);
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white w-96 p-6 flex flex-col rounded-2xl border border-gray-200 shadow-md">
                <div className="mb-6 text-3xl font-extrabold text-center text-blue-600">Send Money</div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-500 w-12 h-12 flex justify-center items-center text-xl text-white font-bold rounded-full">
                        U
                    </div>
                    <div className="text-xl text-gray-800 font-medium">
                        Abhinandan Sengar
                    </div>
                </div>
                <Input label="Amount (in &#x20b9;)" type="number" placeholder="Enter Amount" specificStyles="" />
                <div className="mt-4 w-full">
                    <Button variant="primary" size="md" loading={loading} loadingTitle="Initiating..." title="Initiate Transfer" onClick={transfer} />
                </div>
            </div>
        </div>
    )
}