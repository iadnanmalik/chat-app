import io from 'socket.io-client'
import { SERVER_URL } from '../server'
export const connect = (user) => {
    console.log("From Connect: ", user)
    const url = `${SERVER_URL}/?user=${user}`
    const socket = io(url)
    return socket
}

