import React from 'react'
import { assets } from '../../assets/assets'

function Home() {
    return (
        <div className='flex justify-center gap-2 p-4 max-md:p-2 max-lg:flex-col max-lg:items-center'>

            <div className='flex flex-col max-lg:py-6 gap-8 py-14 w-[40vw] bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient max-lg:w-[90vw]'>

                <div className='flex flex-col gap-3'>
                    <div className='text-5xl font-bold max-lg:text-6xl max-sm:text-[2.6rem]'>Apply For Jobs </div>
                    <div className='text-5xl font-bold max-lg:text-6xl max-sm:text-[2.6rem]'>And Get Hired At </div>
                    <div className='text-5xl font-bold max-lg:text-6xl max-sm:text-[2.6rem]'>Top Companies</div>
                </div>

                <div className='w-64'>
                    <a href="/latest-jobs"><button className='bg-green-600 text-white rounded-lg px-2 py-2 font-semibold text-xl hover:scale-105'>Check latest jobs</button></a>
                </div>

            </div>
            <img className='rounded-xl max-lg:w-[90vw]' src={assets.job} alt="" width={630} />

        </div>
    )
}

export default Home