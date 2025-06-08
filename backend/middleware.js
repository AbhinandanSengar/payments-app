const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(403).json({
            message: "Token not found!"
        });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        if(!decodedData) {
            return res.status().json({
                message: "User not found"
            });
        } else {
            req.userId = decodedData.userId;
            next()
        }
    } catch(error) {
        console.error("Verification error: ", error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    authMiddleware
}