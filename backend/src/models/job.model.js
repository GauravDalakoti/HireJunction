import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        companyName: {

            type: String,
            required: true
        },

        companyLogo: {

            type: String, // cloudinary url
            required: true
        },

        jobTitle: {

            type: String,
            required: true
        },

        jobType: {

            type: String,
            required: true
        },

        jobDescription: {

            type: String,
            required: true
        },

        jobLocation: [

            {
                type: String,
                required: true
            }
        ],

        eligiblityCriteria: {

            type: String,
            required: true
        },

        salary: {

            type: String,
            required: true
        },

        requiredSkills: {

            type: String,
            required: true
        },

        noOfPosts: {

            type: Number,
            required: true
        },
        lastApplyDate: {

            type: String,
            required: true
        },
        reqruiter: {

            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)

export const Job = mongoose.model("Job", jobSchema)