import React from 'react'
import ReqruiterHeader from '../components/reqruiterPageHeader/ReqruiterHeader.jsx'
import SideBar from '../components/sideBar/SideBar.jsx'
import { Outlet } from 'react-router-dom'

function ReqruiterPage() {
    return (
        <div>

            <ReqruiterHeader />
            <div className='flex justify-center max-md:flex-col'>
                <SideBar />
                <div className='w-[75vw] '>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default ReqruiterPage