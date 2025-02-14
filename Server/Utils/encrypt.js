
import bcryptjs from 'bcryptjs'

export async function encryptPassword(plainPassword) {

    try {
        const salt = await bcryptjs.genSalt(10);

        const encryptedPassword = await bcryptjs.hash(plainPassword, salt);

        return encryptedPassword
    }
    catch (error) {
        throw new Error("Failed to encrypt password. Please try again later.");
    }

}

export async function validatePassword(enteredPassword, savedPassword) {
    try {

        const password = await bcryptjs.compare(enteredPassword, savedPassword)

        return password

    }
    catch (error) {

        console.log(error.message);

        return false;
    }
}
