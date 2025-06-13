import { protectRoute } from "../middleware/protectRoute.js"
import express from "express"
import { getUserForSidebar,getMessages,sendMessage } from "../controllers/messageController.js"

const router = express.Router()

router.get("/user",protectRoute,getUserForSidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)

export const messageRouter = router