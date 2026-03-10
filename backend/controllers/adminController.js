import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const adminLogin = async (req,res)=>{

    try{

    const {email,password} = req.body

    const admin = await Admin.findOne({email})

    if(!admin){

        return res.status(400).json({message:"Admin not found"})

    }

    const match = await bcrypt.compare(password,admin.password)

    if(!match){

        return res.status(400).json({message:"Invalid password"})

    }

    const token = jwt.sign(

        { id:admin._id },

        "secretkey",

        {expiresIn:"1d"}

    )

    res.json({

        message:"Admin Login Successful",

        token
        
    })

    }
    catch(error){

    res.status(500).json({error:error.message})

    }

}