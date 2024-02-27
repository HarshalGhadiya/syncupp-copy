import { io } from 'socket.io-client';
const ENDPOINT: any = process.env.NEXT_SOCKET_IO;
let socket;

// const token = localStorage.getItem("accessToken");
export default socket = io(ENDPOINT);
