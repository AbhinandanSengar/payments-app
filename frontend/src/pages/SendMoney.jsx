import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export const SendMoney = () => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const toId = searchParams.get("id");
    const name = searchParams.get("name");

    async function transfer() {
        const parsedAmount = Number(amount);
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return toast.error("You are not authenticated. Please login again.");
        }

        if (!toId) {
            setLoading(false);
            return toast.error("Recepient ID is missing.");
        }

        if (!parsedAmount || parsedAmount <= 0) {
            setLoading(false);
            return toast.error("Please enter a valid amount greater than zero");
        }
        
        try {
            setLoading(true);
            const toastId = toast.loading("Initiating transfer...");

            const response = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, {
                toAccountId: toId,
                transferAmount: parsedAmount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await new Promise(res => setTimeout(res, 1000));
            toast.success(response.data.message || "Transfer Successfull", { id: toastId });
            setAmount("");
        } catch (error) {
            console.error("transfer error: ", error);
            const errorMsg = error?.response?.data?.message || "Transfer failed. Please try again.";
            toast.error(errorMsg, { id: toastId });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white w-96 p-6 flex flex-col rounded-2xl border border-gray-200 shadow-md">
                <div className="mb-6 text-3xl font-extrabold text-center text-blue-600">Send Money</div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-500 w-12 h-12 flex justify-center items-center text-xl text-white font-bold rounded-full">
                        {name[0].toUpperCase()}
                    </div>
                    <div className="text-xl text-gray-800 font-medium">
                        {name}
                    </div>
                </div>
                <Input label="Amount (in &#x20b9;)" type="number" placeholder="Enter Amount" specificStyles="" onChange={(e) => { setAmount(e.target.value) }} />
                <div className="mt-4 w-full">
                    <Button variant="primary" size="md" className="w-full" loading={loading} loadingTitle="Initiating..." title="Initiate Transfer" onClick={transfer} />
                </div>
            </div>
        </div>
    )
}