import express from 'express'
import rateLimit from 'express-rate-limit'
import {logout,login,signup,updateProfile,checkAuth} from '../controllers/authController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router= express.Router()

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 20, 
	standardHeaders: true, 
	legacyHeaders: false,
    message: 'Too many login or signup attempts from this IP, please try again after 15 minutes.',
});



router.post('/signup', authLimiter, signup)
router.post('/login', authLimiter, login)
router.post('/logout', logout)
router.put('/update',protectRoute,updateProfile)
router.get("/checkAuth",protectRoute,checkAuth)

export const authRoutes = router
