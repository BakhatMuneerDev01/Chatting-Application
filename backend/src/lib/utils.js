import jwt from "jsonwebtoken";

/**
 * Generates a JWT token for the given user ID and sets it as a cookie in the response.
 *
 * @param {string} userId - The ID of the user for whom the token is being generated.
 * @param {Object} res - The response object to set the cookie on.
 * @returns {string} The generated JWT token.
 */
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: "7d"})

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}