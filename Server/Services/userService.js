import UserModel from "../Model/user.model.js"
import { encryptPassword } from "../Utils/encrypt.js";

export async function registerUser(payload) {
    try {
        let NEWLY_REGISTERED_USER_DATA = await UserModel.create(payload)
        return NEWLY_REGISTERED_USER_DATA
    }
    catch (error) {
        console.log(error.message);
    }
}

export async function existingEmail(email) {
    try {
        const existingUserData = await UserModel.findOne({ email })
        return (existingUserData || null)

    }
    catch (error) {
        console.log(error.message);
    }
}

export async function validateUserIdAndUpdate(user_id) {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(user_id, { verify_email: true }, (true && { new: true }))
        return (updatedUser ? true : false)
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}

export async function updateUserProfile(name, email, password, mobile, userId) {
    try {
        let  encryptedPassword = ''

        if (password) {
            encryptedPassword = await encryptPassword(password)
        }

        const updatedUserDetails = await UserModel.findByIdAndUpdate(userId, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: encryptedPassword })
        }, { new: true })

        return updatedUserDetails
    }
    catch (error) {
        return error.message;
    }
}