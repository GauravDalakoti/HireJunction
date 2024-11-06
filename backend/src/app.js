import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import userRoutes from "./routers/user.routes.js"
import jobRoutes from "./routers/job.routes.js"
import reqruiterRoutes from "./routers/reqruiter.routes.js"

const app = express()

app.use(cors(
    {
        credentials: true,
        origin: process.env.CORS_ORIGIN,
        method: ["GET", "POST", "DELETE", "PATCH"]
    }
))

app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// user routes
app.use("/api/v1/users", userRoutes)

// job routes
app.use("/api/v1/jobs", jobRoutes)

// reqruiter routes
app.use("/api/v1/reqruiters", reqruiterRoutes)

export default app;
