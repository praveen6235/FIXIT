import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({

    userName:{
    type:String,
    required:true
    },

    userEmail:{
    type:String,
    required:true
    },

    userPhone:{
    type:String,
    required:true
    },

    address:{
    type:String,
    required:true
    },

    providerName:{
    type:String,
    required:true
    },

    providerPhone:{
    type:String,
    required:true
    },

    service:{
    type:String,
    required:true
    },

    date:{
    type:String,
    required:true
    },

    time:{
    type:String,
    required:true
    },

    status:{
    type:String,
    default:"Pending"
    }

})

export default mongoose.model("Booking", bookingSchema)