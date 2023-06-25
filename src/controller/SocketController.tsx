import React, { useContext, useEffect } from "react";
import { SocketContext } from "./Contex";

const SocketController = () => {
  const socket: any = useContext(SocketContext);
  useEffect(() => {
    socket.on("connect", () => {
      console.log(23157665);
      socket.emit("hello", "123");
    });
  }, [socket]);
  return null;
};

export default SocketController;
