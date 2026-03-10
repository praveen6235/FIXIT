import express from "express"
import {
addProvider,
getProviders,
deleteProvider,
updateProvider,
getProviderProfile,
updateProviderProfile,
providerLogin,
changeProviderPassword
} from "../controllers/providerController.js"

import { protect } from "../middleware/authMiddleware.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.post("/login", providerLogin)

router.get("/", getProviders)

router.post("/add", protect, upload.single("image"), addProvider)

router.put("/change-password/:id", changeProviderPassword)

router.get("/profile/:id", getProviderProfile)

router.put("/profile/:id", updateProviderProfile)

router.put("/:id", protect, upload.single("image"), updateProvider)

router.delete("/:id", protect, deleteProvider)

export default router