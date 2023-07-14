import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "../../3D/SmokeParticles";
import { ammoActions, useAppDispatch, useAppSelector } from "@/store";
import Connon2 from "../../3D/Connon2";
import Bullet from "@/component/3D/Bullet";

const Weaponry = (props: any) => {
  const dispacth = useAppDispatch();
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const { spectatorMode } = useAppSelector(state => state.camera);
  const { cannonAmmo } = useAppSelector(state => state.ammo);
  const [isFire, setIsFire] = useState<any>(null);
  const [cannonGroup, setCannonGroup] = useState<any>([]);
  const [bulletGroup, setBulletGroup] = useState<any>([]);

  useEffect(() => {
    let isMachineGunCoolDown = false;
    let primaryGunAmmo = cannonAmmo;
    function cannonFire() {
      // if (!primaryGunAmmo) return console.warn("no ammo");
      setIsFire(Date.now);
      primaryGunTimer = 2.5;
      intervalId = setInterval((e: any) => {
        primaryGunTimer = primaryGunTimer - 0.5;
        if (!primaryGunTimer || primaryGunTimer <= 0) primaryGunTimer = null;
      }, 500);

      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setCannonGroup([]);
      }, 2500);
      socket.emit("triggerFiring");
      dispacth(
        ammoActions.decrease({
          ammoType: "cannonAmmo",
          ammoCount: 1,
        })
      );
      primaryGunAmmo -= 1;
      setCannonGroup((prv: any) => [...prv, Date.now()]);
    }
    function bulletFire() {
      secondaryGunIntervalID = setInterval((e: any) => {
        if (isMachineGunCoolDown) {
          console.warn("machine gun cool down...");
          return;
        }
        setBulletGroup((prv: any) => {
          if (prv.length >= 49) {
            isMachineGunCoolDown = true;
            let deleteBulletInterval: any;
            setTimeout(() => {
              deleteBulletInterval = setInterval(() => {
                setBulletGroup((prv: any) => {
                  let fixed = [...prv];
                  fixed.shift();
                  if (fixed.length == 0) {
                    isMachineGunCoolDown = false;
                    clearInterval(deleteBulletInterval);
                  }
                  dispacth(
                    ammoActions.increase({
                      ammoType: "machineGunAmmo",
                      ammoCount: 1,
                    })
                  );
                  return fixed;
                });
              }, 100);
            }, 500);
          }

          socket.emit("triggerFiringMachineGun");
          dispacth(
            ammoActions.decrease({ ammoType: "machineGunAmmo", ammoCount: 1 })
          );
          return [...prv, Date.now()];
        });
        // setIsFire(Date.now);
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
                  idx: index,
                }}
              />
            );
          })}
        </group>
        <group name="group-3">
          {bulletGroup.map((item: any, index: number) => {
            return (
              <Bullet
                key={index}
                {...{
                  id,
                  idx: index,
                }}
              />
            );
          })}
        </group>
      </group>
    </>
  );
};

export default memo(Weaponry);
