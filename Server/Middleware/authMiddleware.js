import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const auth = async (req, res, next) => {

    try {
        const token = req.cookies.accessToken || req.header.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "No token provided. Unauthorized access.",
                error: true,
                success: false,
            });
        }

        try {
            const decode = await jwt.verify(token, process.env.ACCESS_SECRET_KEY);

            if (!decode) {
                return res.status(401).json({
                    message: "Invalid or expired token. Unauthorized access.",
                    error: true,
                    success: false,
                });
            };

            req.userId = decode.userId;
            next();
        } catch (error) {
            if (error?.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: error?.name,
                    error: true,
                    success: false,
                });
            }
            return res.status(401).json({
                message: "Invalid token. Unauthorized access.",
                error: true,
                success: false,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false,
        })
    }
};

export default auth;