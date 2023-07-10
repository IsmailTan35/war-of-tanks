import { Cylinder, Edges } from "@react-three/drei";
import React, { useContext, useEffect, useRef } from "react";
import MainGun from "../../3D/MainGun";
import { SocketContext } from "@/controller/Contex";
import { Socket } from "socket.io-client";
import { MathUtils } from "three";
import Weaponry from "../Weaponry";

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
    socket.on("remote-turret-rotation", (data: any) => {
      if (data.id !== id) return;
      const angleY = MathUtils.degToRad(data.rotation.y);
      mainGunRef.current.rotation.z = angleY;
    });
    return () => {
      socket.off("remote-turret-rotation");
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
          <mesh position={[0, 0.5, -0.45]}>
            <Cylinder args={[0.3, 0.3, 0.1, 60]}>
              <Edges color="white" />
              <meshStandardMaterial color="black" />
            </Cylinder>
          </mesh>
          <mesh position={[0, 0.45, 0.45]}>
            <Cylinder args={[0.25, 0.25, 0.1, 60]}>
              <Edges color="white" />
              <meshStandardMaterial color="black" />
            </Cylinder>
          </mesh>
        </mesh>
        <MainGun {...{ id }} ref={mainGunRef}>
          <Weaponry
            {...{
              id,
            }}
          />
        </MainGun>
      </group>
    </>
  );
};

export default Turret;
