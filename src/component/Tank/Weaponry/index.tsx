import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "../../3D/SmokeParticles";
import { useAppSelector } from "@/store";
import Connon2 from "../../3D/Connon2";

const Weaponry = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const explosionAudio = new Audio("audio/explosion.mp3");
  const audio2 = new Audio("audio/cannon-fire.mp3");

  const { spectatorMode } = useAppSelector(state => state.camera);

  const [isFire, setIsFire] = useState<any>(null);

  const cannonGroup = useRef<any>([]);

  useEffect(() => {
    function handleClicked(e: any) {
      if (e.button !== 0 || timer) return;
      setIsFire(Date.now);
      timer = 2.5;
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
          audio2.currentTime = 0;
          audio2.pause();
        }, 1450);
      }
    }
    if (spectatorMode) {
      document.removeEventListener("click", handleClicked);
      return;
    }
    let intervalId: any;
    let timeoutId: any;
    let timer: any;

    document.addEventListener("click", handleClicked);

    return () => {
      document.removeEventListener("click", handleClicked);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      setIsFire(null);
      timer = null;
      cannonGroup.current = [];
    };
  }, [spectatorMode]);

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
