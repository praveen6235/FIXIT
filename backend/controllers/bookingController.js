import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {

  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.json(booking);

  } 
  
  catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const getBookings = async (req, res) => {

  try {

    const bookings = await Booking.find();

    res.json(bookings);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const getBookingsByUser = async (req, res) => {

  try {

    const bookings = await Booking.find({

      userEmail: req.params.email


    });

    res.json(bookings);

  } 
  catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const updateBookingStatus = async (req, res) => {

  try {

    const booking = await Booking.findByIdAndUpdate(

      req.params.id,

      { status: req.body.status },

      { new: true }

    );

    res.json(booking);

  } 
  
  catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const deleteBooking = async (req, res) => {

  try {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted" });

  } 
  
  catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const getBookingsByProvider = async (req,res)=>{

  try{

      const bookings = await Booking.find({
        
      providerName:req.params.name

      });

      res.json(bookings);

  }
  
  catch(error){

  res.status(500).json({message:error.message});

  }

};