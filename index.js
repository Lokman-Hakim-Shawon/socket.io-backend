const express = require('express')
const {Server} =require('socket.io')
const http=require("http")
const app=express()
const  server=http.createServer(app)
const PORT = process.env.PORT || 5001

const io=new Server(server,{
  cors:{
    origin:'*',
    methods:["GET","POST"]
  }
})

io.on('connection',(socket)=>{
  console.log(socket.id ," id is connected")

  socket.on('chat',(msg)=>{
    console.log('message : ',msg)

    socket.broadcast.emit('chat',msg)
  })

  socket.on('disconnect',()=>{
    console.log('user disconnect',socket.id)
  })

})

server.listen(PORT,()=>{
  console.log(`server is running at port http://localhost:${PORT}`)
})