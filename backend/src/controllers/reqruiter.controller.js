import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Reqruiter } from "../models/reqruiter.model.js"

const generateAccessAndRefreshToken = async (reqruiterId) => {

    try {

        const reqruiter = await Reqruiter.findById(reqruiterId)
        const reqruiterAccessToken = reqruiter.generateAccessToken()
        const reqruiterRefreshToken = reqruiter.generateRefreshToken()

        reqruiter.reqruiterRefreshToken = reqruiterRefreshToken
        await reqruiter.save({ validateBeforeSave: false })

        return { reqruiterAccessToken, reqruiterRefreshToken }

    } catch (error) {

        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerReqriuter = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if ([username, email, password].some((field) => field === "")) {

        throw new ApiError(400, "All Field must be required")
    }

    const isAlreadyExisted = await Reqruiter.findOne({

        $or: [{ username }, { email }]
    })

    if (isAlreadyExisted) {

        throw new ApiError(400, "reqruiter with email or username are already existed")
    }

    const reqruiter = await Reqruiter.create({

        username,
        email,
        password
    })

    const createdReqruiter = await Reqruiter.findById(reqruiter._id).select("-password -refreshToken")

    if (!createdReqruiter) {

        throw new ApiError(500, "Something went wrong while registering the reqruiter")
    }

    return res.status(200)
        .json(new ApiResponse(200, createdReqruiter, "Reqruiter registered Successfully"))

})

const loginReqruiter = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if ([email, password].some((field) => field === "")) {

        throw new ApiError(400, "email or password must be required")
    }

    const reqruiter = await Reqruiter.findOne({ email: email })

    if (!reqruiter) {

        throw new ApiError(401, "invalid reqruiter credentials")
    }

    const passwordCorrectOrNot = await reqruiter.isPasswordCorrect(password)

    if (!passwordCorrectOrNot) {

        throw new ApiError(400, "incorrect password")
    }

    const { reqruiterAccessToken, reqruiterRefreshToken } = await generateAccessAndRefreshToken(reqruiter._id)

    const loggedInReqruiter = await Reqruiter.findById(reqruiter._id).select("-password -reqruiterRefreshToken")

    const options = {

        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("reqruiterAccessToken", reqruiterAccessToken, options)
        .cookie("reqruiterRefreshToken", reqruiterRefreshToken, options)
        .json(new ApiResponse(200, { loggedInReqruiter, reqruiterAccessToken, reqruiterRefreshToken }, "reqruiter Logged In Successfully"))

})


const logoutReqruiter = asyncHandler(async (req, res) => {

    await Reqruiter.findByIdAndUpdate(

        req.reqruiter._id,
        {
            $unset: {
                reqruiterRefreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {

        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("reqruiterAccessToken", options)
        .clearCookie("reqruiterRefreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const getCurrentReqruiter = asyncHandler(async (req, res) => {

    return res.status(200)
        .json(new ApiResponse(200, req.reqruiter._id, "Current reqruiter Fetched Successfully"))

})

export { registerReqriuter, loginReqruiter, logoutReqruiter, getCurrentReqruiter }