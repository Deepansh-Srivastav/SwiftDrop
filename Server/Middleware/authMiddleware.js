import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const auth = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        let token = null;
        if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }
        else if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            return res.status(409).json({
                message: "No token provided. Unauthorized access.",
                error: true,
                success: false,
            });
        }

        try {
            const decode = await jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            req.userId = decode.userId;
            next();
        } catch (error) {
            if (error?.name === "TokenExpiredError") {
                return res.status(409).json({
                    message: error?.name,
                    error: true,
                    success: false,
                });
            }
            return res.status(409).json({
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


// const auth = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         let token = null;

//         if (req.cookies?.accessToken) {
//             token = req.cookies.accessToken;
//         } else if (authHeader && authHeader.startsWith("Bearer ")) {
//             token = authHeader.split(" ")[1];
//         }

//         if (!token) {
//             return res.status(401).json({
//                 message: "Unauthorized: token missing",
//                 code: "NO_TOKEN"
//             });
//         }

//         try {
//             const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
//             req.userId = decoded.userId;
//             next();
//         } catch (err) {
//             if (err.name === "TokenExpiredError") {
//                 return res.status(401).json({
//                     message: "Access token expired",
//                     code: "ACCESS_TOKEN_EXPIRED"
//                 });
//             }

//             return res.status(401).json({
//                 message: "Invalid token",
//                 code: "INVALID_TOKEN"
//             });
//         }
//     } catch {
//         return res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// };
