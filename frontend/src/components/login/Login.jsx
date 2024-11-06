import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authentication.js';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast"
import { assets } from '../../assets/assets.js';

function Login() {

    const [userData, setUserData] = useState({ email: "", password: "" })

    const [signUpType, setSignUpType] = useState('user');
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

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
        setLoading(true)
        if (signUpType === "reqruiter") {

            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/reqruiters/login-reqruiter`, {

                    method: "POST",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })

                if (response.ok) {

                    toast.success("Login Successfully")
                    const res = await response.json()
                    console.log(res)
                    dispatch(login({ userData: res.data.loggedInUser }));
                    localStorage.setItem("reqruiterToken", res.data.reqruiterAccessToken)
                    setLoading(false)
                    navigate("/reqruiter-page")
                }

            } catch (error) {

                toast.error("Error while Login")
                setLoading(false)
                console.log("Error while Sign Up the reqruiter ", error)
            }
        }

        else {

            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/users/login-user`, {

                    method: "POST",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })

                if (response.ok) {

                    toast.success("Login Successfully")
                    const res = await response.json()
                    console.log(res)
                    localStorage.setItem("userToken", res.data.accessToken)
                    dispatch(login({ userData: res.data.loggedInUser }))
                    setLoading(false)
                    navigate("/")
                }

            } catch (error) {

                toast.error("Error while Login")
                setLoading(false)
                console.log("Error while Sign Up the user ", error)
            }
        }

    }

    return (
        <div className='min-h-[87vh] flex justify-center items-center '>

            {
                loading ? <div className=''>
                    <img src={assets.loading} alt="" />
                </div>

                    : <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-2 border-gray-600 rounded-xl p-6'>

                        <h1 className='text-center text-2xl font-semibold'>Sign In</h1>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="email" className='text-xl font-semibold'>Email</label>
                            <input id='email' type="email" className='outline-none border-2 border-gray-600 rounded-xl py-3 px-2 w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw] ' placeholder='Enter your email' value={userData.email} onChange={handleChange} autoComplete='off' />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="password" className='text-xl font-semibold'>Password</label>
                            <input id='password' type="password" className='outline-none rounded-xl border-2 border-gray-600 py-3 px-2 w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw]' placeholder='Enter your password' value={userData.password} onChange={handleChange} autoComplete='off' />
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
                            <button className='bg-blue-500 font-semibold w-[30vw] text-white rounded-lg py-2 px-4 hover:scale-x-105 max-lg:w-[60vw] max-sm:w-[75vw]' type='submit'>login</button>
                        </div>

                        <div className='flex gap-1 items-center justify-center'>

                            <p>Don't have an account?</p>
                            <a href='/sign-up' className='text-blue-600 hover:underline font-sans cursor-pointer'>Sign Up</a>
                        </div>

                    </form>

            }
        </div>
    )
}

export default Login