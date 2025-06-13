import { protectRoute } from "../middleware/protectRoute.js"
import express from "express"
import { getUserForSidebar,getMessages,sendMessage } from "../controllers/messageController.js"

const router = express.Router()

router.get("/user",protectRoute,getUserForSidebar)
router.post("/send/:id",protectRoute,sendMessage)
router.get("/:id",protectRoute,getMessages)


export const messageRouter = router