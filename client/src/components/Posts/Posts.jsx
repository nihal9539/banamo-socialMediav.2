import React, { useEffect, useState } from 'react'
import like from "../../assets/images/like.png"
import liked from "../../assets/images/liked.png"
import { FaRegComment } from 'react-icons/fa6'
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa6";


import { BiCommentDetail } from "react-icons/bi";
import { LuSend } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { createComment } from '../../api/CommentRequest';
import Comment from '../Comment/Comment';
import { SlOptionsVertical } from "react-icons/sl";
import Option from '../Option/Option';
import { likePost } from '../../api/PostRequest';





const Posts = ({ data, options }) => {
    const [liking, setLiking] = useState(false)
    const [accordian, setAccordian] = useState(false)
    const [likes, setlikes] = useState([]);

    const [comment, setcomment] = useState("")
    const [optionOpen, setOptionOpen] = useState("")

    const user = JSON.parse(localStorage.getItem('user'))

    const handleCommentOpen = () => {
        setAccordian(!accordian)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const commentss = {
            userId: user.user._id,
            postId: data._id,
            comment: comment
        }
        createComment(commentss).then((res) => {
            console.log(res)
            setcomment("")
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleLike =()=>{
        likePost(data._id,user.user._id).then((res)=>{

            setlikes(res.data.like)
        }).catch((err)=>{
            console.log(err);
        })

    }


   
   

    return (
        <div style={{ background: "#161618" }} className='w-11/12 p-6 self-center rounded-lg flex flex-col gap-4 justify-center bg-transparent backdrop-blur-lg text-white '>
            <img src={data.image} className='h-96 rounded-md border' width={"100%"} alt="" />
            <div className='flex flex-col gap-1'>

                <div className='flex flex-col  items-start gap-1'>
                    <div className=' flex flex-row w-full pl-1 justify-between'>
                        <div className='flex flex-row gap-4'>
                            <div onClick={handleLike}> {likes.includes(user.user._id) ? <FcLike size={28} /> : <FaRegHeart size={28} />} </div>
                            <BiCommentDetail onClick={handleCommentOpen} size={28} />
                            <LuSend size={28} />
                        </div>
                        <div>
                            {
                                options ?
                                    <div>
                                        <SlOptionsVertical size={20} className='relative' onClick={(e) => setOptionOpen(prev => !prev)} />
                                        {
                                            optionOpen
                                                ?
                                                <Option post={data} userId={user.user._id} />
                                                : ""}
                                    </div> : ""}

                        </div>
                    </div>
                    <p className='text-xs'>{likes.length} Likes</p></div>
                <span>{data?.description}</span>

                <form className='w-full flex flex-row px-4' onSubmit={handleSubmit}>
                    <input value={comment} onChange={(e) => setcomment(e.target.value)} type="text" className='w-full border-none bg-transparent p-1 outline-none text-gray-200' placeholder='Add a comment..' />
                    <button type='submit'><IoMdSend size={25} /></button>
                </form>
                {
                    accordian ?
                        <Comment postId={data._id} />
                        :
                        ""
                }

            </div>
        </div>
    )
}

export default Posts
