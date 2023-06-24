import { Cylinder, Edges } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import Weaponry from "../Weaponry";
const MainGun = (props: any) => {
  const { id } = props;
  const meshRef = useRef<any>();
  const mainGunRef = useRef<any>();
  const connectionPointRef = useRef<any>();

  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.rotation.z = 1.55;
  }, [meshRef]);

  useEffect(() => {
    if (!connectionPointRef) return;
    connectionPointRef.current.rotation.x = 1.55;
  }, [connectionPointRef]);

  const [degreX, setDegreX] = useState(180);
  const [degreY, setDegreY] = useState(110);
  const handleMouseMove = (event: any) => {
    setDegreX(prv => prv + event.movementX * 0.2);
    setDegreY(prv => {
      const fixedData = prv - event.movementY * 2;
      const result = fixedData > 110 ? 110 : fixedData < 90 ? 90 : fixedData;
      return result;
    });
  };

  useEffect(() => {
    // document.body.addEventListener("mousemove", handleMouseMove);
    // return () => {
    //   document.removeEventListener("mousemove", handleMouseMove);
    // };
  }, []);

  useFrame(state => {
    // if (!meshRef.current) return;
    // var target = new Vector3();
    // mainGunRef.current.getWorldPosition(target);
    // var angle = MathUtils.degToRad(degreX);
    // var angleY = MathUtils.degToRad(degreY);
    // meshRef.current.rotation.z = angleY;
  });

  return (
    <>
      <mesh position={[1.6, 0, 0]} ref={mainGunRef}>
        <mesh ref={connectionPointRef} position={[-0.8, 0, 0]}>
          <Cylinder args={[0.3, 0.3, 0.5, 60]}>
            <Edges color="black" />
            <meshBasicMaterial color="hotpink" />
          </Cylinder>
        </mesh>
        <mesh ref={meshRef}>
          <mesh>
            <Cylinder args={[0.1, 0.1, 4, 60]}>
              <Edges color="black" />
              <meshBasicMaterial color="hotpink" />
            </Cylinder>
          </mesh>
          <mesh position={[0, -2, 0]} ref={meshRef} name={"attempt" + id}>
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshBasicMaterial color="hotpink" />
            </Cylinder>
          </mesh>
        </mesh>
        <Weaponry
          connonAmmo={1}
          {...{
            degreY,
            degreX,
            id,
          }}
        />
      </mesh>
    </>
  );
};

export default MainGun;
