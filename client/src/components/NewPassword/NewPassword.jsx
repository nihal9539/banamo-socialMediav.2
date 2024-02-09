
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { passwordChange } from '../../api/AuthRequest';



export default function NewPassword() {

    const location = useLocation()
    const navigate = useNavigate()
  
    const email = location.state.useremail
    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    })


    // New password
    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword) {
            
            passwordChange(email,data.password).then((res)=>{
         
                toast.success("Password change successfully")
                navigate('/auth')
            }).catch((err)=>{
                console.log(err.message);
                toast.error(err.response.data)

            })

            
        }else{
            toast.error("password must be same")
        }


        setData({
            password: "",
            confirmPassword: ""
        })

    }

    return (
        <div className=" bg-[url(./assets/images/bg-2.jpg)]  w-full h-screen bg-cover relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-transparent  rounded-md border-2 border-gray-400 backdrop-blur-md text-white md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center  uppercase">
                    New Password
                </h1>
                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} >

                    <div className="mb-2">
                        <label

                            className="block text-sm font-semibold "
                        >
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            className="block w-full px-4 py-2 mt-2   bg-transparent border-2 rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                        />
                    </div>
                    <div className="mb-2">
                        <label


                            className="block text-sm font-semibold "
                        >
                            Confirm Password
                        </label>
                        <input
                            required
                            type="password"
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            className="block w-full px-4 py-2 mt-2   bg-transparent border-2 rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                        />
                    </div>
                    <div className='font-bold flex  justify-end'>
                    </div>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  border-2 rounded-md ">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}