import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authentication.js"
import jobSlice from "./job.js";

const store = configureStore({

    reducer: {

        auth: authentication,
        job: jobSlice

    }
}
)

export default store