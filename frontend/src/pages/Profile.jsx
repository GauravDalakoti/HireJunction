import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

function Profile() {

    const [userProfileData, setUserProfileData] = useState({ username: "", email: "" })

    const [submitButton, setSubmitButton] = useState(false)
    const [readonly, setReadOnly] = useState(true)

    const handleUserData = (e) => {

        setUserProfileData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    useEffect(() => {

        (async () => {

            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/users/get-current-user`, {

                    method: "GET",
                    credentials: "include",
                    headers: {

                        "Content-Type": "appliction/json"
                    },
                })

                if (response.ok) {

                    const res = await response.json();
                    console.log(res)
                    setUserProfileData({ username: res.data.username, email: res.data.email })
                }

            } catch (error) {

                console.log("Error while fetching the user profile data", error)

            }

        })()

    }, [])

    const handleEdit = () => {

        setSubmitButton(true)
        setReadOnly(false)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setSubmitButton(false)
        setReadOnly(true)
        console.log(userProfileData)

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/users/update-user-profile`, {

                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfileData)
            })

            if (response.ok) {

                toast.success("profile updated successfully")
                const res = await response.json()
                console.log(res)
            }

        } catch (error) {

            console.log("Error while submit your changes", error)
            toast.error("error while updating your profile")

        }
    }

    return (
        <div className='min-h-[87vh] flex justify-center items-center'>

            <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4 border-2 rounded-xl  border-gray-400'>

                <div>
                    <div className='font-semibold text-center text-2xl'>Profile Details</div>
                </div>

                <div onClick={handleEdit} className='flex gap-2 hover:bg-blue-500 bg-blue-600 px-3 py-1 rounded-lg items-center w-fit'>
                    <img src={assets.edit} alt="" width={20} />
                    <div className='text-white font-semibold'>Edit </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="fullName" className='text-xl font-semibold'>Username</label>
                    <input className='border-2 border-gray-500 rounded-xl outline-none px-2 py-2  w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw]' id='username' type="text" value={userProfileData.username} onChange={handleUserData} autoComplete='off' readOnly={readonly} />
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="fullName" className='text-xl font-semibold'>Email</label>
                    <input className='border-2 border-gray-500 rounded-xl outline-none px-2 py-2  w-[30vw] max-lg:w-[60vw] max-sm:w-[75vw]' id='email' type="email" value={userProfileData.email} onChange={handleUserData} readOnly={readonly} />
                </div>

                {
                    submitButton && <div>
                        <button type='submit' className='font-semibold text-white bg-blue-600 px-3 py-2 hover:scale-105 rounded-lg '>submit</button>
                    </div>
                }

            </form>

        </div>
    )
}

export default Profile