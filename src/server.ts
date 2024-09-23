import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server

server = app.listen(process.env.PORT, async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`😀 Database connected at port ${process.env.PORT}`)
      } catch (error: any) {
        console.log(`😡 Failed to connect with db - ${error.message}`)
      }
})



// stop server when async errors
process.on('unhandledRejection', () => {
    console.log('😡 UNHANDLED REJECTION! Shutting down...')
    if(server){
      server.close(() => {
        process.exit(1)
      })
    }
  })
  
  
  // stop server when sync errors
  process.on('uncaughtException', () => {
    console.log('😡 UNCAUGHT EXCEPTION! Shutting down...')
      process.exit(1)
  })
  