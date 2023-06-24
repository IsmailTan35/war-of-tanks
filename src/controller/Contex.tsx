import React from "react";
import { io } from "socket.io-client";
const hostname: any = window.location.hostname;
const parsed: any = window.location.hostname.split(".");
const protocol: any = window.location.protocol;
export const url: any = parsed.includes("vercel")
  ? process.env.REACT_APP_URL_PRODUCTION
  : `${protocol}//${hostname}:11000`;

export const client = io(
  url.replace("http://", "").replace("https://", "").replace("/", ""),
  {
    reconnection: true,
    reconnectionDelay: 2500,
    reconnectionAttempts: 10,
    forceNew: true,
  }
);
export const SocketContext: any = React.createContext(null);
