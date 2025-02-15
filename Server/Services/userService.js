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

export async function validateUserAndUpdate({
    validate = true,
    update = false,
    email = null,
    user_id = null,
    payload = null,
    showNewDataItem = false }) {

    try {
        const query = user_id ? { _id: user_id } : { email: email };

        const existingUser = await UserModel.findOne(query);
        
        // console.log("Query is - ",query);
        // console.log("existingUser - ", existingUser);

        if (update && existingUser) {
            const updateData = await UserModel.findOneAndUpdate(
                query,
                payload,
                showNewDataItem ? { new: true } : {}
            )
            return updateData;
        }

        return existingUser;
    }

    catch (error) {
        return null;
    }

}




