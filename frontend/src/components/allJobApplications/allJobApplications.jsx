import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'
import { assets } from '../../assets/assets'

function JobApplications() {

  const [allJobsApplications, setAllJobApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    (async () => {

      try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/get-all-job-applications`, {

          method: "GET",
          credentials: "include",
          headers: {

            "Content-Type": "application/json"
          }
        })

        if (response.ok) {

          const res = await response.json()
          console.log(res);
          setAllJobApplications(res.data)
          setLoading(false)
        }

      } catch (error) {

        console.log("Error while fetching job application from the database", error)
      }

    })()

  }, [])

  const handleAccept = async (email, _id) => {

    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/accept-job-application`, {

        method: "POST",
        credentials: "include",
        headers: {

          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, _id })
      })

      if (response.ok) {

        const res = await response.json()
        console.log(res);

      }

    } catch (error) {

      console.log("Error while accepting the job application", error)

    }

  }

  const handleReject = async (email, _id) => {

    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/reject-job-application`, {

        method: "POST",
        credentials: "include",
        headers: {

          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, _id })
      })

      if (response.ok) {

        const res = await response.json()
        console.log(res);

      }
    } catch (error) {

      console.log("Error while rejecting the job application", error)

    }

  }

  const openPdf = (pdfUrl) => {
    window.open(pdfUrl);
  };

  return (
    <div className='px-6 flex flex-col gap-4 h-[86vh] w-[76vw] max-md:w-[95vw] max-md:px-10 overflow-y-auto py-4'>

      <div className='text-center font-bold text-2xl py-4'>Job Applications</div>

      {
        loading ? <div className='flex justify-center items-center'>
          <img src={assets.loading} alt="" />
        </div> :

          allJobsApplications.length < 1 ? <div>
            <div className='font-semibold text-3xl'>No Job Application found</div>
          </div> :

            allJobsApplications.map((curjobapp) => (

              <div className='flex flex-col items-center gap-4 '>
                {
                  curjobapp.map((curjob) => (

                    <div className='flex justify-center max-lg:flex-col hover:bg-slate-300 items-center w-[70vw] max-md:w-[85vw] gap-8 rounded-xl border-2 border-gray-300 py-4 px-8'>

                      <div className='flex gap-4 max-md:flex-col'>

                        <div className='flex flex-col gap-3'>
                          <div className='flex gap-1'>
                            <div className='font-semibold text-xl'>Name:</div>
                            <div className='text-lg'>{curjob.fullName}</div>
                          </div>

                          <div className='flex gap-1'>
                            <div className='font-semibold text-xl'>Email:</div>
                            <div className='text-lg'>{curjob.email}</div>
                          </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                          <div className='flex gap-1'>
                            <div className='font-semibold text-xl'>Contact:</div>
                            <div className='text-lg'>{curjob.contact}</div>
                          </div>

                          <div className='flex gap-1'>
                            <div className='font-semibold text-xl'>Resume:</div>
                            <div onClick={() => openPdf(curjob.resume)}>open resume</div>

                          </div>
                        </div>

                      </div>

                      <div>

                        <div className='flex gap-3 items-center'>
                          {
                            curjob.accepted && (

                              <button className='bg-orange-500 font-semibold text-white rounded-lg py-1 px-2'>Accepted</button>)
                            // :
                            // <div className='flex gap-2'>
                            //   <button onClick={() => handleAccept(curjob.email, curjob._id)} className='bg-blue-500 hover:scale-105 font-semibold text-white rounded-lg py-1 px-2'>Accept</button>
                            //   <button onClick={() => handleReject(curjob.email, curjob._id)} className='bg-blue-500 hover:scale-105 font-semibold text-white rounded-lg py-1 px-2'>Reject</button>
                            // </div>
                          }
                          {

                            curjob.rejected && (<button className='bg-orange-500 font-semibold text-white rounded-lg py-1 px-2'>Rejected</button>)
                            // : <div className='flex gap-2'>
                            //   <button onClick={() => handleAccept(curjob.email, curjob._id)} className='bg-blue-500 hover:scale-105 font-semibold text-white rounded-lg py-1 px-2'>Accept</button>
                            //   <button onClick={() => handleReject(curjob.email, curjob._id)} className='bg-blue-500 hover:scale-105 font-semibold text-white rounded-lg py-1 px-2'>Reject</button>
                            // </div>
                          }
                          {

                            (!curjob.accepted && !curjob.rejected) &&

                            <div className='flex gap-2'>
                              <button onClick={() => handleAccept(curjob.email, curjob._id)} className='bg-blue-500 hover:scale-105 font-semibold text-white rounded-lg py-1 px-2'>Accept</button>
                              <button onClick={() => handleReject(curjob.email, curjob._id)} className='bg-blue-500 hover:scale-105 font-semibold text-white rounded-lg py-1 px-2'>Reject</button>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

            ))
      }
    </div >
  )
}

export default JobApplications