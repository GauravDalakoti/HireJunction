import { Router } from "express"
import { loginReqruiter, logoutReqruiter, registerReqriuter } from "../controllers/reqruiter.controller.js"
import { verifyReqruiterJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register-reqruiter").post(registerReqriuter)
router.route("/login-reqruiter").post(loginReqruiter)

router.route("/logout-reqruiter").post(verifyReqruiterJWT, logoutReqruiter)

export default router