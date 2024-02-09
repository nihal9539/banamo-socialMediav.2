import React, { useState } from 'react'
import { deletePost } from '../../api/PostRequest';
import EditPostModel from '../EditPostModel/EditPostModel';

const Option = ({post}) => {

    
   const [EditModelOen,setEditModelOpen] = useState(false)

    const handleDelete = ()=>{
        deletePost(post._id).then((res)=>{
         
            window.location.reload()
        }).catch((err)=>{
            console.log(err);
        })
        
    }
    const handleEdit = ()=>{
        setEditModelOpen(!EditModelOen)

    }
  return (
    <div className='absolute bg-white text-white rounded    w-24 right-7 mt-2 p-2'>
    <ul className='space-y-2 flex flex-col items-center'>
        <li>
            <button className='bg-blue-600 rounded-md p-2 ' onClick={handleEdit}>Update</button>
        </li>
        <hr className='bg-gray-400 w-full h-0.5 '/>
        <li>
        <button className='bg-red-600 rounded-md p-2 ' onClick={handleDelete}>Delete</button>

        </li>
       
    </ul>
    <EditPostModel modelOpne={EditModelOen} setModelOpen={setEditModelOpen} data={post} />
</div>
  )
}

export default Option
