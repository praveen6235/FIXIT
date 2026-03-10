import express from "express"
import {
providerLogin,
getBookingsByProvider,
updateBookingStatus
} from "../controllers/providerAuthController.js"

const router = express.Router()

router.post("/login", providerLogin)

router.get("/bookings/:name", getBookingsByProvider)

router.put("/booking/:id", updateBookingStatus)

export default router