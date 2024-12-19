import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const register = (e) => {
        e.preventDefault();
        console.log(state);

        setLoading(true);

        setTimeout(() => {
            console.log(state);
            setLoading(false);
            navigate('/home');
        }, 2000);
    }

    return (
        <div>
            <Header />

            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-10 sm:p-6'>
                    <div className='grid grid-cols-2 md:grid-cols-1 w-[60%] md:w-[100%] lg:w-[100%] mx-auto bg-white rounded-md'>
                        <div className='px-8 py-8'>
                            <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Register</h2>

                            <div>
                                <form onSubmit={register} className='text-slate-600'>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            className='w-full px-3 py-2 border border-slate-200 outline-none 
                                            focus:border-green-500 rounded-md'
                                            type='text' name='name' id='name' placeholder='Name' required
                                            onChange={inputHandle} value={state.name}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor='email'>Email</label>
                                        <input
                                            className='w-full px-3 py-2 border border-slate-200 outline-none 
                                            focus:border-green-500 rounded-md'
                                            type='email' name='email' id='email' placeholder='Email' required
                                            onChange={inputHandle} value={state.email}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor='password'>Password</label>
                                        <input
                                            className='w-full px-3 py-2 border border-slate-200 outline-none 
                                            focus:border-green-500 rounded-md'
                                            type='password' name='password' id='password' placeholder='Password' required
                                            onChange={inputHandle} value={state.password}
                                        />
                                    </div>

                                    <button
                                        className='px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 
                                        text-white rounded-md flex items-center justify-center h-10 active:scale-90
                                        transition-all duration-300'
                                    >
                                        {loading ? (
                                            <ClipLoader color="#ffffff" size={20} />
                                        ) : (
                                            'Register'
                                        )}
                                    </button>
                                </form>

                                <div className='flex justify-center items-center py-2'>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    <span className='px-3 text-slate-600'>Or</span>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                </div>

                                <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/50 hover:scale-90
                                transition-all duration-300 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaFacebookF /></span>
                                    <span>Login With Facebook</span>
                                </button>

                                <button className='px-8 w-full py-2 bg-red-500 shadow hover:shadow-red-500/50 hover:scale-90
                                transition-all duration-300 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaGoogle /></span>
                                    <span>Login With Facebook</span>
                                </button>
                            </div>

                            <div className='text-center text-slate-600 pt-1'>
                                <p>You Have No Account? <Link className='text-blue-500' to='/login'>Login</Link></p>
                            </div>
                        </div>

                        <div className='w-full h-full md:hidden py-4 pr-4'>
                            <img className='w-full h-full' src="http://localhost:3000/images/login.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Register;