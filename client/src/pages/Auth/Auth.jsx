
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, signup } from '../../api/AuthRequest';
import { toast } from 'react-toastify';



export default function Auth() {
    const navigate = useNavigate()
    const [signupform,setSignupForm] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        username:""
    })

  
    // Forgot password
    
    const handleForgotPassword = ()=>{
        navigate('/reset-password')
      
    }
    const handleformchange = ()=>{
      setSignupForm(!signupform)
      setData({
        email: "",
        password: "",
        username:""
      })
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
         if (signupform) {
            signup(data).then((res)=>{
         
                localStorage.setItem('user',JSON.stringify(res.data))
                window.location.replace('/')
                
            }).catch((err)=>{
                console.log(err);
                toast.error(err.response.data)
            })
        }else{
            login(data).then((res)=>{
                localStorage.setItem('user',JSON.stringify(res.data))
                window.location.replace('/')

            }).catch((err)=>{
                console.log(err);
                toast.error(err.response.data)
            })
         }
    }
   
    return (
        <div className=" bg-[url(./assets/images/bg-2.jpg)]  w-full h-screen bg-cover relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-8 m-auto bg-transparent  rounded-md border-2 border-gray-400 backdrop-blur-md text-white md:max-w-xl">
                <h1 className="text-3xl font-semibold text-center  uppercase">
                    {signupform ? "Sign Up" : "Log In"}
                </h1>
                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} >
                    <div className="mb-2">
                        <label

                            className="block text-sm font-semibold "
                        >
                            Username
                        </label>
                        <input
                        required
                            type="text"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            className="block w-full px-4 py-2 mt-2   bg-transparent border rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                        />
                    </div>
                   {signupform ?  <div className="mb-2">
                        <label

                            className="block text-sm font-semibold "
                        >
                            Email
                        </label>
                        <input
                        required
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="block w-full px-4 py-2 mt-2   bg-transparent border rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                        />
                    </div> : ""}
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
                            className="block w-full px-4 py-2 mt-2   bg-transparent border rounded-md focus:border-gray-600 focus:ring-white text-white focus:outline-none focus:ring focus:ring-opacity-10"
                        />
                    </div>
                   <div className='font-bold flex  justify-end'>
                   {signupform ? "": <span className='' onClick={handleForgotPassword}>Forgot Password?</span> }
                   </div>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  border rounded-md ">
                            {signupform ? "Sign Up": "Log in" }
                        </button>
                    </div>
                </form>



                

                    <div onClick={handleformchange} className="mt-8 text-base font-normal text-white text-center ">
                       {signupform ? "Don't have an account?" : "Already have an account?" } 
                        <a  href="#"
                            className="font-medium  hover:underline" > {signupform ? "Log In" :"Sign Up" }</a>
                    </div>
            </div>
        </div>
    );
}