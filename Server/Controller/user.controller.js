import UserModel from "../Model/user.model.js"
import { encryptPassword } from "../Utils/encrypt.js"
import sendEmail from "../Config/sendEmail.js"
import verifyEmailTemplate from "../Utils/verifyEmailTemplate.js"
import { registerUser, existingEmail } from "../Services/userService.js"

export async function registerUserController(req, res) {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide Name / Email / Password ",
                error: true,
                success: false,
            })
        }

        const existingUser = await existingEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered ",
                error: true,
                success: false
            })
        }

        const encryptedPassword = await encryptPassword(password)
        
        const payload = {
            name,
            email,
            password: encryptedPassword,
        }

        let NEWLY_REGISTERED_USER_DATA = null

        const newUserData = await registerUser(payload)

        console.log(process.env.FRONTEND_URL);
        

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUserData?._id}`

        const verifyEmail = await sendEmail(
            {
                sendTo: email,
                subject: "Verification email from SwiftDrop",
                html: verifyEmailTemplate({
                    name,
                    url: verifyEmailUrl
                })
            })

        return res.status(200).json({
            message: "User Registered Successfully",
            error: false,
            success: true,
            data: newUserData
        })

    }
    catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: error.message || "Error Occured !! ",
            error: true,
            success: false,
        })
    }
}