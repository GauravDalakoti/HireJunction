import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/User.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshToken = async (userId) => {

    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {

        throw new ApiError(500, "Something went wrong while generating refresh and access token")

    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if ([username, email, password].some((field) => field === "")) {

        throw new ApiError(400, "All Field must be required")
    }

    const isAlreadyExisted = await User.findOne({

        $or: [{ username }, { email }]
    })

    if (isAlreadyExisted) {

        throw new ApiError(400, "User with email or username are already existed")
    }

    const user = await User.create({

        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {

        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200)
        .json(new ApiResponse(200, createdUser, "User registered Successfully"))

})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(

        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
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
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if ([email, password].some((field) => field === "")) {

        throw new ApiError(400, "Username or email must be required")
    }

    const user = await User.findOne({ email: email })

    if (!user) {

        throw new ApiError(401, "invalid user credentials")
    }

    const passwordCorrectOrNot = await user.isPasswordCorrect(password)

    if (!passwordCorrectOrNot) {

        throw new ApiError(400, "incorrect password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {

        secure: true,
        httpOnly: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { loggedInUser, accessToken, refreshToken }, "User Logged In Successfully"))

})

const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200)
        .json(new ApiResponse(200, req.user, "Current User Fetched Successfully"))

})

const updateUserProfile = asyncHandler(async (req, res) => {

    const { username, email } = req.body;

    if ([username, email].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const updatedProfile = await User.findByIdAndUpdate(

        req.user._id,
        {
            $set: {

                username: username,
                email: email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!updatedProfile) {

        throw new ApiError(500, "Something went wrong while updating the profile")
    }

    return res.status(200)
        .json(new ApiResponse(200, updatedProfile, "user profile updated successfully"))

})




export { registerUser, loginUser, logoutUser, getCurrentUser, updateUserProfile }