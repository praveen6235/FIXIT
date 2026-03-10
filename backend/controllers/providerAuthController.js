import Provider from "../models/Provider.js"
import Booking from "../models/Booking.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const providerLogin = async(req,res)=>{

try{

    const {email,password} = req.body

        const provider = await Provider.findOne({email})

        if(!provider){

            return res.status(400).json({message:"Provider not found"})

        }

        const match = await bcrypt.compare(password,provider.password)

        if(!match){

            return res.status(400).json({message:"Invalid password"})
            
        }

        const token = jwt.sign(
        { id:provider._id, role:"provider"},
        "secretkey",
        {expiresIn:"1d"}
        )

        res.json({

            message:"Provider login successful",
            
            token,

            provider
        })

    }
    catch(error){

    res.status(500).json({error:error.message})

    }

}

export const getBookingsByProvider = async(req,res)=>{

    try{

        const bookings = await Booking.find({

        providerName:req.params.name

        })

        res.json(bookings)

    }
    
    catch(error){

    res.status(500).json({error:error.message})

    }

}


export const updateBookingStatus = async(req,res)=>{

    try{

        const booking = await Booking.findByIdAndUpdate(

        req.params.id,

        {status:req.body.status},

        {new:true}

        )

        res.json(booking)

    }
    
    catch(error){

    res.status(500).json({error:error.message})

    }

}