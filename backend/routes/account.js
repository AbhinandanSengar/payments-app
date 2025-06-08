const { z } = require("zod");
const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const accountDetails = await Account.findOne({ userId });
        if(!accountDetails) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.status(200).json({
            message: "Account details fetched succesfully",
            balance: accountDetails.balance
        });
    } catch(error) {
        console.error("Balance fetch error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    const userId = req.userId;
    const transferSchema = z.object({
        toAccountId: z.string().trim(),
        transferAmount: z.number().min(1, { message: "Minimum transfer is 1 Rs." })
    });

    const parsedData = transferSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error: parsedData.error
        });
    }

    const { toAccountId, transferAmount } = parsedData.data;

    try {
        session.startTransaction();
        const fromAccount = Account.findOne({ userId: userId }).session(session);
        if(fromAccount.balance < transferAmount) {
            await session.abortTransaction();
            return res.status(400).send({
                message: "Insufficient balance"
            });
        }

        const toAccount = Account.findOne({ userId: toAccountId }).session(session);
        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Receiver's bank not found"
            });
        }

        await Account.updateOne({ userId: userId }, { $inc: { balance: -transferAmount } }).session(session);
        await Account.updateOne({ userId: toAccountId }, { $inc: { balance: transferAmount } }).session(session);

        await session.commitTransaction();

        res.status(200).json({
            message: "Transfer successfull"
        });
    } catch(error) {
        console.error("Transfer error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = accountRouter;