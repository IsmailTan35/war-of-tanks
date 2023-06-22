import React, { useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
const Connon = (props: any) => {
  const {
    layer,
    connonStep,
    degreX,
    degreY,
    args = [0.3],
    position = [0, -4, 0],
  } = props;
  const { scene, gl, camera } = useThree();
  const [containerRef, api]: any = useSphere(() => ({
    mass: 1,
    collisionResponse: false,
    args: [0.3],
    position,
  }));

  useEffect(() => {
    if (!containerRef.current) return;
    const turret = scene.getObjectByName("turret");
    if (!turret) return;

    const target = new Vector3();
    const cameraTarget = new Vector3();

    turret?.getWorldPosition(target);
    camera.getWorldPosition(cameraTarget);
    scene.add(containerRef.current);
    api.position.set(-target.x, 3, target.z);
    const force = 10;
    const impulse = [cameraTarget.z * force, 3, cameraTarget.x * force];
    const bodyPosition = [-target.x, 3, target.z];
    console.log(target);

    api.collisionResponse.set(true);
    setTimeout(() => {
      api.applyLocalImpulse(impulse, bodyPosition);
    }, 100);

    setTimeout(() => {
      // scene.remove(containerRef.current);
    }, 5000);
    console.log(231);
  }, [scene, containerRef, api, camera]);

  return (
    <>
      <mesh ref={containerRef} name="cannon">
        <sphereGeometry args={args} />
        <meshBasicMaterial color={"black"} />
        {/* <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.1, 0.75, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
          <meshStandardMaterial color="black" />
        </mesh> */}
      </mesh>
    </>
  );
};

export default Connon;
