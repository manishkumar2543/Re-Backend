import {Server} from "socket.io";

let io;

export function initSocket(httpServer){
   io= new Server(httpServer,{
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
   })
   console.log("Socket.io server is runging");
   io.on("connection",(socket)=>{
     console.log('A user connected:'+ socket.id);
   })
}

export function getSocket(){
  if(!io){
    throw new Error("Socket is not initialized")
  }
  return io
}