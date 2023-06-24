import React, { useContext, useEffect, useRef, useState } from "react";
import Connon from "./Connon";
import { SocketContext } from "@/controller/Contex";
const Weaponry = (props: any) => {
  const { connonAmmo = 5, degreX, degreY, id } = props;
  const [ammo, setAmmo] = useState<number>(0);
  const socket: any = useContext<any>(SocketContext);
  useEffect(() => {
    let intervalId: any;
    let timeoutId: any;
    let timer: any;
    window.addEventListener("click", e => {
      if (e.button !== 0) return;
      if (timer) return;
      setAmmo(prv => prv + 1);
      timer = 2.5;
      intervalId = setInterval((e: any) => {
        timer = timer - 0.5;
        if (!timer || timer <= 0) timer = null;
      }, 500);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2500);
      socket.emit("triggerFiring");
    });
    return () => {
      window.removeEventListener("click", () => {});
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      timer = null;
    };
  }, []);

  return (
    <>
      {Array.from({ length: ammo }, (_, index) => (
        <Connon key={index} layer={index} {...{ degreX, degreY, id }} />
      ))}
    </>
  );
};

export default Weaponry;
