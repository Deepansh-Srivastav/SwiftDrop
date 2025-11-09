import jwt from 'jsonwebtoken'
import UserModel from '../Model/user.model.js';
import dotenv from "dotenv"
dotenv.config()

export default async function generateRefreshToken(userId) {

    const payload = { userId };

    const secretKey = process.env.REFRESH_TOKEN_KEY;

    const expiresIn = '2m';

    const token = jwt.sign(payload, secretKey, { expiresIn });

    try {
        const updateUserRefreshToken = await UserModel.findOneAndUpdate(
            { _id: userId },
            { refresh_token: token }
        )
    }
    catch (error) {
        console.log(error.message);
        console.log("Cant update user password");

    }

    return token;
}