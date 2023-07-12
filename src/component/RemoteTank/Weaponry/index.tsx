import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "@/component/3D/SmokeParticles";
import Connon2 from "@/component/3D/Connon2";
import Bullet from "@/component/3D/Bullet";
const Weaponry = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const [cannonGroup, setCannonGroup] = useState<any>([]);
  const [bulletGroup, setBulletGroup] = useState<any>([]);
  const [isFire, setIsFire] = useState<any>(null);

  useEffect(() => {
    socket.on("remote-open-fire", (data: any) => {
      if (data.id !== id) return;
      setCannonGroup([]);
      setTimeout(() => {
        setCannonGroup((prev: any) => [...prev, Date.now()]);
        setIsFire(Date.now());
      }, 1);
    });
    socket.on("remote-open-firing-machine-gun", (data: any) => {
      if (data.id !== id) return;
      setBulletGroup((prev: any) => {
        if (prev.length >= 49) {
          let deleteBulletInterval: any;
          setTimeout(() => {
            deleteBulletInterval = setInterval(() => {
              setBulletGroup((prev: any) => {
                let fixed = [...prev];
                fixed.shift();
                if (fixed.length == 0) {
                  clearInterval(deleteBulletInterval);
                }
                return fixed;
              });
            }, 100);
          }, 500);
        }
        return [...prev, Date.now()];
      });
      setIsFire(Date.now());
    });
    return () => {
      socket.off("remote-open-fire");
      socket.off("remote-open-fire-machine-gun");
      setCannonGroup([]);
    };
  }, []);

  return (
    <>
      <group>
        <SmokeParticles isActive={isFire} />
        {cannonGroup.map((item: any, index: number) => (
          <Connon2 key={index} layer={index} {...{ id }} />
        ))}
        {bulletGroup.map((item: any, index: number) => (
          <Bullet key={index} layer={index} {...{ id }} />
        ))}
      </group>
    </>
  );
};

export default Weaponry;
