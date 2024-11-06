import React from 'react'
import { assets } from '../../assets/assets'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/authentication'
import toast from 'react-hot-toast'

function ReqruiterHeader() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/reqruiters/logout-reqruiter`, {

                method: "POST",
                credentials: "include",
                headers: {

                    "Content-Type": "application-json",
                     'Authorization': `Bearer ${localStorage.getItem("reqruiterToken")}`
                },
            })

            if (response.ok) {

                dispatch(logout())
                localStorage.removeItem("reqruiterToken")
                toast.success("Logout Successfully")
                navigate("/")
            }

        } catch (error) {

            toast.error("Error while Logout")
            console.log("Error while logout the reqruiter:", error)
        }
    }

    return (
        <header className='sticky top-0 z-20 bg-white border-b-4'>
            <nav className='flex justify-between items-center py-2 px-10 max-md:px-4'>

                <div className='flex items-center gap-1'>
                    <img src={assets.logo} alt="" width={60} />
                    <div className='text-3xl font-semibold text-blue-800 '>HireJunction</div>
                </div>

                <div>
                    <button onClick={handleLogout} className='text-lg px-4 py-2 max-md:px-2 max-md:py-1 font-semibold bg-blue-500 rounded-xl hover:bg-blue-400 text-white '>Logout</button>
                </div>

            </nav>


        </header>
    )
}

export default ReqruiterHeader