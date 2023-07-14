import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { Vector3 } from "three";

const GunSight = (props: any) => {
  const { id } = props;
  const { scene } = useThree();
  const groupRef = useRef<any>(null);
  const frontRef = useRef<any>(null);
  const backRef = useRef<any>(null);

  useFrame(({ camera }) => {
    if (!frontRef.current || !backRef.current || !groupRef.current) return;

    const back = backRef.current;
    const front = frontRef.current;
    let backTarget = new Vector3();
    let frontTarget = new Vector3();
    back?.getWorldPosition(backTarget);
    front?.getWorldPosition(frontTarget);
    scene.add(camera);
    camera.position.set(backTarget.x, backTarget.y, backTarget.z);
    camera.lookAt(frontTarget.x, frontTarget.y, frontTarget.z);
  });

  return (
    <>
      <group name={"gunsight-" + id} ref={groupRef}>
        <mesh
          position={[2.5, -15, 0]}
          name={"gunsight-front-" + id}
          ref={frontRef}
        >
          <sphereGeometry args={[0.15, 32]} />
          <meshStandardMaterial attach="material" color="red" />
        </mesh>
        <mesh
          position={[3, 20, 0]}
          name={"gunsight-back-" + id}
          ref={backRef}
        />
      </group>
    </>
  );
};

export default GunSight;
