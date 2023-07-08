import { Cylinder, Edges } from "@react-three/drei";
import React, { forwardRef, useContext, useEffect, useRef } from "react";
import Weaponry from "../Weaponry";
import { SocketContext } from "@/controller/Contex";
import { MathUtils } from "three";

const MainGun = forwardRef((props: any, ref: any) => {
  const socket = useContext<any>(SocketContext);
  const { id } = props;
  const meshRef = useRef<any>();

  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.rotation.z = 1.55;
  }, [meshRef]);

  useEffect(() => {
    socket.on("remote-turret-rotation", (data: any) => {
      if (!ref.current || data.id !== id) return;
      const angleY = MathUtils.degToRad(data.rotation.y);
      meshRef.current.rotation.z = angleY;
    });
    return () => {
      socket.off("remote-turret-rotation");
    };
  }, [socket]);

  return (
    <>
      <mesh position={[1.6, 0, 0]} ref={ref}>
        <mesh ref={meshRef}>
          <mesh>
            <Cylinder args={[0.1, 0.1, 4.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color={0x637f0e} />
            </Cylinder>
          </mesh>
          <mesh position={[0, -2, 0]} name={"barrel-" + id}>
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color={0x3e3f44} />
            </Cylinder>
          </mesh>
          <mesh position={[0, -5, 0]} name={"vectorial-barrel-" + id}>
            <boxGeometry args={[0.1, 0.1, 0.5]} />
            <meshStandardMaterial color={0x3e3f44} />
          </mesh>
          <Weaponry
            connonAmmo={1}
            {...{
              id,
            }}
          />
        </mesh>
      </mesh>
    </>
  );
});
MainGun.displayName = "MainGun";
export default MainGun;
