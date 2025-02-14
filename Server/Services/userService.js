import UserModel from "../Model/user.model.js"

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

    } catch (error) {
        console.log(error.message);
    }
}

export async function validateUserIdAndUpdate(user_id) {

    try {

        const updatedUser = await UserModel.findByIdAndUpdate(user_id, { verify_email: true }, { new: true })

        return (updatedUser ? true : false)

    }
    catch (error) {
        console.log(error.message);
        return false;
    }

}

