import mongoose from "mongoose"

const providerSchema = new mongoose.Schema({

        name:{
        type:String,
        required:true
        },

        email:{
        type:String,
        required:true
        },

        contact:{
        type:String,
        required:true
        },

        service:{
        type:String,
        required:true
        },

        price:{
        type:Number,
        required:true
        },

        password:{
        type:String,
        required:true
        },

        image:{
        type:String
        }

})

export default mongoose.model("Provider",providerSchema)