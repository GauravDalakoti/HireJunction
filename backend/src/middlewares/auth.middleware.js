import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/User.model.js"
import { Reqruiter } from "../models/reqruiter.model.js"

const verifyJWT = async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {

            throw new ApiError(401, "Unauthorized request ")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user
        next()

    } catch (error) {

        throw new ApiError(401, error?.message || "Invalid access Token")
    }
}

const verifyReqruiterJWT = async (req, res, next) => {

    try {

        const token = req.cookies?.reqruiterAccessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {

            throw new ApiError(401, "Unauthorized request ")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const reqruiter = await Reqruiter.findById(decodedToken?._id).select("-password -reqruiterRefreshToken")

        if (!reqruiter) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.reqruiter = reqruiter
        next()

    } catch (error) {

        throw new ApiError(401, error?.message || "Invalid access Token")
    }
}

export { verifyJWT, verifyReqruiterJWT }