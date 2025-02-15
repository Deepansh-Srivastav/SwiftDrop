import UserModel from "../Model/user.model.js"
import bcryptjs from "bcryptjs"
import sendEmail from "../Config/sendEmail.js"
import generateAccessToken from "../Utils/generateAccessToken.js"
import generateRefreshToken from "../Utils/generateRefreshToken.js"
import uploadImageClodinary from "../Utils/uploadImageCloudinary.js"

import {
    encryptPassword,
    validatePassword
} from "../Utils/encrypt.js"

import verifyEmailTemplate from "../Utils/verifyEmailTemplate.js"
import {
    registerUser,
    existingEmail,
    validateUserIdAndUpdate,
    updateUserProfile,

} from "../Services/userService.js"

// User Registration Controller 
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
            message: error.message || "Error Occurred !! ",
            error: true,
            success: false,
        })
    }
}

// Email  Verification Controller 
export async function userEmailVerificationController(req, res) {

    try {
        const { code } = req.body

        const isValidUser = await validateUserIdAndUpdate(code)

        if (!isValidUser) {
            return res.status(400).json({
                message: "Invalid user",
                success: false,
                error: true
            })
        }

        const verifyUser = await UserModel.updateOne({ _id: code }, { verify_email: true })

        res.status(200).json({
            message: "User Successfully verified",
            success: true,
            error: false
        })


    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Error Occurred !! ",
            error: true,
            success: false,
        })
    }
}

// Login Controller 
export async function loginController(req, res) {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
                error: true,
                success: false
            })
        }

        const existingUser = await existingEmail(email)

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found. Please register first.",
                error: true,
                success: false
            })
        }

        if (existingUser.status !== "Active") {

            return res.status(403).json({
                "message": "Your account has been suspended. Please contact support for assistance.",
                "error": true,
                "success": false
            })
        }

        const isPasswordValid = await validatePassword(password, existingUser?.password)

        console.log(isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({
                "message": "Invalid password. Please try again.",
                "error": true,
                "success": false
            })
        }

        const accessToken = await generateAccessToken(existingUser?._id)

        const refreshToken = await generateRefreshToken(existingUser?._id)

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookieOptions)

        res.cookie('refreshToken', refreshToken, cookieOptions)

        return res.status(200).json({
            message: "User login successful",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Error Occurred",
            error: true,
            success: false,
        })
    }
}

// Logout Controller
export async function logoutController(req, res) {
    try {

        const userId = req.userId

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.clearCookie("accessToken", cookieOptions)
        res.clearCookie("refreshToken", cookieOptions)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        })

        return res.status(200).json({
            message: "Logout Successful",
            error: false,
            success: true,
        })

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Error Occurred",
            error: true,
            success: false,
        })
    }
}

// Profile Picture Controller
export async function uploadAvatarController(request, response) {
    try {
        const userId = request.userId // auth middlware
        const image = request.file  // multer middleware

        const upload = await uploadImageClodinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return response.json({
            message: "upload profile",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//Update User Details Controller
export async function updateUserDetailsController(req, res) {
    try {
        const verifiedUserId = req.userId

        const { name, email, password, mobile } = req.body

        const updateUser = await updateUserProfile(name, email, password, mobile, verifiedUserId)

        return res.status(200).json({
            message: "User Details Updates Successfully",
            error: false,
            success: true,
            data: updateUser
        })
    }

    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

//Forgot Password Controller

export async function forgotPasswordController(req,res) {
    
}