import dotenv from "dotenv"

import app from "./src/app.js"
import ConnectDB from "./src/db/dbConnection.js"

dotenv.config({ path: ".env" })

ConnectDB()
    .then(() => {

        app.on("error", (error) => {

            console.log("ERORR:", error)
            throw error
        })

        app.get("/", (req, res) => {

            res.send("hello server running")
        })

        app.listen(process.env.PORT || 8000, () => {

            console.log(`Server is running at port http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => {

        console.log("MONGO db connection failed !!!", err)
    })