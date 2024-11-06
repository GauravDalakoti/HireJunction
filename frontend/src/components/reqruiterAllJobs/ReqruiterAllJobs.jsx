import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'

function ReqruiterAllJobs() {

  const [reqruiterJobs, setReqruiterJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    (async () => {

      try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/get-reqruiters-jobs`, {

          method: "GET",
          credentials: "include",
          headers: {

            "Content-Type": "application/json"
          }

        })

        if (response.ok) {

          const res = await response.json()
          console.log(res);
          setReqruiterJobs(res.data)
          setLoading(false)

        }

      } catch (error) {

        console.log("Error while fetching all jobs from the database", error);

      }

    })()

  }, [])

  const handleRemove = async (_id) => {

    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/remove-job`, {

        method: "POST",
        credentials: "include",
        headers: {

          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id })
      })

      if (response.ok) {

        toast.success("job removed successfully")
        const res = await response.json()
        console.log(res);

      }

    } catch (error) {

      toast.error("error while removing the job")
      console.log("Error while remove the job", error)

    }

  }

  return (

    <div className='flex flex-col gap-4 items-center p-6 h-[86vh] overflow-y-scroll max-md:w-[95vw]'>

      <div className='font-semibold text-2xl'>All Jobs</div>
      {
        loading ? <div className='flex justify-center items-center py-8'>
          <img src={assets.loading} alt="" />
        </div>

          : reqruiterJobs.map((curjob) => (

            <div className='flex flex-col justify-center shadow-xl gap-4 border-2 border-gray-400 rounded-xl p-4'>

              <div className='flex items-center gap-8 shadow-xl py-2 '>
                <div className='px-4'>
                  <img src={curjob.companyLogo} alt="" width={40} />
                </div>

                <div>
                  <div>job role</div>
                  <div className='text-xl font-semibold'>{curjob.jobTitle}</div>
                </div>
              </div>

              <div className='flex gap-4 items-center'>
                <div>
                  <div className='text-lg font-semibold'>Salary</div>
                  <div>{curjob.salary}</div>
                </div>
                <div>
                  <div className='text-lg font-semibold'>Last Apply Date</div>
                  <div>{curjob.lastApplyDate}</div>
                </div>
              </div>

              <div className='flex gap-4 items-center'>
                <div>
                  <div className='text-lg font-semibold'>Posts</div>
                  <div>{curjob.noOfPosts}</div>
                </div>
                <div>
                  <div className='text-lg font-semibold'>Job Type</div>
                  <div>{curjob.jobType}</div>
                </div>
                <div>
                  <div className='text-lg font-semibold'>Job Location</div>
                  <div>{curjob.jobLocation}</div>
                </div>
              </div>

              <div >
                <div>
                  <div className='text-lg font-semibold'>job description</div>
                  <div>{curjob.jobDescription}</div>
                </div>
              </div>
              <div>
                <div>
                  <div className='text-lg font-semibold'>Skills</div>
                  <div>{curjob.requiredSkills}</div>
                </div>
              </div>
              <div className='flex justify-between items-center max-md:flex-col max-md:gap-5'>
                <div className='max-md:flex max-md:self-start max-md:gap-2 max-md:items-center'>
                  <div className='text-lg font-semibold'>Eligibility Criteria</div>
                  <div>{curjob.eligiblityCriteria}</div>
                </div>

                <div>
                  <button onClick={() => handleRemove(curjob._id)} className='font-semibold rounded-lg bg-red-500 hover:scale-105 text-white px-2 py-2'>Remove Job</button>
                </div>

              </div>

            </div>

          ))

      }

    </div>

  )
}

export default ReqruiterAllJobs