import axios from "axios"
// const API = axios.create({baseURL:"http://localhost:3000"})
const API = axios.create({baseURL:"https://social-neuk.onrender.com"})

export const createComment =(data)=> API.post(`/comments`,data)
export const getComments =(postId)=> API.get(`/comments/${postId}`)