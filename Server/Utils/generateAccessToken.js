import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default async function generateAccessToken(userId) {
    const payload = { userId };

    const secretKey = process.env.ACCESS_SECRET_KEY;

    const expiresIn = '1m';

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
};