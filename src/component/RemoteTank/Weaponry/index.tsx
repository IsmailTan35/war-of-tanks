import React, { useContext, useEffect, useRef, useState } from "react";
import Connon from "./Connon";
import { SocketContext } from "@/controller/Contex";

const Weaponry = (props: any) => {
  const { id } = props;
  const [ammo, setAmmo] = useState<number>(0);
  const socket: any = useContext<any>(SocketContext);

  useEffect(() => {
    socket.on("remote-open-fire", (data: any) => {
      if (data.id !== id) return;
      setAmmo(prv => prv + 1);
    });
    return () => {
      socket.off("remote-open-fire");
    };
  }, []);

  return (
    <>
      {Array.from({ length: ammo }, (_, index) => (
        <Connon key={index} layer={index} {...{ id }} />
      ))}
    </>
  );
};

export default Weaponry;
