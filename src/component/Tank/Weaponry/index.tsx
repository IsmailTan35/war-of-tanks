import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "../../3D/SmokeParticles";
import { useAppSelector } from "@/store";
import Connon2 from "../../3D/Connon2";
import Bullet from "@/component/3D/Bullet";

const Weaponry = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const explosionAudio = new Audio("audio/explosion.mp3");
  const audio2 = new Audio("audio/cannon-fire.mp3");

  const { spectatorMode } = useAppSelector(state => state.camera);

  const [isFire, setIsFire] = useState<any>(null);

  const cannonGroup = useRef<any>([]);
  const bulletGroup = useRef<any>([]);

  useEffect(() => {
    function cannonFire() {
      setIsFire(Date.now);
      primaryGunTimer = 2.5;
      intervalId = setInterval((e: any) => {
        primaryGunTimer = primaryGunTimer - 0.5;
        if (!primaryGunTimer || primaryGunTimer <= 0) primaryGunTimer = null;
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
    function bulletFire() {
      setIsFire(Date.now);
      secondaryGunTimer = 0.5;
      secondaryGunIntervalID = setInterval((e: any) => {
        secondaryGunTimer = secondaryGunTimer - 0.5;
        if (!secondaryGunTimer || secondaryGunTimer <= 0)
          secondaryGunTimer = null;
      }, 500);
      secondaryGunTimeoutId = setTimeout(() => {
        clearInterval(secondaryGunIntervalID);
      }, 500);
      socket.emit("triggerFiring");
      bulletGroup.current.push(Date.now());
    }
    function handleClicked(e: any) {
      if (primaryGunTimer && secondaryGunTimer) return;
      if (e.button === 0 && !primaryGunTimer) cannonFire();
      if (e.button === 2 && !secondaryGunTimer) bulletFire();
    }

    if (spectatorMode) {
      document.removeEventListener("click", handleClicked);
      return;
    }
    let intervalId: any;
    let secondaryGunIntervalID: any;
    let timeoutId: any;
    let secondaryGunTimeoutId: any;
    let primaryGunTimer: any;
    let secondaryGunTimer: any;

    document.addEventListener("click", handleClicked);

    return () => {
      document.removeEventListener("click", handleClicked);
      clearInterval(intervalId);
      clearInterval(secondaryGunIntervalID);
      clearTimeout(timeoutId);
      clearTimeout(secondaryGunTimeoutId);
      setIsFire(null);
      primaryGunTimer = null;
      secondaryGunTimer = null;

      cannonGroup.current = [];
    };
  }, [spectatorMode]);

  return (
    <>
      <group>
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
        <group>
          {bulletGroup.current.map((item: any, index: number) => {
            return (
              <Bullet
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
      </group>
    </>
  );
};

export default Weaponry;
