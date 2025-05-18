import React from "react";
import socketio from "socket.io-client";
import { BASE_URL } from "../../../../actions/URLs";

export const socket = socketio.connect(BASE_URL);
export const SocketContext = React.createContext();