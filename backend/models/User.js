import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

        firstName:{
        type:String,
        required:true,
        match:/^[A-Za-z\s]+$/  
        },

        lastName:{
        type:String,
        required:true,
        match:/^[A-Za-z\s]+$/
        },

        contact:{
        type:String,
        required:true,
        match:/^[6789][0-9]{9}$/  
        },

        email:{
        type:String,
        required:true,
        unique:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/  
        },

        password:{
        type:String,
        required:true,
        minlength:6
        }

})

const User = mongoose.model("User",userSchema)

export default User