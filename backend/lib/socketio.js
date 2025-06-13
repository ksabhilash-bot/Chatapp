import {Server} from "socket.io"
import http from "http"
import express from "express"
import dotenv from 'dotenv';
dotenv.config()

const app =express();
const server=http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:process.env.frontend,
        credentials:true
    }
})
const userSocketMap={}
export function getReceiverSocketId(receiverId){
return userSocketMap[receiverId]
}
io.on("connection",(socket)=>{
    console.log("Connected to server",socket.id)
    const userId=socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id
    io.emit("onlineuser",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
        console.log("socket disconnected",socket.id)
        io.emit("onlineuser",Object.keys(userSocketMap))
    })
})

export {io,app,server}