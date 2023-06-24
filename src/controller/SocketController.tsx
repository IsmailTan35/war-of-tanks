import React, { useContext, useEffect } from "react";
import { SocketContext } from "./Contex";

const SocketController = () => {
  const socket: any = useContext(SocketContext);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("hello", "123");
    });
  }, [socket]);
  return null;
};

export default SocketController;
