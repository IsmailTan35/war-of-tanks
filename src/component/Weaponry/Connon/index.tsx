import React, { useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { MathUtils, Sphere, Vector3 } from "three";
const Connon = (props: any) => {
  const { scene, gl, camera } = useThree();
  const {
    layer,
    connonStep,
    degreX,
    degreY,
    args = [0.3],
    position = [0, -4, 0],
  } = props;
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
    containerRef.current?.getWorldPosition(target);
    turret?.getWorldPosition(target);

    const angleInRadians = (Math.PI / 180) * degreX;
    const distanceFromCenter = 3;
    const offsetX = distanceFromCenter * Math.cos(angleInRadians);
    const offsetY = distanceFromCenter * Math.sin(angleInRadians);
    console.log(turret.quaternion);
    const newX = target.x + offsetX;
    const newY = target.z + offsetY;
    api.position.set(newX + 3, 1, newY);
    const force = [0, 0, -500];
    scene.add(containerRef.current);

    setTimeout(() => {
      api.collisionResponse.set(true);
      api.applyLocalImpulse(force, [0, 0, 0]);
    }, 100);
    setTimeout(() => {
      // scene.remove(containerRef.current);
    }, 5000);
  }, [scene, containerRef, api]);

  return (
    <>
      <mesh position={[2, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh ref={containerRef} name="cannon" position={position}>
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
