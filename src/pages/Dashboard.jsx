import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, Outlet } from 'react-router-dom';
import { FaBorderAll, FaHeart, FaList } from 'react-icons/fa';
import { IoIosHome, IoMdLogOut } from 'react-icons/io';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

const Dashboard = () => {
    const [filterShow, setFilterShow] = useState(false);

    return (
        <div>
            <Header />

            <div className='bg-slate-200 mt-5'>
                <div className='w-[90%] mx-auto md-lg:block hidden'>
                    <button
                        onClick={() => setFilterShow(!filterShow)}
                        className='text-center py-3 px-3 bg-green-500 text-white'
                    >
                        <FaList />
                    </button>
                </div>

                <div className='h-full mx-auto'>
                    <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
                        <div className={`rounded-md z-50 md-lg:absolute ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 bg-white`}>
                            <ul className='py-2 text-slate-600 px-4'>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><IoIosHome /></span>
                                    <Link to='/dashboard' className='block' >Dashboard </Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaBorderAll /></span>
                                    <Link to='/dashboard/my-orders' className='block' >My Orders </Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaHeart /></span>
                                    <Link to='/dashboard/my-wishlist' className='block' >Wishlist </Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><IoChatbubbleEllipsesSharp /></span>
                                    <Link to='/dashboard/chat' className='block' >Chat  </Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><RiLockPasswordLine /></span>
                                    <Link to='/dashboard/change-password' className='block' >Change Password  </Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2 cursor-pointer'>
                                    <span className='text-xl'><IoMdLogOut /></span>
                                    <div className='block' >Logout </div>
                                </li>
                            </ul>
                        </div>

                        <div className='w-[calc(100%-270px)] md-lg:w-full'>
                            <div className='mx-4 md-lg:mx-0'>
                                <Outlet />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;