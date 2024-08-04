import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },

});

// Object to map userId to socketId
const userSocketMap: {[key: string]: string} = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("an user connected", socket.id);

    const userId = socket.handshake.query.userId as string;

    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to establish to all clients that conenct to the server
    // established connections to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to all the events. (Could be used on both client and server side)
    socket.on("disconnect", () => {
       console.log("user disconnected", socket.id);
       delete userSocketMap[userId];
       io.emit("getOnlineUsers", Object.keys(userSocketMap)); 
    });
});