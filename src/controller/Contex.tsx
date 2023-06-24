"use strict";
import React from "react";
import { io } from "socket.io-client";

const server = "https://64.226.68.146:11000";
export const url: any = () => {
  if (typeof window === "undefined") return "";
  const hostname: any = window.location.hostname;
  const parsed: any = window.location.hostname.split(".");
  const protocol: any = window.location.protocol;
  return parsed.includes("vercel") ? server : `${protocol}//${hostname}:11000`;
};
export const client = io(
  url().replace("http://", "").replace("https://", "").replace("/", ""),
  {
    reconnection: true,
    reconnectionDelay: 2500,
    reconnectionAttempts: 10,
    forceNew: true,
  }
);
export const SocketContext: any = React.createContext(null);
