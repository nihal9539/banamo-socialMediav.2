import axios from "axios"

const API = axios.create({baseURL:"https://banamo-social-media-7b1g.vercel.app/"})  

export const uploadPost = (data )=> API.post('/post',data)
export const getAllPost =async ()=> API.get(`/post`)
export const getUserPost = (id)=> API.get(`/post/${id}`)
export const deletePost = (postId)=> API.delete(`/post/${postId}`)
export const updatePost = (postId,userId)=> API.put(`/post/${postId}`,userId)
export const likePost = (postId,userId)=> API.put(`/post/${postId}/like`,{userId})

