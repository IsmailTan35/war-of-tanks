import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "../3D/SmokeParticles";
import Connon2 from "./Connon2";

const Weaponry = (props: any) => {
  const explosionAudio = new Audio("audio/explosion.mp3");
  const audio2 = new Audio("audio/cannon-fire.mp3");
  const { degreX, degreY, id } = props;
  const cannonGroup = useRef<any>([]);
  const [isFire, setIsFire] = useState<any>(null);
  const socket: any = useContext<any>(SocketContext);

  useEffect(() => {
    let intervalId: any;
    let timeoutId: any;
    let timer: any;

    document.addEventListener("click", e => {
      if (e.button !== 0 || timer) return;
      setIsFire(Date.now);
      timer = 1.5;
      intervalId = setInterval((e: any) => {
        timer = timer - 0.5;
        if (!timer || timer <= 0) timer = null;
      }, 500);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2500);
      socket.emit("triggerFiring");
      cannonGroup.current.push(Date.now());
      if (audio2) {
        audio2.play();
        setTimeout(() => {
          audio2.pause();
        }, 1450);
      }
    });
    return () => {
      window.removeEventListener("click", () => {});
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      setIsFire(null);
      timer = null;
      cannonGroup.current = [];
    };
  }, []);
  return (
    <>
      <group>
        <SmokeParticles isActive={isFire} />
        {cannonGroup.current.map((item: any, index: number) => {
          return (
            <Connon2
              key={index}
              idx={index}
              {...{
                degreX,
                degreY,
                id,
                explosionAudio,
                cannonGroup,
              }}
            />
          );
        })}
      </group>
    </>
  );
};

export default Weaponry;
