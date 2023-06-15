import { Cylinder, Edges } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
const MainGun = () => {
  const meshRef = useRef<any>();
  const rotationMeshRef = useRef<any>("up");
  const connectionPointRef = useRef<any>();
  useEffect(() => {
    if (!meshRef) return;
    meshRef.current.rotation.z = 1.55;
  }, [meshRef]);

  useEffect(() => {
    if (!connectionPointRef) return;
    connectionPointRef.current.rotation.x = 1.55;
  }, [connectionPointRef]);

  useFrame((state, delta) => {
    if (!meshRef) return;
    if (meshRef.current.rotation.z <= 1.4) {
      rotationMeshRef.current = "up";
    } else if (meshRef.current.rotation.z >= 1.7) {
      rotationMeshRef.current = "down";
    }
    if (rotationMeshRef.current === "up") meshRef.current.rotation.z += delta;
    else if (rotationMeshRef.current === "down")
      meshRef.current.rotation.z -= delta;
  });

  return (
    <>
      <mesh position={[1.6, 0, 0]}>
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
          <mesh position={[0, -2, 0]} ref={meshRef}>
            <Cylinder args={[0.15, 0.15, 0.5, 60]}>
              <Edges color="black" />
              <meshBasicMaterial color="hotpink" />
            </Cylinder>
          </mesh>
        </mesh>
      </mesh>
    </>
  );
};

export default MainGun;
