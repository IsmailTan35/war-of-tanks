import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/controller/Contex";
import SmokeParticles from "@/component/3D/SmokeParticles";
import Connon2 from "@/component/3D/Connon2";

const Weaponry = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const [cannonGroup, setCannonGroup] = useState<any>([]);
  const [isFire, setIsFire] = useState<any>(null);

  useEffect(() => {
    socket.on("remote-open-fire", (data: any) => {
      if (data.id !== id) return;
      setCannonGroup((prev: any) => [...prev, Date.now()]);
      setIsFire(Date.now());
    });
    return () => {
      socket.off("remote-open-fire");
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
      </group>
    </>
  );
};

export default Weaponry;
