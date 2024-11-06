import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

function YourJobs() {

    const [userAppliedJobs, setUserAppliedJobs] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);

    useEffect(() => {

        ; (async () => {

            try {

                const response = await fetch("http://localhost:8000/api/v1/jobs/get-user-applied-jobs", {

                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                if (response.ok) {

                    const res = await response.json()
                    console.log(res);
                    setUserAppliedJobs(res.data)
                }

            } catch (error) {

                console.log("Error while fetching applied job from the database", error)
            }

        })()

    }, [])

    const openPdf = (pdfUrl) => {
        window.open(pdfUrl);
    };

    return (
        <div className='flex flex-col gap-4 items-center px-6 py-6 min-h-[87vh]'>

            <div className='text-center font-bold text-3xl py-6'>Your Job Applications</div>

            {
                userAppliedJobs.map((currentJob, index) => (

                    <div className='flex flex-col gap-4 py-5 w-[80vw] hover:bg-slate-200 rounded-xl border-2 border-gray-300 max-lg:w-[90vw] max-md:px-5' key={index} >

                        <div className='flex gap-10 max-lg:gap-4 items-center justify-center '>

                            <div className='flex gap-1'>
                                <img src={currentJob.job.companyLogo} className='max-sm:w-16' alt="" width={40} />
                            </div>
                            <div className='flex gap-1 max-lg:flex-col'>
                                <div className='font-semibold text-xl'>Company Name:</div>
                                <div className='text-lg'>{currentJob.job.companyName}</div>
                            </div>

                            <div className='flex gap-1 max-lg:flex-col'>
                                <div className='font-semibold text-xl'>Job Role:</div>
                                <div className='text-lg'>{currentJob.job.jobTitle}</div>
                            </div>

                        </div>

                        <div className='flex gap-6 justify-center '>

                            <div className='flex gap-1 max-lg:flex-col'>
                                <div className='font-semibold text-xl'>Apply Date:</div>
                                <div className='text-lg'>{currentJob.curjob.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className='flex gap-1 max-lg:flex-col'>
                                <div className='font-semibold text-xl'>Salary:</div>
                                <div className='text-lg'>{currentJob.job.salary}</div>
                            </div>

                            <div className='flex gap-3 max-lg:flex-col max-lg:gap-1'>
                                <div className='font-semibold text-xl'>Application Status:</div>
                                {
                                    currentJob.curjob.accepted && <div className='font-semibold text-lg'>accepted</div>
                                }
                                {
                                    currentJob.curjob.rejected && <div className='font-semibold text-lg'>rejected</div>
                                }
                                {
                                    (!currentJob.curjob.accepted && !currentJob.curjob.rejected) &&
                                    <div className='font-semibold text-lg'>pending</div>
                                }
                            </div>

                        </div>
                    </div>

                ))
            }
        </div >

    )
}

export default YourJobs