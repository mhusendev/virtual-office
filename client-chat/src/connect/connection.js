import { io } from "socket.io-client";


export function socket() {
    return io.connect(process.env.SOCKET_HOST)
}