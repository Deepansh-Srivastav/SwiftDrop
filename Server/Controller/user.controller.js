import UserModel from "../Model/user.model.js"
import bcryptjs from "bcryptjs"
import sendEmail from "../Config/sendEmail.js"
import generateAccessToken from "../Utils/generateAccessToken.js"
import generateRefreshToken from "../Utils/generateRefreshToken.js"
import uploadImageClodinary from "../Utils/uploadImageCloudinary.js"
import forgotPasswordOTPTemplate from "../Utils/forgotPasswordOTPTemplate.js"
import { encryptPassword, validatePassword } from "../Utils/encrypt.js"
import verifyEmailTemplate from "../Utils/verifyEmailTemplate.js"
import { registerUser, validateUserAndUpdate } from "../Services/userService.js"
import generateOTP from "../Services/generateOTP.js"
import { OAUTH } from "../Utils/googleOAuthConfig.js"
import axios from "axios"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

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

        const existingUser = await validateUserAndUpdate({ email });

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

        const newUserData = await registerUser(payload)
        if (!newUserData) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "Failed to register user."
            });
        };

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

        const accessToken = await generateAccessToken(newUserData?._id);
        const refreshToken = await generateRefreshToken(newUserData?._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

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

        const payload = {
            verify_email: true
        }

        const isValidUser = await validateUserAndUpdate({
            update: true,
            user_id: code,
            payload: payload,
            showNewDataItem: true,
        })

        if (!isValidUser) {
            return res.status(400).json({
                message: "Invalid user",
                success: false,
                error: true
            })
        }

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

        const existingUser = await validateUserAndUpdate({ email })

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

        if (!isPasswordValid) {
            return res.status(409).json({
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

        const updateUserLastLoginDetail = validateUserAndUpdate({
            update: true,
            user_id: existingUser?._id,
            payload: {
                last_login_date: new Date()
            }
        })

        return res.status(200).json({
            message: "User login successful",
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

export async function googleOAuthController(req, res) {
    try {
        const { code } = req?.query;

        if (!code) {
            return res.status(400).json({
                message: "Authorization code is required.",
                error: true,
                success: false
            });
        };

        const googleResponse = await OAUTH.getToken(code);
        OAUTH.setCredentials(googleResponse.tokens);

        const userData = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

        const { id, email, name, picture } = userData?.data;

        const existingUser = await validateUserAndUpdate({ email });

        if (!existingUser) {

            if (!name || !id || !email) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Missing required user information from Google."
                });
            };

            const payload = {
                name,
                email,
                avatar: picture,
                googleId: id,
                authProvider: "google"
            };

            const userData = await registerUser(payload);

            if (!userData) {
                return res.status(500).json({
                    success: false,
                    error: true,
                    message: "Failed to register user with Google."
                });
            };

            const accessToken = await generateAccessToken(userData?._id);
            const refreshToken = await generateRefreshToken(userData?._id);

            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            };

            res.cookie('accessToken', accessToken, cookieOptions);
            res.cookie('refreshToken', refreshToken, cookieOptions);

            return res.status(200).json({
                message: "User Registered Successfully with Google",
                error: false,
                success: true,
                data: userData
            });
        };

        const accessToken = await generateAccessToken(existingUser?._id);
        const refreshToken = await generateRefreshToken(existingUser?._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);

        return res.status(200).json({
            message: "Login Successfully with Google",
            error: false,
            success: true,
            data: existingUser
        });
    }
    catch (error) {
        console.log("Error in the backend ", error);
    }
}

// Logout Controller
export async function logoutController(req, res) {
    try {

        const userId = req.userId

        const payload = {
            refresh_token: ""
        }

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.clearCookie("accessToken", cookieOptions)
        res.clearCookie("refreshToken", cookieOptions)

        const removeRefreshToken = await validateUserAndUpdate({
            update: true,
            user_id: userId,
            payload
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

// Get Login user details
export async function getLoginUserDetails(req, res) {

    try {
        const userId = req.userId

        const userDetails = await UserModel.findById(userId).select("_id name email avatar mobile verify_email address_details shopping_cart orderHistory last_login_date role")

        if (!userDetails) {
            return res.status(404).send({
                message: "User not found",
                error: true,
                success: false
            })
        }

        return res.status(200).send({
            message: "User found successfully",
            success: true,
            error: false,
            data: userDetails
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

        const encryptedPassword = await encryptPassword(password)

        const payload = {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: encryptedPassword })
        }

        const updateUser = await validateUserAndUpdate({
            update: true,
            user_id: verifiedUserId,
            payload,
            showNewDataItem: true
        })

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
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body

        const existingUser = await validateUserAndUpdate({ email })

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found.",
                error: true,
                success: false
            });
        }

        const name = existingUser?.name

        const otp = generateOTP()

        const expireTime = new Date(Date.now() + 10 * 60 * 1000);

        const sendOTPEmail = await sendEmail(
            {
                sendTo: email,
                subject: "OTP to reset password from SwiftDrop",
                html: forgotPasswordOTPTemplate({
                    name,
                    otp
                })
            })

        const payload = {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        }

        const update = await validateUserAndUpdate({
            update: true,
            user_id: existingUser?._id,
            payload

        })

        return res.status(200).json({
            message: "OTP has been successfully sent to your email.",
            error: false,
            success: true,
            data: otp
        });

    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }


}

// verify forgot password error
export async function verifyForgotPasswordOTPController(req, res) {
    try {
        const { email, otp } = req.body

        if (!otp || !email) {
            return res.status(400).json({
                message: "Email and OTP are required.",
                error: true,
                success: false
            });
        }

        const existingUser = await validateUserAndUpdate({ email })

        let currentTime = new Date()

        let OTPExpiryTime = new Date(existingUser?.forgot_password_expiry);

        let storedOTP = existingUser?.forgot_password_otp

        if (currentTime > OTPExpiryTime) {
            return res.status(410).json({
                message: "OTP has expired. Please request a new OTP.",
                error: true,
                success: false
            });
        }

        if (otp !== storedOTP) {
            return res.status(400).json({
                message: "Invalid OTP. Please check and try again.",
                error: true,
                success: false
            });
        }

        const resetStoredOtp = await validateUserAndUpdate({
            update: true,
            user_id: existingUser?._id,
            payload: {
                forgot_password_otp: "",
                forgot_password_expiry: ""
            }
        })

        return res.status(200).json({
            message: "OTP verified successfully.",
            error: false,
            success: true
        });


    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// reset password controller
export async function resetPasswordController(req, res) {
    try {
        const { email, password, confirmPassword } = req.body

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required: email, password, and confirmPassword.",
                error: true,
                success: false
            });
        }

        const existingUser = await validateUserAndUpdate({ email })

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found.",
                error: true,
                success: false
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match. Please try again.",
                error: true,
                success: false
            });
        }

        const encryptedPassword = await encryptPassword(password)

        const payload = {
            password: encryptedPassword
        }

        // const updatePassword = await UserModel.findByIdAndUpdate(existingUser._id, ,
        //     { new: true }
        // )

        const updatePassword = await validateUserAndUpdate({
            update: true,
            user_id: existingUser?._id,
            payload
        })

        return res.status(200).json({
            message: "Password changed successfully",
            error: false,
            success: true,
            data: updatePassword
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

//Refresh token route remaining
export async function refreshTokenController(req, res) {
    try {
        const refreshToken = req?.cookies?.refreshToken || req?.header?.authorization?.split(" ")[1]

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
                error: false
            })
        }

        try {
            const verifyToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

            if (!verifyToken) {
                return res.status(401).json({
                    message: "Token Expired",
                    success: false,
                    error: true
                });
            };

            const newAccessToken = await generateAccessToken(verifyToken?.userId)

            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }

            res.cookie('accessToken', newAccessToken, cookieOptions)

            res.status(200).json({
                success: true,
                error: false,
                message: "New Access token generated"
            })


        } catch (error) {

            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }
            res.clearCookie("accessToken", cookieOptions)
            res.clearCookie("refreshToken", cookieOptions)

            if (error?.name === "TokenExpiredError") {
                return res.status(498).json({
                    message: `${error?.name} Refresh token expired`,
                    error: true,
                    success: false,
                });
            }
            return res.status(401).json({
                message: "Invalid token. Unauthorized access.",
                error: true,
                success: false,
            });
        };
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false,
        })
    }
}