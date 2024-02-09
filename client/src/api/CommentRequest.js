import axios from "axios"
const API = axios.create({baseURL:"http://localhost:3000"})
// const API = axios.create({baseURL:"https://banamo-social-media-7b1g.vercel.app"})

export const createComment =(data)=> API.post(`/comments`,data)
export const getComments =(postId)=> API.get(`/comments/${postId}`)