import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setAllJobs } from '../../store/job';

const arr = []
function FilterJobs() {

    const [checkedItems, setCheckedItems] = useState({

        frontEndDeveloper: false,
        backendEndDeveloper: false,
        fullStackWebDeveloper: false,
        softwareEngineer: false,
        associateSoftwareEngineer: false,
    })

    const { allJobs } = useSelector((state) => state.job)

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { id, checked } = event.target;
        setCheckedItems((prevItems) => ({ ...prevItems, [id]: checked }));

        if (checked == true) {

            arr.push(event.target.value)
        }
        // arr.push({ value: event.target.value, isChecked: event.target.checked })
        // console.log(arr);
        // const jobs = curjob.filter((curjob) =>
        // (
        //     arr.map((job) => (

        //         job.value === curjob.jobTitle && job.isChecked == true
        //     ))
        // )
        // )
        // console.log(jobs);

        // dispatch(setAllJobs(jobs))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(arr);

        const allJobs = allJobs.filter((curjob) =>
        (
            arr.map((job) => (

                curjob.jobTitle === job.value && job.isChecked == true
            ))

        )
        )
        console.log("jobs:", allJobs)

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/filter-jobs`, {

                method: "POST",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ arr })

            })

            if (response.ok) {

                const res = await response.json()
                console.log(res);
                dispatch(setAllJobs(res.data))
                arr.length = 0
            }

        } catch (error) {

            console.log("Error while fetching all jobs from the database", error);
        }
        // dispatch(setAllJobs(allJobs))
    }

    return (
        <div className='flex flex-col gap-4 justify-center h-[100vh] overflow-y-scroll p-4 w-[25vw] border-2 rounded-xl border-gray-400'>

            <section className='flex flex-col gap-3 '>

                <div>
                    <span className='text-xl mb-4 font-bold'>Job Title</span>
                </div>

                <div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg font-semibold' htmlFor="frontEndDeveloper">Frontend Developer</label>
                        <input className='w-8' type="checkbox" checked={checkedItems.frontEndDeveloper} name="" id="frontEndDeveloper" value="Frontend Developer" onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="backendEndDeveloper">Backend Developer</label>
                        <input className='w-8' type="checkbox" checked={checkedItems.backendEndDeveloper} name="" id="backendEndDeveloper" value="Backend Developer" onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="fullStackWebDeveloper">Full Stack Web Developer</label>
                        <input className='w-8' type="checkbox" checked={checkedItems.fullStackWebDeveloper} name="" id="fullStackWebDeveloper" value="full stack web developer" onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="softwareEngineer">Software Engineer</label>
                        <input className='w-8' type="checkbox" checked={checkedItems.softwareEngineer} name="" id="softwareEngineer" value="Software Engineer" onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="productManager">Associate Software Engineer</label>
                        <input className='w-8' type="checkbox" checked={checkedItems.associateSoftwareEngineer} name="" id="associateSoftwareEngineer" value="Associate Software Engineer" onChange={handleChange} />
                    </div>

                    <div>
                        <button onClick={handleSubmit}>submit</button>
                    </div>

                </div>

            </section>

            <section className='flex flex-col gap-3'>

                <div>
                    <span className='text-xl mb-4 font-bold'>Salary</span>
                </div>

                <div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="threeToFive">3-5 lpa</label>
                        <input className='w-8' type="checkbox" value='3-5' name="" id="threeToFive" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="fiveToTen">10 lpa</label>
                        <input className='w-8' type="checkbox" value='5-10' name="" id="fiveToTen" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="tenToEighteen">10-18 lpa</label>
                        <input className='w-8' type="checkbox" value='10-18' name="" id="tenToEighteen" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="eighteenToTwentyFive">18-25</label>
                        <input className='w-8' type="checkbox" value='18-25' name="" id="eighteenToTwentyFive" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="aboveTwentyFive">above 25 lpa</label>
                        <input className='w-8' type="checkbox" value='25+' name="" id="aboveTwentyFive" />
                    </div>
                </div>

            </section>

            <section className='flex flex-col gap-3'>

                <div>
                    <span className='text-xl mb-4 font-bold'>Job Location</span>
                </div>

                <div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="noida">Noida</label>
                        <input className='w-8' type="checkbox" value='noida' name="" id="delhi" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="chennia">Channia</label>
                        <input className='w-8' type="checkbox" value='chennia' name="" id="chennia" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="banglore">Banglore</label>
                        <input className='w-8' type="checkbox" value='banglore' name="" id="banglore" />
                    </div>
                    <div className='flex gap-2 items-center '>
                        <label className='text-lg  font-semibold' htmlFor="mumbai">Mumbai</label>
                        <input className='w-8' type="checkbox" value='mumbai' name="" id="mumbai" />
                    </div>
                </div>

            </section>
        </div>
    )
}

export default FilterJobs