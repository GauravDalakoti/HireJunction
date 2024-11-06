import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const reqruiterSchema = new Schema(
    {
        username: {

            type: String,
            required: true,
            unique: true
        },

        email: {

            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {

            type: String,
            required: true
        },

        reqruiterRefreshToken: {

            type: String
        }
    },
    {
        timestamps: true
    }
)

reqruiterSchema.pre('save', async function (next) {

    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

reqruiterSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
}

reqruiterSchema.methods.generateAccessToken = function () {

    return jwt.sign(

        {
            _id: this._id,
            email: this.email
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

reqruiterSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Reqruiter = mongoose.model("Reqruiter", reqruiterSchema)