import express from 'express'
import cors from "cors"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { authRoutes } from './routes/authRoute.js';
import { messageRouter } from './routes/messageRoute.js';
import { connectDB } from './lib/db.js';
import {app,server,io} from './lib/socketio.js'
import path from "path"
dotenv.config();
const PORT = process.env.PORT || 3000
const __dirname=path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND,
    credentials: true
}))

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRouter)

if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}
connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`server running at http://localhost:${PORT}`)
    })
})
