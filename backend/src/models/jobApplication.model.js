import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new Schema(
    {
        fullName: {

            type: String,
            required: true
        },

        email: {

            type: String,
            required: true,
        },

        contact: {

            type: Number,
            required: true
        },

        resume: {

            type: String,
            required: true
        },

        id: {

            type: Schema.Types.ObjectId,
            ref: "Job",
        },

        accepted: {

            type: Boolean,
        },

        rejected: {

            type: Boolean
        },

        owner: {

            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        timestamps: true
    }
)

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema)