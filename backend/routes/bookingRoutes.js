import express from "express";
import { 
  createBooking, 
  getBookings, 
  deleteBooking, 
  getBookingsByUser,
  updateBookingStatus,
  getBookingsByProvider
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/", getBookings);

router.get("/user/:email", getBookingsByUser);

router.get("/provider/:name", getBookingsByProvider);

router.put("/:id", updateBookingStatus);

router.delete("/:id", deleteBooking);

export default router;