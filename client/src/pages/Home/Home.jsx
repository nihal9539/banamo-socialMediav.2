import React, { useEffect, useState } from 'react'
import { getAllPost } from '../../api/PostRequest'
import Posts from '../../components/Posts/Posts'

const Home = () => {
    const [post,setPost] =useState([])
    useEffect(()=>{
       const getalldatas = ()=>{
        getAllPost().then((res)=>{
          setPost(res.data)
 
      }).catch((err)=>{
          console.log(err);
      })
       }

       getalldatas()

    },[])
  return (
    <div className=' px-14 p-4 gap-6 sm:ml-64 h-screen overflow-scroll flex flex-col' >
      {post.map((data,index)=>{
        return(
            <Posts key={index} data={data}/>
        )
      })}
    </div>
  )
}

export default Home
