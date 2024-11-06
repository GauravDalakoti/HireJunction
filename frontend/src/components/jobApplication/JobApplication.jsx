import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

function JobApplication() {

    const [userApplicationData, setUserApplicationData] = useState({ fullName: "", email: "", contact: "" })
    const [resume, setResume] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { _id } = useParams()

    const handleChange = (e) => {

        const id = e.target.id;
        const value = e.target.value
        setUserApplicationData(prev => ({ ...prev, [id]: value }))
    }

    const handleResume = (e) => {

        setResume(e.target.files[0])
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        const formData = new FormData()

        formData.append("resume", resume)
        formData.append("fullName", userApplicationData.fullName)
        formData.append("email", userApplicationData.email)
        formData.append("contact", userApplicationData.contact)
        formData.append("id", _id)

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/apply-job`, {

                method: "POST",
                credentials: 'include',
                headers: {

                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem("userToken")}`
                },
                body: formData
            })

            if (response.ok) {

                toast.success("Job Applied Successfully")
                const res = await response.json()
                console.log(res)
                setLoading(false)
                navigate("/your-jobs")
                setUserApplicationData({ fullName: "", email: "", contact: "" })
            }

        } catch (error) {

            console.log("Error while applying for job", error)
            toast.error("error while applying the job")
            setLoading(false)
        }
    }

    return (
        <div className='min-h-[87vh] flex justify-center items-center '>
            {
                loading ? <div className=''>
                    <img src={assets.loading} alt="" />
                </div>

                    : <form onSubmit={handleSubmit} className='flex flex-col max-sm:items-center max-sm:w-[90vw] gap-5 border-2 border-gray-600 rounded-xl p-6'>

                        <div>
                            <div className='font-semibold text-center text-2xl'>Job Application Details</div>
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="fullName" className='text-xl font-semibold'>Full Name</label>
                            <input className='outline-none border-2 border-gray-600 rounded-xl py-3 px-2 max-lg:w-[60vw] max-md:w-[80vw] ' id='fullName' type="text" placeholder='Enter your Full Name' autoComplete='off' value={userApplicationData.fullName} onChange={handleChange} required />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="fullName" className='text-xl font-semibold'>Email</label>
                            <input className='border-2 border-gray-500 rounded-xl outline-none px-2 py-2 max-lg:w-[60vw] max-md:w-[80vw] ' id='email' type="email" placeholder='Enter your email' value={userApplicationData.email} onChange={handleChange} required />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="contact" className='text-xl font-semibold'>Contact</label>
                            <input className='border-2 border-gray-500 rounded-xl outline-none px-2 py-2 max-lg:w-[60vw] max-md:w-[80vw] ' id='contact' type="text" placeholder='Enter your contact Number' value={userApplicationData.contact} onChange={handleChange} required />
                        </div>

                        <div className='flex gap-2 max-sm:flex-col max-sm:self-start max-sm:gap-4'>
                            <label htmlFor="resume" className='text-xl font-semibold'>add your resume:</label>
                            <input id='resume' type="file" accept='.pdf ' onChange={handleResume} required />
                        </div>

                        <div className='max-sm:self-start'>
                            <button type='submit' className='bg-blue-600 font-semibold hover:bg-blue-500 text-white rounded-xl px-5 py-2 '>apply</button>
                        </div>

                    </form>
            }
        </div>
    )
}

export default JobApplication