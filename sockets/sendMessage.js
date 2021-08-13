const sendMessage=(socket, message)=> socket.emit("sendMssage",message)

export default sendMessage