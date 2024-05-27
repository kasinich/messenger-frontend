import io from "socket.io-client"
//window.location.origin.replace("3000", "9999")
const socket = io("http://localhost:9999")

export default socket