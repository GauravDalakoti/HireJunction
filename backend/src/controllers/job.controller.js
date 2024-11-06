import { Job } from "../models/job.model.js";
import { JobApplication } from "../models/jobApplication.model.js";
import { Reqruiter } from "../models/reqruiter.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const addJob = asyncHandler(async (req, res) => {

    const { companyName, jobTitle, jobDescription, jobType, jobLocation, salary, eligiblityCriteria, requiredSkills, noOfPosts, lastApplyDate } = req.body

    if ([companyName, jobTitle, jobDescription, jobType, jobLocation, salary, eligiblityCriteria, requiredSkills, noOfPosts, lastApplyDate].some((field) => field === "")) {

        throw new ApiError(200, "All field must be required")
    }

    const companyLogo = req.file;
    console.log(companyLogo);

    if (!companyLogo) {

        throw new ApiError(400, "company logo is required")
    }

    const companyAvatar = await uploadOnCloudinary(companyLogo.path)

    const createdJob = await Job.create({

        companyName,
        jobTitle,
        jobDescription,
        jobLocation,
        jobType,
        salary,
        companyLogo: companyAvatar.url,
        eligiblityCriteria,
        requiredSkills,
        noOfPosts,
        lastApplyDate,
        reqruiter: req.reqruiter?._id
    })

    if (!createdJob) {

        throw new ApiError(400, "Something went wrong while uploading on mongodb database")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "New Job Created Successfully"))

})

const removeJob = asyncHandler(async (req, res) => {

    const { _id } = req.body

    if (!_id) {

        throw new ApiError(400, "unauthorized requests")
    }

    const removedJob = await Job.deleteOne({ _id })

    if (!removedJob) {

        throw new ApiError(400, "error while removing the job from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, removedJob, "Job Removed Successfully"))

})

const getReqruiterJobs = asyncHandler(async (req, res) => {

    const reqruiter = await Reqruiter.findById(req.reqruiter?._id)

    if (!reqruiter) {

        throw new ApiError(401, "unauthorized request")
    }

    const ReqruiterJobs = await Job.find({ reqruiter: reqruiter._id })

    if (!ReqruiterJobs) {

        throw new ApiError(404, "reqruiter Jobs not found ")
    }

    return res.status(200)
        .json(new ApiResponse(200, ReqruiterJobs, "reqruiter jobs fetched successfully"))

})

const getAllJobs = asyncHandler(async (req, res) => {

    const allJobs = await Job.find({})

    if (!allJobs) {

        throw new ApiError(500, "Something went wrong while fetching the data from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, allJobs, "All Jobs Fetched Successfully"))

})

const searchJobs = asyncHandler(async (req, res) => {

    const { query } = req.query;

    if (!query) {
        throw new ApiError(400, 'No search query provided');
    }

    const regex = new RegExp(query, 'i');

    const jobs = await Job.find({
        $or: [
            { jobTitle: { $regex: regex } },
            { jobDescription: { $regex: regex } },
        ],
    })

    return res.status(200)
        .json(new ApiResponse(200, jobs, "realated jobs searched successfully"))
})

const jobApplication = asyncHandler(async (req, res) => {

    const { fullName, email, contact, id } = req.body

    if ([fullName, email, contact, id].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const resume = req.file

    if (!resume) {

        throw new ApiError(400, "resume is required")
    }

    const uploadedResume = await uploadOnCloudinary(resume.path)

    const appliedJob = await JobApplication.create({

        fullName,
        email,
        contact,
        resume: uploadedResume.url,
        id: id,
        owner: req.user?._id
    })

    return res.status(200)
        .json(new ApiResponse(200, { appliedJob }, "Job applied Successfully"))
})

const getAllJobApplications = asyncHandler(async (req, res) => {

    const reqruiterJobs = await Job.find({ reqruiter: req.reqruiter?._id })

    const allJobsApplication = reqruiterJobs.map(async (curjob) => {

        const job = await JobApplication.find({ id: curjob._id })
        return job;
    })

    console.log(allJobsApplication)
    const jobApplications = await Promise.all(allJobsApplication)

    if (!jobApplications) {

        throw new ApiError(400, "No job Application found")
    }

    return res.status(200)
        .json(new ApiResponse(200, jobApplications, "All Job Application Fetched Successfully"))

})

const acceptJobApplication = asyncHandler(async (req, res) => {

    const { email, _id } = req.body

    if ([email, _id].some((field) => field === "")) {

        throw new ApiError(400, "All Field must be required")
    }

    const acceptedApplication = await JobApplication.findByIdAndUpdate(

        _id,
        {
            $set: {

                accepted: true
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(new ApiResponse(200, acceptedApplication, "job Application Accepted Successfully"))
})

const rejectJobApplication = asyncHandler(async (req, res) => {

    const { email, _id } = req.body

    if ([email, _id].some((field) => field === "")) {

        throw new ApiError(400, "All Field must be required")
    }

    const rejectedApplication = await JobApplication.findByIdAndUpdate(

        _id,
        {
            $set: {

                rejected: true
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .json(new ApiResponse(200, rejectedApplication, "job Application Rejected Successfully"))
})

const getUserAppliedJobs = asyncHandler(async (req, res) => {

    const appliedJobs = await JobApplication.find({ owner: req.user?._id })

    if (!appliedJobs) {

        throw new ApiError(400, "No Applied jobs found")
    }

    const allJobs = appliedJobs.map(async (curjob) => {

        const job = await Job.findOne({ _id: curjob.id })
        return { job, curjob };
    })

    const jobs = await Promise.all(allJobs)

    return res.status(200)
        .json(new ApiResponse(200, jobs, "Applied jobs fetched successfully"))

})

const filterJobs = asyncHandler(async (req, res) => {

    const { arr } = req.body

    if (arr.length < 1) {

        throw new ApiError(400, "empty array")
    }

    console.log(arr)

    const allJobs = await Job.find({})
    console.log(allJobs);

    // const filteredJobs = jobs.map(async (curjob) =>

    //     arr.map((job) => job === curjob.jobTitle)
    // )

    const jobarr = [];

    for (const i in allJobs) {

        for (const j in arr) {

            if (allJobs[i] === arr[j]) {

                console.log(jobs[i])
                jobarr.push(allJobs[i])
            }

        }
    }

    if (!jobarr) {

        throw new ApiError(400, "NO Jobs found")
    }

    return res.status(200)
        .json(new ApiResponse(200, jobarr, "Jobs Filtered Successfully"))

})

export { addJob, removeJob, getReqruiterJobs, getAllJobs, searchJobs, jobApplication, getAllJobApplications, acceptJobApplication, rejectJobApplication, getUserAppliedJobs, filterJobs }