
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { forgotPassword, login, signup } from '../../api/AuthRequest';
import { toast } from 'react-toastify';



export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [data, setdata] = useState({
        otp: "",
        useremail: ""
    })
    const [Otp, setOtp] = useState("")


    // Forgot password
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.otp) {
            forgotPassword(email).then((res) => {

                setdata({
                    otp: res.data.otp,
                    useremail: res.data.useremail,
                })
                setEmail("")
            }).catch((err) => {
                console.log(err.message);
            })

        } else {
            if (Otp == data.otp) {
                navigate(`/new-password`, { state: { useremail: data.useremail } })


            } else {
                toast.error("Wrong Otp")
            }

        }


    }

    return (
        <div className=" bg-[url(./assets/images/bg-2.jpg)]  w-full h-screen bg-cover relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-transparent  rounded-md border-2 border-gray-400 backdrop-blur-md text-white md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center  uppercase">
                    {data.otp ? "Enter OTP" : "Forgott password"}
                </h1>
                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} >
                    {data.otp ? <div className="mb-2">
                        <label

                            className="block text-sm font-semibold "
                        >
                            OTP
                        </label>
                        <input
                            required
                            type="text"
                            value={Otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full px-4 py-2 mt-2   bg-transparent border rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                        />
                    </div> :
                        <div className="mb-2">
                            <label

                                className="block text-sm font-semibold "
                            >
                                Email
                            </label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2   bg-transparent border rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                            />
                        </div>
                    }

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  border rounded-md ">
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}