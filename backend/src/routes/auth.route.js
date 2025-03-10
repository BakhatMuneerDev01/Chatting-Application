import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

// Authentication routes
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

// update credentials route {Protedted Route}
router.put("/update-profile", protectRoute, updateProfile)
// check authentication {protected route}
router.get("/check", protectRoute, checkAuth)

export default router;