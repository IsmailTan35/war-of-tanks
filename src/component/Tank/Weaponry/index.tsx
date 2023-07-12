import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "../../3D/SmokeParticles";
import { useAppSelector } from "@/store";
import Connon2 from "../../3D/Connon2";
import Bullet from "@/component/3D/Bullet";
import { useThree } from "@react-three/fiber";

const Weaponry = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const explosionAudio = new Audio("audio/explosion.mp3");
  const audio2 = new Audio("audio/cannon-fire.mp3");
  const { spectatorMode } = useAppSelector(state => state.camera);

  const [isFire, setIsFire] = useState<any>(null);
  const [cannonGroup, setCannonGroup] = useState<any>([]);
  const [bulletGroup, setBulletGroup] = useState<any>([]);

  useEffect(() => {
    function cannonFire() {
      // setIsFire(Date.now);
      primaryGunTimer = 2.5;
      intervalId = setInterval((e: any) => {
        primaryGunTimer = primaryGunTimer - 0.5;
        if (!primaryGunTimer || primaryGunTimer <= 0) primaryGunTimer = null;
      }, 500);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2500);
      socket.emit("triggerFiring");
      setCannonGroup((prv: any) => [...prv, Date.now()]);
      if (audio2) {
        audio2.play();
        setTimeout(() => {
          audio2.currentTime = 0;
          audio2.pause();
        }, 1450);
      }
    }
    function bulletFire() {
      secondaryGunIntervalID = setInterval((e: any) => {
        setBulletGroup((prv: any) => {
          if (prv.length > 50) {
            console.log(prv.length);
            // setBulletGroup([]);
            clearInterval(secondaryGunIntervalID);
            return prv;
          }
          if (audio2) {
            audio2.play();
            setTimeout(() => {
              audio2.currentTime = 0;
              audio2.pause();
            }, 1450);
          }

          return [
            ...prv,
            <Bullet
              key={prv.length}
              {...{
                id,
                explosionAudio,
                idx: prv.length,
              }}
            />,
          ];
        });
        setIsFire(Date.now);
        setTimeout(() => {
          setBulletGroup((prv: any) => {
            if (prv.length == 0) return prv;
            prv.shift();
            return prv;
          });
        }, 5000);
      }, 100);
    }
    function handleClicked(e: any) {
      if (primaryGunTimer && secondaryGunTimer) return;
      if (e.button === 0 && !primaryGunTimer) cannonFire();
      if (e.button === 2 && !secondaryGunTimer) bulletFire();
    }

    if (spectatorMode) {
      document.removeEventListener("mousedown", handleClicked);
      return;
    }
    let intervalId: any;
    let secondaryGunIntervalID: any;
    let timeoutId: any;
    let secondaryGunTimeoutId: any;
    let primaryGunTimer: any;
    let secondaryGunTimer: any;

    document.addEventListener("mousedown", handleClicked);
    document.addEventListener("mouseup", e => {
      if (e.button === 2) {
        if (secondaryGunIntervalID) clearInterval(secondaryGunIntervalID);
      }
    });

    return () => {
      document.removeEventListener("mouseup", handleClicked);
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
      <group name="group-1">
        <group name="group-2">
          <SmokeParticles isActive={isFire} />
          {cannonGroup.map((item: any, index: number) => {
            return (
              <Connon2
                key={index}
                {...{
                  id,
                  explosionAudio,
                  idx: index,
                }}
              />
            );
          })}
        </group>
        <group name="group-3">
          {bulletGroup.map((item: any, index: number) => {
            return item;
          })}
        </group>
      </group>
    </>
  );
};

export default memo(Weaponry);
