import { Router } from "express";
import { addJob, removeJob, getReqruiterJobs, getAllJobs, searchJobs, jobApplication, getAllJobApplications, acceptJobApplication, rejectJobApplication, getUserAppliedJobs, filterJobs } from "../controllers/job.controller.js";
import { verifyReqruiterJWT, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/add-new-job").post(upload.single("companyLogo"), addJob)
router.route("/remove-job").post(verifyReqruiterJWT, removeJob)
router.route("/get-reqruiters-jobs").get(verifyReqruiterJWT, getReqruiterJobs)
router.route("/get-all-jobs").get(getAllJobs)
router.route("/search-jobs").get(searchJobs)
router.route("/apply-job").post(verifyJWT, upload.single("resume"), jobApplication)
router.route("/get-all-job-applications").get(verifyReqruiterJWT, getAllJobApplications)
router.route("/accept-job-application").post(verifyReqruiterJWT, acceptJobApplication)
router.route("/reject-job-application").post(verifyReqruiterJWT, rejectJobApplication)
router.route("/get-user-applied-jobs").get(verifyJWT, getUserAppliedJobs)
router.route("/filter-jobs").post(filterJobs)

export default router