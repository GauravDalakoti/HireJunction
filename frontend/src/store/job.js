import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    allJobs: []
}

const jobSlice = createSlice({

    name: "job",
    initialState,

    reducers: {

        setAllJobs: (state, actions) => {
            state.allJobs = actions.payload;
        },
    }
})

export const { setAllJobs } = jobSlice.actions

export default jobSlice.reducer