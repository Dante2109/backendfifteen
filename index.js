const express=require("express")
const cors=require("cors");
const { connection } = require("./Configs/db");
const { Boardrouter } = require("./Routes/Boardroutes");
const { userRouter } = require("./Routes/userRouter");
require("dotenv").config();


const server=express()
server.use(cors())
server.use(express.json());
server.use("/users",userRouter)
server.use("/boards",Boardrouter)

server.listen(3000,async()=>{
    try {
        await connection
        console.log("Database has been connected")
    } catch (error) {
        console.log(error)
    }
    console.log("Server has been connected")
})