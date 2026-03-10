import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {

    try{

        const { firstName, lastName, email, contact, password } = req.body

        const nameRegex = /^[A-Za-z\s]+$/
        const phoneRegex = /^[6789][0-9]{9}$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!firstName || !lastName || !email || !contact || !password){
        return res.status(400).json({message:"All fields are required"})
        }

        if(!nameRegex.test(firstName) || !nameRegex.test(lastName)){
        return res.status(400).json({message:"Name must contain only letters"})
        }

        if(!emailRegex.test(email)){
        return res.status(400).json({message:"Invalid email format"})
        }

        if(!phoneRegex.test(contact)){
        return res.status(400).json({message:"Mobile must start with 6,7,8,9 and contain 10 digits"})
        }


        if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters"})
        }


        const existingUser = await User.findOne({ email })

        if(existingUser){
        return res.status(400).json({message:"Email already registered"})
        }


        const hashedPassword = await bcrypt.hash(password,10)


        const user = new User({
        firstName,
        lastName,
        email,
        contact,
        password: hashedPassword
        })

        await user.save()


        res.json({
        message:"User Registered Successfully"
        })

    }
    catch(error){

        res.status(500).json({
        error:error.message

    })

    }

}


export const loginUser = async (req, res) => {

    try{

        const { email, password } = req.body

        if(!email || !password){
        return res.status(400).json({message:"Email and Password are required"})
        }

        const user = await User.findOne({ email })

        if(!user){
        return res.status(400).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
        return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign(
        {
        id:user._id,
        role:"user"
        },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn:"1d" }
        )

        const userData = {
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        contact:user.contact
        }


        res.json({
        message:"Login Successful",
        token,
        user:userData
        })

    }
    catch(error){

        res.status(500).json({
        error:error.message
        })

    }

}