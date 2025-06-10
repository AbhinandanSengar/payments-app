import axios from "axios"
import { Button } from "./Button";
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Balance = () => {
    const [balance, setBalance] = useState(null);
    const[loading, setLoading] = useState(false);

    async function fetchBalance() {
        try {
            setLoading(true);
            const toastId = toast.loading("Fetching Balance...");
            const token = localStorage.getItem("token");

            await new Promise(res => setTimeout(res, 500));
    
            const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBalance(response.data.balance);
            
            toast.success(response.data.message, { id: toastId });
        } catch(error) {
            console.error("Error fetching balance: ", error);
            const errorMsg = error?.message?.data?.message || "Something went wrong. Try again";
            toast.error(errorMsg, { id: toastId });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="m-4 px-6 py-3 bg-gray-50 text-lg text-gray-800 font-semibold flex justify-between items-center border border-gray-300 rounded-xl shadow-sm">
            <div className="flex">
                Your Balance:&nbsp;
                <span className="text-green-600">&#x20b9;{balance}</span>
            </div>
            <Button variant="primary" size="sm" title="Check Balance" loading={loading} loadingTitle="Checking..." onClick={fetchBalance} />
        </div>
    )
}