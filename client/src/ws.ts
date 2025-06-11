import socketIOClient from "socket.io-client";

export const WS = "http://localhost:8181";
// export const WS = "https://ws.iceweb.in";
export const ws = socketIOClient(WS);
