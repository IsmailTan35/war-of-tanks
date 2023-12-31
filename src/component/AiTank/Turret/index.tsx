import { Cylinder, Edges } from "@react-three/drei";
import React, { useContext, useEffect, useRef, useState } from "react";
import MainGun from "../../3D/MainGun";
import { SocketContext } from "@/controller/Contex";
import { Socket } from "socket.io-client";
import Weaponry from "../Weaponry";
import SecondaryGun from "@/component/3D/SecondaryGun";
import { useFrame } from "@react-three/fiber";
import FiringArea from "../FiringArea";

const Turret = (props: any) => {
  const { id, idx } = props;
  const ref = useRef<any>(null);
  const socket: any = useContext<Socket>(SocketContext);
  const mainGunRef = useRef<any>();
  const machineGunRef = useRef<any>();
  const [limit, setLimit] = useState<number>(0.01);
  useEffect(() => {
    // socket.on("remote-turret-rotation", (data: any) => {
    //   if (!ref.current || data.id !== id) return;
    //   const turret = ref.current;
    //   const angleX = MathUtils.degToRad(data.rotation.x);
    //   turret.rotation.y = angleX;
    // });
    // socket.on("remote-turret-rotation", (data: any) => {
    //   if (data.id !== id) return;
    //   const angleY = MathUtils.degToRad(data.rotation.y);
    //   mainGunRef.current.rotation.z = angleY;
    //   machineGunRef.current.rotation.z = angleY;
    // });
  }, [socket]);

  useFrame(() => {
    const turret = ref.current;
    const mainGun = mainGunRef.current;
    if (!turret || !mainGun) return;
    const turretRotation = turret.rotation;
    const turretRotationY = turretRotation.y;

    const mainRotation = mainGun.rotation;
    const mainRotationZ = mainRotation.z;
    turret.rotation.y = turretRotationY + 0.01;

    mainGun.rotation.z = mainRotationZ + limit;

    if (mainGun.rotation.z >= 2) {
      setLimit(-0.01);
    } else if (mainGun.rotation.z <= 1.5) {
      setLimit(0.01);
    }
  });

  return (
    <>
      <group position={[0, 1, 1]} ref={ref} name={"turret" + id}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1.3, 0.9, 60]} />
          <meshStandardMaterial color="darkgreen" />
          <mesh position={[0, 0.5, -0.45]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 60]} />
            <meshStandardMaterial color={0x3e3f44} />
          </mesh>
          <mesh position={[0, 0.45, 0.45]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 60]} />
            <meshStandardMaterial color={0x3e3f44} />
          </mesh>
        </mesh>
        <FiringArea />
        <MainGun {...{ id, idx }} ref={mainGunRef}>
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

export default Turret;
