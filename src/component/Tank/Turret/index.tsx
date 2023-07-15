import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Cylinder, Edges } from "@react-three/drei";
import { MathUtils } from "three";
import { SocketContext } from "@/controller/Contex";
import { useAppSelector } from "@/store";
import MainGun from "@/component/3D/MainGun";
import Weaponry from "@/component/Tank/Weaponry";
import SecondaryGun from "@/component/3D/SecondaryGun";

const Turret = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const { spectatorMode } = useAppSelector(state => state.camera);

  const ref = useRef<any>(null);
  const mainGunRef = useRef<any>();
  const machineGunRef = useRef<any>();

  useEffect(() => {
    if (spectatorMode) return;
    let degreeX = 180;
    let degreeY = 90;

    const handleMouseMove = (event: any) => {
      degreeX = degreeX - event.movementX * 0.3;
      const dataY = degreeY - event.movementY * 0.5;
      degreeY = dataY > 120 ? 120 : dataY < 80 ? 80 : dataY;
      socket.emit("turret-rotation", { x: degreeX - 90, y: degreeY });

      var angle = MathUtils.degToRad(degreeX - 90);
      var angleY = MathUtils.degToRad(degreeY);

      ref.current.rotation.y = angle;
      mainGunRef.current.rotation.z = angleY;
      machineGunRef.current.rotation.z = angleY;
      if (!event.movementX || !event.movementY) return;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [spectatorMode, socket]);

  return (
    <>
      <group position={[0, 1, 1]} ref={ref} name={"turret" + id}>
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[1, 1.3, 0.9, 60]}>
            <Edges color={0x3e3f44} />
            <meshStandardMaterial color="darkgreen" />
          </Cylinder>
        </mesh>
        <mesh position={[0, 0.5, -0.45]}>
          <Cylinder args={[0.3, 0.3, 0.1, 60]}>
            <Edges color="black" />
            <meshStandardMaterial color={0x3e3f44} />
          </Cylinder>
        </mesh>
        <mesh position={[0, 0.45, 0.45]}>
          <Cylinder args={[0.25, 0.25, 0.1, 60]}>
            <Edges color="black" />
            <meshStandardMaterial color={0x3e3f44} />
          </Cylinder>
        </mesh>
        <MainGun {...{ id }} ref={mainGunRef}>
          <>
            <Weaponry
              {...{
                id,
              }}
            />
          </>
        </MainGun>
        <SecondaryGun {...{ id }} ref={machineGunRef} />
      </group>
    </>
  );
};

export default memo(Turret);
