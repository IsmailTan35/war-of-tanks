import { SocketContext } from "@/controller/Contex";
import React, { useContext, useEffect, useState } from "react";

const PingCounter = () => {
  const socket: any = useContext(SocketContext);
  const [ping, setPing] = useState(0);
  useEffect(() => {
    if (!socket) return;
    let pingInterval: any;
    socket.emit("startPing");
    socket.on("ping", (startTime: any) => {
      const endTime = new Date().getTime();
      const pingTime = endTime - startTime;
      socket.emit("pong", startTime);
      setPing(pingTime);
    });

    socket.on("pingResult", (pingTime: any) => {
      setPing(pingTime);
    });

    socket.on("disconnect", () => {
      clearInterval(pingInterval);
    });
    return () => {
      socket.off("ping");
      socket.off("pingResult");
      socket.off("disconnect");
      if (!pingInterval) return;
      clearInterval(pingInterval);
    };
  }, [socket]);
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: 5,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>Ping:</div>
        <div>{ping} ms</div>
      </div>
    </>
  );
};

export default PingCounter;
