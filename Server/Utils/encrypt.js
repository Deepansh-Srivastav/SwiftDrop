import bcrypt from "bcryptjs"

export async function encryptPassword(plainPassword) {

    try {
        const salt = await bcrypt.genSalt(10);

        const encryptedPassword = await bcrypt.hash(plainPassword, salt);

        return encryptedPassword
    }
    catch (error) {
        throw new Error("Failed to encrypt password. Please try again later.");
    }

}
