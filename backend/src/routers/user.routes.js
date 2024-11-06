import { Router } from "express"
import { registerUser, loginUser, logoutUser, getCurrentUser, updateUserProfile } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register-user").post(registerUser)
router.route("/login-user").post(loginUser)

//secured routes
router.route("/logout-user").post(verifyJWT, logoutUser)
router.route("/get-current-user").get(verifyJWT, getCurrentUser)
router.route("/update-user-profile").post(verifyJWT, updateUserProfile)


export default router;