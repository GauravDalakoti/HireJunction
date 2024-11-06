import React, { useState, useEffect } from 'react'
import Home from '../home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../../store/job';
import FilterJobs from '../filterJobs/FilterJobs';
import { assets } from '../../assets/assets';

function Jobs() {

  const { allJobs } = useSelector(store => store.job);
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {

    (async () => {

      try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/get-all-jobs`, {

          method: "GET",
          headers: {

            "Content-Type": "application/json"
          }

        })

        if (response.ok) {

          const res = await response.json()
          console.log(res);
          dispatch(setAllJobs(res.data))
          setLoading(false)

        }

      } catch (error) {

        console.log("Error while fetching all jobs from the database", error);
      }
    })()

  }, [])

  return (

    <div>

      <Home />

      {
        loading ?
          <div className='flex justify-center p-10'>
            <img src={assets.loading} alt="" />
          </div> :

          <div className='flex gap-5'>

            {/* <div className='flex flex-col gap-4 p-6 w-[25vw] '> */}

            {/* <div>
                <div className='text-3xl font-semibold px-6 text-center'>Filter Jobs</div>
              </div> */}

            {/* <FilterJobs /> */}

            {/* </div> */}

            <div className='flex flex-col gap-4 items-center p-6 max-md:p-3'>

              <div>
                <div className='text-3xl font-semibold px-6'>Latest Jobs</div>
              </div>

              {
                (
                  allJobs.length < 1) ? <div className='flex p-14 h-[100vh]'>
                  <div className='text-3xl font-bold '>No jobs found</div>
                </div>
                  :
                  <div className='grid grid-cols-2 gap-8 px-5 max-lg:grid-cols-1'>

                    {
                      allJobs.map((curjob, index) => (

                        <div className='flex flex-col justify-center gap-2 border-2 border-gray-400 rounded-xl p-4 hover:scale-x-105 hover:bg-slate-200 ' key={index}>

                          <div className='flex justify-between items-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-2 shadow-lg py-2 px-3'>

                            <div className='flex items-center gap-4'>
                              <div>
                                <img src={curjob.companyLogo} alt="" width={40} className='max-md:w-12' />
                              </div>
                              <div>
                                <div className='text-lg font-semibold'>Company</div>
                                <div >{curjob.companyName}</div>
                              </div>

                            </div>

                            <div className='flex items-center gap-4 max-sm:gap-2'>
                              <div>
                                <div className='text-lg font-semibold'>Job Role</div>
                                <div >{curjob.jobTitle}</div>
                              </div>

                              <div>
                                <div className='text-lg font-semibold'>Last Apply Date</div>
                                <div>{curjob.lastApplyDate}</div>
                              </div>
                            </div>

                          </div>

                          <div className='flex gap-6 max-sm:flex-col'>

                            <div className='flex gap-2 items-center max-sm:gap-8'>
                              <div>
                                <div className='text-lg font-semibold'>Posts</div>
                                <div>{curjob.noOfPosts}</div>
                              </div>

                              <div>
                                <div className='text-lg font-semibold'>Job Location</div>
                                <div>{curjob.jobLocation}</div>
                              </div>
                            </div>

                            <div className='flex gap-2 items-center max-sm:gap-8'>

                              <div>
                                <div className='text-lg font-semibold'>Job Type</div>
                                <div>{curjob.jobType}</div>
                              </div>

                              <div>
                                <div className='text-lg font-semibold'>Salary</div>
                                <div >{curjob.salary}</div>
                              </div>

                            </div>

                          </div>

                          <div>

                            <div>
                              <div className='text-lg font-semibold'>job description</div>
                              <div className='text-gray-800'>{curjob.jobDescription}</div>
                            </div>

                          </div>

                          <div>

                            <div>
                              <div className='text-lg font-semibold'>Skills</div>
                              <div className='text-gray-800'>{curjob.requiredSkills}</div>
                            </div>

                          </div>

                          <div className='flex justify-between items-center max-sm:flex-col max-sm:items-start max-md:gap-4 '>

                            <div>
                              <div className='text-lg font-semibold'>Eligibility Criteria</div>
                              <div className='text-gray-800 w-60'>{curjob.eligiblityCriteria}</div>
                            </div>

                            <div>
                              <a href={`/apply-job/${curjob._id}`}><button className='font-semibold rounded-lg bg-blue-500 text-white px-2 py-2 max-sm:py-1'>Apply now</button></a>
                            </div>

                          </div>

                        </div>

                      ))

                    }

                  </div>
              }
            </div>
          </div>

      }
    </div>
  )
}

export default Jobs