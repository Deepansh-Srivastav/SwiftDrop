import otpGenerator from 'otp-generator';

export const generateOTP = (length = 7) => {
    return otpGenerator.generate(length, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });
};

export default generateOTP

