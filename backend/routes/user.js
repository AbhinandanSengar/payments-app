const { z } = require("zod");
const bcrypt = require("bcrypt");
const { User } = require("../db");
const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const SignUpSchema = z.object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        username: z.string().trim().toLowerCase(),
        email: z.string().email().trim().toLowerCase(),
        password: z.string().min(6, { message: "Minimum 6 charcters" })
    });

    const parsedData = SignUpSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format"
        });
    }

    const { firstName, lastName, username, email, password } = parsedData.data;

    try {
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(411).json({
                message: "User already exists. Please sign in."
            });
        }

        const hashPassword = await bcrypt.hash(password, 15);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword
        });

        const userId = user._id;

        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Signed up successfully",
            token: token
        });
    } catch(error) {
        console.error("Signup error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const SignInSchema = z.object({
        username: z.string().trim().toLowerCase(),
        password: z.string().min(6, { message: "Minimum 6 charcters" })
    });

    const parsedData = SignInSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format"
        });
    }

    const { username, password } = parsedData.data;

    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(411).json({
                message: "Incorrect username"
            });
        }
        const decodedPassword = await bcrypt.compare(password, user.password);
        if(!decodedPassword) {
            return res.status(411).json({
                message: "Incorrect password"
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Signed up successfully",
            token: token
        });
    } catch(error) {
        console.error("Signup error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.put("/update", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const updatedSchema = z.object({
        firstName: z.string().trim().optional(),
        lastName: z.string().trim().optional(),
        password: z.string().min(6, { message: "Minimum 6 charcters" }).optional()
    });

    const parsedData = updatedSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({
            message: "Invlaid input format"
        });
    }

    const { firstName, lastName, password } = parsedData.data;

    try {
        if(password) {
            parsedData.data.password = await bcrypt.hash(password, 15);
        }

        const updatedUser = await User.updateOne({
            _id: userId
        },{
            firstName,
            lastName,
            password
        });
        
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch(error) {
        console.error("Updation error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } },
                { username: { "$regex": filter } },
                { email: { "$regex": filter } }
            ]
        });

        if(users.length === 0) {
            return res.status(404).json({
                message: "No users found. Please search another"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            users: users.map(user => ({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }))
        })
    } catch(error) {
        console.error("user get error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = userRouter;