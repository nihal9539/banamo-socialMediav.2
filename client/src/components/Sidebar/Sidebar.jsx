import React, { useState } from 'react'
import { TbLogout2 } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { MdInfoOutline, MdLibraryAdd } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';

import { IoHomeOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { toast } from 'react-toastify';
import NewPostModel from '../PostModel/NewPostModel';
import { FaUserCircle } from "react-icons/fa";



const Sidebar = () => {
    const navigate = useNavigate()
    const [sideBar, setSideBar] = useState(false)
    const [fullWidth, setfullWidth] = useState(false)

    const [newpostModuleOpen,setNewPostModeuleOpen] = useState(false)

    const handleLogout = () => {
       localStorage.clear()
       location.reload(); 
    }
    function handleside() {
        setSideBar(!sideBar);
    }

    const HandleAddPost = ()=>{
        console.log("hiii");

        setNewPostModeuleOpen(!newpostModuleOpen)
    }
    const HandleAddPostTwo = ()=>{
       
        setfullWidth(true)
        console.log("hiii");
        setNewPostModeuleOpen(!newpostModuleOpen)
    }

    // function for navigate to home
    const handleHome = ()=>{
        navigate('/')
        setSideBar(!sideBar)
    }


    
    return (
        <div className=' p-5'>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden   focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg onClick={handleside} className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            {sideBar ? (<div className="w-full ">
                <div className="h-full px-3 py-4 overflow-y-auto   ">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Task Managment System</span>
                    </a>
                    <ul className="space-y-6 font-medium">
                        <li>
                            <div onClick={handleHome} className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
                                <IoHomeOutline size={30} />
                                <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                            </div>
                        </li>
                        <li>
                                <div onClick={() => navigate('/user')}  className="flex items-center p-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                    <FaUserCircle size={30} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                                </div>
                            </li>
                        <li>
                                <div onClick={HandleAddPostTwo}  className="flex items-center p-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                    <MdLibraryAdd size={30} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">New Post</span>
                                </div>
                            </li>
                        <li>
                            <div onClick={handleLogout} className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group">
                                <TbLogout2 size={30} />
                                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </div>
                        </li>


                    </ul>
                </div>
            </div>) :
                <aside id="logo-sidebar" style={{background:"#161618"}} className="fixed  top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-8  overflow-y-auto  ">
                        <div className="flex items-center ps-2.5 mb-5">
                            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Social Media</span>
                        </div>
                        <ul className="space-y-6 font-medium">
                            <li>
                                <div onClick={() => navigate('/')} className="flex items-center p-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                    <IoHomeOutline size={30} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={() => navigate('/user')}  className="flex items-center p-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                    <FaUserCircle size={30} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                                </div>
                            </li>
                            <li>
                                <div onClick={HandleAddPost}  className="flex items-center p-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                    <MdLibraryAdd size={30} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">New Post</span>
                                </div>
                            </li>

                            <li>
                                <div onClick={handleLogout} className="flex items-center p-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                    <TbLogout2 size={30} />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                                </div>
                            </li>


                        </ul>
                    </div>
                </aside>
            }
            <NewPostModel modelOpne={newpostModuleOpen} setModelOpen={setNewPostModeuleOpen} width={fullWidth}/>
        </div>
    )
}

export default Sidebar
