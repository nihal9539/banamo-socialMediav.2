import axios from "axios"

// const API = axios.create({baseURL:"http://localhost:3000"})
const API = axios.create({baseURL:"https://social-neuk.onrender.com"})  

export const uploadPost = (data )=> API.post('/post',data)
export const getAllPost =async ()=> API.get(`/post`)
export const getUserPost = (id)=> API.get(`/post/${id}`)
export const deletePost = (postId)=> API.delete(`/post/${postId}`)
export const updatePost = (postId,userId)=> API.put(`/post/${postId}`,userId)
export const likePost = (postId,userId)=> API.put(`/post/${postId}/like`,{userId})

