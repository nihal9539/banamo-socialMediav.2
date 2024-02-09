import axios from "axios"

// const API = axios.create({baseURL:"http://localhost:3000"})
const API = axios.create({baseURL:"https://social-neuk.onrender.com"})

export const login = (formData )=> API.post('/auth/login',formData)
export const signup = (formData )=> API.post('/auth/register',formData)
export const forgotPassword = (email )=> API.post(`/auth/forgotpassword/`,{email})
export const passwordChange = (email ,password)=> API.post(`/auth/passwordChange/`,{email,password})