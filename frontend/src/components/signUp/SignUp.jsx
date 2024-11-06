import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUp() {

    const [userData, setUserData] = useState({ username: "", email: "", password: "" })
    const [signUpType, setSignUpType] = useState('user');

    const navigate = useNavigate()

    const handleOptionChange = (event) => {
        setSignUpType(event.target.value);
    };

    const handleChange = (e) => {

        const id = e.target.id
        const value = e.target.value
        setUserData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (signUpType === "reqruiter") {

            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/reqruiters/register-reqruiter`, {

                    method: "POST",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })

                if (response.ok) {

                    toast.success("SignUp Successfully")
                    const res = await response.json()
                    console.log(res)
                    navigate("/login")
                }

            } catch (error) {

                toast.error("Error while SignUp")
                console.log("Error while Sign Up the reqruiter ", error)
            }

        }

        else {

            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/users/register-user`, {

                    method: "POST",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })

                if (response.ok) {

                    toast.success("SignUp Successfully")
                    const res = await response.json()
                    console.log(res)
                    navigate("/login")
                }

            } catch (error) {

                toast.error("Error while SignUp")
                console.log("Error while Sign Up the user ", error)
            }
        }

    }

    return (
        <div className='min-h-[86vh] flex justify-center items-center py-4'>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 border-2 border-gray-600 rounded-xl px-6 py-4'>

                <h1 className='text-center text-2xl font-semibold'>Sign Up</h1>

                <div className='flex flex-col gap-3'>
                    <label className='text-xl font-semibold' htmlFor="username">Username</label>
                    <input id='username' className='outline-none border-2 border-gray-600 rounded-xl py-3 px-2 w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw] ' type="text" placeholder='Enter your username' value={userData.username} onChange={handleChange} autoComplete='off' />
                </div>

                <div className='flex flex-col gap-3'>
                    <label className='text-xl font-semibold' htmlFor="email">Email</label>
                    <input id='email' className='outline-none border-2 border-gray-600 rounded-xl py-3 px-2 w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw] ' type="email" placeholder='Enter your email' value={userData.email} onChange={handleChange} autoComplete='off' />
                </div>

                <div className='flex flex-col gap-3'>
                    <label className='text-xl font-semibold' htmlFor="password">Password</label>
                    <input id='password' type="password" className='outline-none border-2 border-gray-600 rounded-xl py-3 px-2 w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw] ' placeholder='Enter your password' value={userData.password} onChange={handleChange} autoComplete='off' />
                </div>

                <div className='flex gap-6'>
                    <div className='flex gap-2'>
                        <label className='text-xl font-semibold' htmlFor="user">User</label>
                        <input type="radio" className='w-4' value="user" id="user" checked={signUpType === "user"} onChange={handleOptionChange} required />
                    </div>
                    <div className='flex gap-2'>
                        <label className='text-xl font-semibold' htmlFor="reqruiter">Reqruiter</label>
                        <input type="radio" className='w-4' value="reqruiter" id="reqruiter" checked={signUpType === "reqruiter"} onChange={handleOptionChange} />
                    </div>

                </div>

                <div>
                    <button className='bg-blue-500 font-semibold w-[30vw] text-white rounded-lg py-2 px-4 hover:scale-x-105 max-lg:w-[60vw] max-sm:w-[75vw] ' type='submit'>Sign Up</button>
                </div>

                <div className='flex text-[1.0em] justify-center'>

                    <p className='mx-1'>Already have an account? </p>
                    <a href="/login" className='text-blue-600 hover:underline cursor-pointer'>Sign In</a>

                </div>

            </form>
        </div>
    )
}

export default SignUp