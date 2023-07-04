import { Cylinder, Edges } from "@react-three/drei";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Weaponry from "../Weaponry";
const MainGun = forwardRef((props: any, ref: any) => {
  const { id } = props;
  const meshRef = useRef<any>();
  const connectionPointRef = useRef<any>();

  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.rotation.z = 1.55;
  }, [meshRef]);

  useEffect(() => {
    if (!connectionPointRef) return;
    connectionPointRef.current.rotation.x = 1.55;
  }, [connectionPointRef]);

  return (
    <>
      <mesh position={[1.6, 0, 0]} ref={ref}>
        <mesh ref={connectionPointRef} position={[-0.8, 0, 0]}>
          <Cylinder args={[0.3, 0.3, 0.5, 60]}>
            <Edges color="black" />
            <meshStandardMaterial color="hotpink" />
          </Cylinder>
        </mesh>
        <mesh ref={meshRef}>
          <mesh>
            <Cylinder args={[0.1, 0.1, 4, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color="hotpink" />
            </Cylinder>
          </mesh>
          <mesh position={[0, -2, 0]} ref={meshRef} name={"barrel" + id}>
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshStandardMaterial color="hotpink" />
            </Cylinder>
          </mesh>
          <mesh
            position={[0, -5, 0]}
            ref={meshRef}
            name={"vectorial-barrel" + id}
          ></mesh>
        </mesh>
        <Weaponry
          connonAmmo={1}
          {...{
            id,
          }}
        />
      </mesh>
    </>
  );
});
MainGun.displayName = "MainGun";
export default MainGun;
