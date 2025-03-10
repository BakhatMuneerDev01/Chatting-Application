import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

/**
 * Middleware to protect routes by verifying JWT token and user existence.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 * 
 * @throws {Error} - Throws an error if token verification or user retrieval fails.
 * 
 * @description
 * This middleware function performs the following steps:
 * 1. Retrieves the JWT token from cookies.
 * 2. Checks if the token is provided; if not, responds with a 401 status.
 * 3. Verifies the token using the secret key from environment variables.
 * 4. Checks if the token is valid; if not, responds with a 401 status.
 * 5. Finds the user by ID from the decoded token and excludes the password field.
 * 6. Checks if the user exists; if not, responds with a 401 status.
 * 7. Attaches the user object to the request object.
 * 8. Calls the next middleware function.
 */
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
}