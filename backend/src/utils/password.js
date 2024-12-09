import bcrypt  from "bcrypt"

export async function isPassword(actualPassword, password) {
    try {
        const isMatch = await bcrypt.compare(password, actualPassword);
        return isMatch;
    } catch (error) {
        console.log(`Error comparing passwords: ${error}`);
        return false;
    }
}