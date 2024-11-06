import { assets } from '../../assets/assets'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authentication';
import { useEffect, useState } from 'react';
import { setAllJobs } from '../../store/job';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Header() {

    const suggestionsList = ['Frontend Developer', 'Backend developer', 'Software Engineer', 'Associate Software Engineer', 'Full Stack Web Developer', 'Product Manager', 'Sales Associative', 'System Engineer', 'Cloud Engineer', 'AI Engineer'];
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [displayMenu, setDisplayMenu] = useState(false)

    const handleSearchQuery = (event) => {

        const query = event.target.value;
        setSearchQuery(query);

        if (query) {

            const filteredSuggestions = suggestionsList.filter((suggestion) =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);

        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
    };

    const auth = useSelector((state) => state.auth);
    // const { userData } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userToken = localStorage.getItem("userToken")

    const [displayDropdown, setDisplayDropdown] = useState(false)

    const searchJobs = async (e) => {

        e.preventDefault()
        try {
            console.log(searchQuery);
            const response = await fetch(`http://localhost:8000/api/v1/jobs/search-jobs?query=${encodeURIComponent(searchQuery)}`)

            if (response.ok) {

                const res = await response.json()
                console.log(res)
                dispatch(setAllJobs(res.data))
                setLoading(false)
            }

        } catch (error) {

            console.log("Error while Searching the jobs", error)
        }
    }

    const handleLogout = async () => {

        try {

            const response = await fetch("http://localhost:8000/api/v1/users/logout-user", {

                method: "POST",
                credentials: "include",
                headers: {

                    "Content-Type": "application-json"
                },
            })

            if (response.ok) {

                dispatch(logout())
                localStorage.removeItem("userToken")
                toast.success("Logout Successfully")
                navigate('/')
            }

        } catch (error) {

            console.log("Error while logout the user:", error)
            toast.error("Error While Logout")
        }
    }

    const handleMenu = () => {

        setDisplayMenu(prev => prev = !prev)

    }

    return (

        <header className='sticky top-0 z-20 bg-white border-b-4'>

            <nav className='flex justify-around items-center py-2 px-2 max-lg:gap-6 max-lg:justify-between max-lg:px-8'>

                <div className='flex items-center gap-1'>
                    <img src={assets.logo} alt="" width={60} />
                    <div className='text-3xl font-semibold text-blue-800'>HireJunction</div>
                </div>

                <ul className='flex items-center gap-8 max-lg:hidden'>
                    <a href="/jobs"> <li className='text-xl font-semibold'>jobs</li></a>
                    <a href="/all-jobs"><li className='text-xl font-semibold'>All jobs</li></a>
                    <a href="/latest-jobs"><li className='text-xl font-semibold'>latest jobs</li></a>
                </ul>

                <div className='lg:hidden'>
                    <img src={assets.menu} alt="" width={28} onClick={handleMenu} />
                </div>

                {
                    displayMenu &&

                    <div className='h-[100vh] bg-slate-200 absolute right-0 top-0 w-[60vw] z-30'>

                        <div className='flex justify-end p-3'>
                            <img src={assets.close} alt="" width={30} onClick={handleMenu} />
                        </div>

                        <ul className='flex flex-col p-6 gap-8'>
                            <a href="/jobs"> <li className='text-xl font-semibold'>jobs</li></a>
                            <a href="/all-jobs"><li className='text-xl font-semibold'>All jobs</li></a>
                            <a href="/latest-jobs"><li className='text-xl font-semibold'>latest jobs</li></a>
                        </ul>

                        {
                            userToken ?
                                (
                                    <div className='flex flex-col p-8 gap-4'>
                                        <div>
                                            <button onClick={handleLogout} className='text-lg px-4 py-2 font-semibold bg-blue-500 rounded-xl hover:bg-blue-400 text-white '>Logout</button>
                                        </div>
                                        <div className='flex items-center gap-2'>

                                            <img src={assets.user} alt="" width={40} />

                                            <img onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='hover:scale-105' src={assets.downarrow} alt="" width={25} height={40} />
                                        </div>
                                        {
                                            displayDropdown &&
                                            <div onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='absolute bottom-40 bg-gray-300  border-gray-300 rounded-xl p-4'>
                                                <a href="/profile-page"><div className='font-semibold hover:bg-black py-2 px-4 rounded-lg hover:text-white'>profile</div></a>
                                                <a href="/your-jobs"><div className='font-semibold hover:bg-black py-2 px-4 rounded-lg hover:text-white'>applied jobs</div></a>
                                            </div>
                                        }
                                    </div>
                                )

                                : (
                                    <div className='flex flex-col p-6 gap-4 '>
                                        <a href="/login"><button className='text-lg px-3 py-1 font-semibold bg-blue-500 rounded-xl hover:bg-blue-400 text-white '>Login</button></a>
                                        <a href="/sign-up"><button className='text-lg px-3 py-1 font-semibold  bg-blue-500 rounded-xl hover:bg-blue-400 text-white'>Sign Up</button></a>
                                    </div>
                                )
                        }

                    </div>
                }

                <div className='flex gap-2 justify-center relative max-lg:hidden'>

                    <input className='border-2 border-gray-500 outline-none rounded-2xl px-4 py-1' type="text" value={searchQuery} placeholder='Search jobs' onChange={handleSearchQuery} />
                    <img className='absolute right-3 top-2 hover:scale-x-105' src={assets.search} alt="" width={20} onClick={searchJobs} />

                    {
                        suggestions.length > 0 && (
                            <ul className="absolute top-8 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-40 overflow-y-auto z-10">
                                {
                                    suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="p-2 cursor-pointer hover:bg-blue-100"
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                            </ul>
                        )}
                </div>

                {
                    userToken ?
                        (
                            <div className='flex items-center gap-4 max-lg:hidden'>
                                <div>
                                    <button onClick={handleLogout} className='text-lg px-4 py-2 font-semibold bg-blue-500 rounded-xl hover:bg-blue-400 text-white '>Logout</button>
                                </div>
                                <div className='flex items-center gap-2'>

                                    <img src={assets.user} alt="" width={40} />

                                    <img onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='hover:scale-105' src={assets.downarrow} alt="" width={25} height={40} />
                                </div>
                                {
                                    displayDropdown &&
                                    <div onMouseOver={() => setDisplayDropdown(true)} onMouseLeave={() => setDisplayDropdown(false)} className='absolute top-12 bg-gray-300 right-2 border-2 border-gray-300 rounded-xl p-4'>
                                        <a href="/profile-page"><div className='font-semibold hover:bg-black py-2 px-4 rounded-lg hover:text-white'>profile</div></a>
                                        <a href="/your-jobs"><div className='font-semibold hover:bg-black py-2 px-4 rounded-lg hover:text-white'>applied jobs</div></a>
                                    </div>
                                }
                            </div>
                        )

                        : (
                            <div className='flex items-center gap-4 max-lg:hidden'>
                                <a href="/login"><button className='text-lg px-4 py-2 font-semibold bg-blue-500 rounded-xl hover:bg-blue-400 text-white '>Login</button></a>
                                <a href="/sign-up"><button className='text-lg px-4 py-2 font-semibold  bg-blue-500 rounded-xl hover:bg-blue-400 text-white'>Sign Up</button></a>
                            </div>
                        )
                }
            </nav>

            <div className='flex gap-2 justify-center items-center relative lg:hidden mb-3'>
                <input className='border-2 border-gray-500 outline-none rounded-2xl px-4 py-1 max-lg:w-[500px] max-md:w-[400px] max-sm:w-[230px]' type="text" value={searchQuery} placeholder='Search jobs' onChange={handleSearchQuery} />

                <button onClick={searchJobs} className='text-lg px-2 py-1 font-semibold bg-blue-500 rounded-2xl text-white '>search</button>
                {/* <img className='absolute max-lg:right-80 top-2 hover:scale-x-105' src={assets.search} alt="" width={20} onClick={searchJobs} /> */}

                {
                    suggestions.length > 0 && (
                        <ul className="absolute top-8 max-lg:w-[600px] max-md:w-[500px] max-sm:w-[330px] mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-40 overflow-y-auto z-10">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="p-2 cursor-pointer hover:bg-blue-100"
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}

            </div>

        </header>
    )
}

export default Header