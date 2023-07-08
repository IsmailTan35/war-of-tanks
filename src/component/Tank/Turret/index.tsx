import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Cylinder, Edges } from "@react-three/drei";
import MainGun from "../MainGun";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { SocketContext } from "@/controller/Contex";

const Turret = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const ref = useRef<any>(null);
  const [degreX, setDegreX] = useState(90);
  const [degreY, setDegreY] = useState(110);

  const handleMouseMove = (event: any) => {
    setDegreX(prv => {
      const dataX = prv - event.movementX * 0.2;
      setDegreY(prv => {
        const dataY = prv - event.movementY * 2;
        const fixedDataY = dataY > 120 ? 120 : dataY < 80 ? 80 : dataY;
        socket.emit("turret-rotation", { x: dataX, y: fixedDataY });
        return fixedDataY;
      });
      return dataX;
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const turret = ref.current;
    var angle = MathUtils.degToRad(degreX);
    turret.rotation.y = angle;
  });

  return (
    <>
      <group position={[0, 1, 1]} ref={ref} name="turret">
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[1, 1.3, 0.9, 60]}>
            <Edges color="white" />
            <meshStandardMaterial color="darkgreen" />
          </Cylinder>
        </mesh>
        <MainGun {...{ id }} />
      </group>
    </>
  );
};

export default memo(Turret);
