import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const ConnectDB = async () => {

    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! DB HOST:${connectionInstance.connection.host}`)

    } catch (error) {

        console.log("Mongodb connection Failed:", error)
        process.exit(1)

    }
}

export default ConnectDB