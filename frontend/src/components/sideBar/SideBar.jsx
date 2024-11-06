import React from 'react'

function SideBar() {
    return (
        <div className='w-[18vw] h-[86vh] p-2 flex flex-col gap-2 border-r-4 max-md:flex-row max-md:w-[100vw] max-md:h-[16vh] max-md:justify-center max-sm:gap-1 max-md:gap-8'>

            <a href="/reqruiter-page/add-new-jobs" className='hover:bg-black hover:text-white p-2 rounded-xl'>
                <div className='text-xl font-semibold  '>add new jobs </div>
            </a>

            <a href="/reqruiter-page/reqruiter-all-jobs" className='hover:bg-black hover:text-white p-2 rounded-xl'>
                <div className='text-xl font-semibold  '>all jobs</div>
            </a>

            <a href="/reqruiter-page/job-applications" className='hover:bg-black hover:text-white p-2 rounded-xl'>
                <div className='text-xl font-semibold  '>job applications</div>
            </a>

        </div>
    )
}

export default SideBar