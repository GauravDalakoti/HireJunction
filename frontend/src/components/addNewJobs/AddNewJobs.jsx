import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

function AddNewJobs() {

    const [jobData, setJobData] = useState({
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        jobLocation: '',
        jobType: '',
        salary: '',
        eligiblityCriteria: '',
        requiredSkills: '',
        noOfPosts: '',
        lastApplyDate: ''
    })

    const [file, setFile] = useState(null)
    const [isSelected, setIsSelected] = useState(false)

    const changeHandler = (e) => {

        setFile(e.target.files[0])
        setIsSelected(true)
    }

    const handleChange = (e) => {

        const value = e.target.value;
        const id = e.target.id

        setJobData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(jobData);

        const formData = new FormData()

        formData.append("companyLogo", file)
        formData.append("companyName", jobData.companyName)
        formData.append("jobTitle", jobData.jobTitle)
        formData.append("jobDescription", jobData.jobDescription)
        formData.append("jobLocation", jobData.jobLocation)
        formData.append("jobType", jobData.jobType)
        formData.append("salary", jobData.salary)
        formData.append("eligiblityCriteria", jobData.eligiblityCriteria)
        formData.append("requiredSkills", jobData.requiredSkills)
        formData.append("noOfPosts", jobData.noOfPosts)
        formData.append("lastApplyDate", jobData.lastApplyDate)

        try {
            const response = await fetch("http://localhost:8000/api/v1/jobs/add-new-job", {

                method: "POST",
                credentials: "include",
                body: formData
            })

            if (response.ok) {

                toast.success("new job added successfully")
                const res = await response.json()
                console.log(res);
            }
        } catch (error) {

            toast.error("error while adding a new job")
            console.log("Error while adding a new job", error)
        }
    }

    return (
        <div className='h-[86vh] overflow-y-scroll max-md:w-[95vw] max-md:border-2'>

            <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-4 '>

                <div className='flex items-center gap-6 max-sm:flex-col'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="jobTitle" className='text-xl font-semibold'>Job Role</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' placeholder='e.g. frontend developer, product manager' id='jobTitle' type="text" value={jobData.jobTitle} onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="salary" className='text-xl font-semibold'>Salary (Package)</label>
                        <input className='border-2 border-gray-500 max-md:w-[82vw] rounded-xl outline-none px-2 py-2' id='salary' type="text" value={jobData.salary} onChange={handleChange} placeholder='e.g. 5Lpa, 3Lpa' />
                    </div>
                </div>

                <div className='flex items-center gap-6 max-sm:flex-col'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="jobLocation" className='text-xl font-semibold'>Job Locations</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' id='jobLocation' type="text" value={jobData.jobLocation} onChange={handleChange} placeholder='e.g. Gurgoun, chennai' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="jobType" className='text-xl font-semibold'>Job Type</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' id='jobType' type="text" value={jobData.jobType} onChange={handleChange} placeholder='e.g. full time, internship' />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="jobDescription" className='text-xl font-semibold' >Job Description</label>
                    <textarea placeholder='Enter max-md:w-[82vw] job Description' className='border-2 border-gray-500 rounded-xl outline-none px-2 py-2' value={jobData.jobDescription} onChange={handleChange} id="jobDescription" rows={4} cols={10}></textarea>
                </div>

                <div className='flex items-center gap-6 max-sm:flex-col'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="companyName" className='text-xl font-semibold'>Company Name</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' id='companyName' type="text" value={jobData.companyName} onChange={handleChange} placeholder='Enter Company name' />
                    </div >
                    <div className='flex flex-col gap-3 max-md:self-start'>
                        <label htmlFor="companyLogo" className='text-xl font-semibold'>

                            Company Logo<img htmlFor='companyLogo' src={assets.fileSelector} alt="" width={50} />
                        </label>
                        <input className='hidden' type="file" name="" id="companyLogo" onChange={changeHandler} />

                    </div>
                    {
                        isSelected && (<img src={URL.createObjectURL(file)} className="object-cover h-16 w-16 object-top" />)
                    }
                </div>

                <div className='flex items-center gap-6 max-sm:flex-col'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="eligiblityCriteria" className='text-xl font-semibold' >Eligibility Criteria</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' id='eligiblityCriteria' type="text" value={jobData.eligiblityCriteria} onChange={handleChange} placeholder='Enter eligiblity criteria' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="requiredSkills" className='text-xl font-semibold'>Required Skills</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' id='requiredSkills' type="text" value={jobData.requiredSkills} onChange={handleChange} placeholder='Enter required skills' />
                    </div>
                </div>

                <div className='flex items-center gap-6 max-sm:flex-col'>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="noOfposts" className='text-xl font-semibold'>Number of posts</label>
                        <input className='border-2 max-md:w-[82vw] border-gray-500 rounded-xl outline-none px-2 py-2' id='noOfPosts' type="text" value={jobData.noOfPosts} placeholder='e.g. 12' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col gap-3 max-md:self-start'>
                        <label htmlFor="lastApplyDate" className='text-xl font-semibold'>Last Apply Date</label>
                        <input type="date" id="lastApplyDate" value={jobData.lastApplyDate} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <button type='submit' className='bg-blue-500 font-semibold hover:bg-blue-400 text-white rounded-xl p-2'>Add Job</button>
                </div>
            </form>

        </div>
    )
}

export default AddNewJobs