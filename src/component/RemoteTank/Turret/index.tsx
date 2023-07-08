import { Cylinder, Edges } from "@react-three/drei";
import React, { useContext, useEffect, useRef } from "react";
import MainGun from "../MainGun";
import { SocketContext } from "@/controller/Contex";
import { Socket } from "socket.io-client";
import { MathUtils } from "three";

const Turret = (props: any) => {
  const { id } = props;
  const ref = useRef<any>(null);
  const socket: any = useContext<Socket>(SocketContext);
  const mainGunRef = useRef<any>();

  useEffect(() => {
    socket.on("remote-turret-rotation", (data: any) => {
      if (!ref.current || data.id !== id) return;
      const turret = ref.current;
      const angleX = MathUtils.degToRad(data.rotation.x);
      turret.rotation.y = angleX;
    });
    return () => {
      socket.off("remote-turret-rotation");
    };
  }, [socket]);

  return (
    <>
      <group position={[0, 1, 1]} ref={ref} name={"turret" + id}>
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[1, 1.3, 0.9, 60]}>
            <Edges color="white" />
            <meshStandardMaterial color="darkgreen" />
          </Cylinder>
        </mesh>
        <MainGun {...{ id }} ref={mainGunRef} />
      </group>
    </>
  );
};

export default Turret;
