import React, { useEffect, useState } from 'react'
import { getUserPost } from '../../api/PostRequest'
import Posts from '../Posts/Posts'

const UserPosts = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const [post,setPost] =useState([])
    useEffect(()=>{
      getUserPost(user.user._id).then((res)=>{
            setPost(res.data)
        }).catch((err)=>{
            console.log(err);
        })

    },[])

  return (
    <div className=' px-14 p-4 gap-6 sm:ml-64 h-screen overflow-scroll flex flex-col' >
    {post.length == 0 ?"": post.map((data,index)=>{
      return(
          <Posts key={index} data={data} options={true}/>
      )
    })}
  </div>
  )
}

export default UserPosts
