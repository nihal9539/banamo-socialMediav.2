import express from "express";
import { forgotPassword, loginUser, registerUser ,passwordChange} from "../controller/AuthController.js";

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/forgotpassword',forgotPassword)
router.post('/passwordChange',passwordChange)




export default router