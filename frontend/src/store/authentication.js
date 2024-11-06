import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    status: false,
    userData: null
}

const authentication = createSlice({

    name: "auth",
    initialState,

    reducers: {

        login(state, actions) {

            state.status = true
            state.userData = actions.payload.userData
        },

        logout(state) {

            state.status = false
            state.userData = null
        }
    }
})

export const { login, logout } = authentication.actions

export default authentication.reducer