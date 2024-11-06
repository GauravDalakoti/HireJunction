import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='bg-slate-900 p-6 text-white'>

            <div className='flex justify-center items-center gap-1 w-40 mx-auto'>

                <img src={assets.logo} alt="" width={45} />
                <span className='font-bold text-2xl'>HireJunction</span>

            </div>
            <div className='my-5 max-md:text-center'>copyright @2024 all right reserved</div>
            <hr />

            <div className='mt-4 flex justify-center gap-20 max-md:gap-10'>

                <section className=''>

                    <div className='font-serif my-3 text-xl'>Connect with us</div>
                    <div className='flex flex-col gap-5'>
                        <a className='flex gap-2' href="/">
                            <img src={assets.instagram} alt="" width={30} />
                            <span className='hover:text-blue-400'>instagram</span>
                        </a>
                        <a className='flex gap-2' href="/">
                            <img src={assets.facebook} alt="" width={30} />
                            <span className='hover:text-blue-400'>facebook</span>
                        </a>

                        <a className='flex gap-2' href="/">
                            <img src={assets.twitter} alt="" width={30} />
                            <span className='hover:text-blue-400'>twitter</span>
                        </a>
                        <a className='flex gap-2' href="/">
                            <img src={assets.linkedin} alt="" width={30} />
                            <span className='hover:text-blue-400'>linkedin</span>
                        </a>
                    </div>

                </section>

                <section>

                    <div className='font-serif my-3 text-xl'>Support</div>

                    <div className='flex flex-col gap-4'>

                        <a href='/'><div className='hover:text-blue-400'>FAQ</div></a>
                        <a href='/'><div className='hover:text-blue-400'>contact us</div></a>
                        <a href='/'><div className='hover:text-blue-400'>terms and service</div></a>
                        <a href='/'><div className='hover:text-blue-400'>privacy policy</div></a>
                        <a href='/'><div className='hover:text-blue-400'>cookie policy</div></a>
                    </div>


                </section>

            </div>

        </div>
    )
}

export default Footer