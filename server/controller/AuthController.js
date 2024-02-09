import bcypt from "bcrypt"
import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";
import nodemailer from "nodemailer"


// Register New User
export const registerUser = async (req, res) => {
    const { username } = req.body;
    const oldUser = await UserModel.findOne({ username })
    if (oldUser) {
        res.status(400).json("User Already registered")
    } else {

        const salt = await bcypt.genSalt(10)
        const hashPassword = await bcypt.hash(req.body.password, salt)
        req.body.password = hashPassword
        const newUser = new UserModel(req.body)
        try {
            const user = await newUser.save()
            const token = jwt.sign({
                username: user.username,

                id: user._id

            }, process.env.JWT_SECRET, { expiresIn: '2' })
            res.status(200).json({ user, token })

        } catch (error) {
            res.status(500).json({ message: error.message })
            console.log(error);
        }
    }

}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: username })
        if (user) {
            const validity = await bcypt.compare(password, user.password)
            if (!validity) {

                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id

                }, process.env.JWT_SECRET, { expiresIn: '2' })
                res.status(200).json({ user, token })
            }
        } else {
            res.status(404).json('User Not found')

        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
      

            res.status(400).json("user Not found")


        } else {
         var useremail = user.email
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: useremail,
                    pass: "zrpzswhhgabfwkug"
                }
            });
            var otp = Math.floor(1000 + Math.random() * 9000);
            var mailOptions = {
                from: 'nihal@gmail.com',
                to: `mohammednihal691@gmail.com`,
                subject: 'Reset your Password',
                text: `you resert password code is ${otp} `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json({otp,useremail})
                }
            });


        }

    } catch (error) {
        res.status(500).json(error)

    }


}


export const passwordChange = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email })
    if (user) {
        const salt = await bcypt.genSalt(10)
        const hashPassword = await bcypt.hash(req.body.password, salt)
        try {
            await user.updateOne({ $set: {password:hashPassword} })
            res.status(200).json("success")

        } catch (error) {
            res.status(500).json({ message: error.message })
            console.log(error);
        }
    } else {
        res.status(400).json("User Not found")


    }
}