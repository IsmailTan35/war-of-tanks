import React, { memo, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import CannonBlowUp from "./CannonBlowUp";

const disabledCollide = [
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
  "cannon",
  "cannonBlowUp",
];
const Connon = (props: any) => {
  const { id, args = [0.5], position = [0, -4, 0], setIsDestroyed } = props;
  const { scene }: any = useThree();

  const [cannonRef, api]: any = useSphere(() => ({
    mass: 5,
    args,
    position,
    collisionResponse: false,
    onCollideBegin: (e: any) => {
      if (!cannonRef.current || !e.body?.name || !e.target?.name) return;
      if (
        e.body.name === "tank-hitbox-player" &&
        e.target.name === "cannon-player"
      )
        return;
      if (
        disabledCollide.includes(e.body.name) ||
        e.body.name === "tank-hitbox-" + id
      ) {
        return;
      }
      if (
        e.body?.name.includes("tank-hitbox-") ===
          e.target.name.includes("cannon-") ||
        e.body?.name.includes("cannonBlowUp-") ===
          e.target.name.includes("cannon-")
      )
        return;
      scene.remove(e.target);
      const position = new Vector3();
      e.target.getWorldPosition(position);
      setIsDestroyed(position);
    },
  }));

  useEffect(() => {
    let timeoutId: any;
    if (!cannonRef.current) return;

    const turret = scene.getObjectByName("barrel-" + id);
    const vectorialBarrelTarget = scene.getObjectByName(
      "vectorial-barrel-" + id
    );

    if (!turret || !vectorialBarrelTarget) return;
    const turretTarget = new Vector3();
    const vectorialBarrelTargetTarget = new Vector3();

    turret?.getWorldPosition(turretTarget);
    vectorialBarrelTarget?.getWorldPosition(vectorialBarrelTargetTarget);
    api.position.set(turretTarget.x, turretTarget.y, turretTarget.z);

    const force = 1000;
    const impulse = [
      (vectorialBarrelTargetTarget.x - turretTarget.x) * force,
      (vectorialBarrelTargetTarget.y - turretTarget.y) * force,
      (vectorialBarrelTargetTarget.z - turretTarget.z) * force,
    ];
    const bodyPosition2 = [0, 0, 0];
    api.applyLocalImpulse(impulse, bodyPosition2);

    timeoutId = setTimeout(() => {
      if (!cannonRef.current) return;
      scene.remove(cannonRef.current);
      const position = new Vector3();
      cannonRef.current.getWorldPosition(position);
      setIsDestroyed(position);
    }, 750);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [scene, cannonRef, api]);

  useEffect(() => {
    if (!cannonRef.current) return;
    scene.add(cannonRef.current);
    return () => {
      scene.remove(cannonRef.current);
    };
  }, [cannonRef, scene]);

  return (
    <>
      <mesh ref={cannonRef} name={"cannon-" + id}>
        <sphereGeometry args={args} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    </>
  );
};
const CustomConnon = (props: any) => {
  const [isDestroyed, setIsDestroyed] = React.useState(null);
  useEffect(() => {
    if (!isDestroyed || !props.explosionAudio) return;
    props.explosionAudio.play();
    setTimeout(() => {
      props.explosionAudio.pause();
      props.explosionAudio.currentTime = 0;
    }, 1350);
  }, [isDestroyed]);
  return (
    <>
      {!isDestroyed ? (
        <Connon {...{ ...props, setIsDestroyed }} />
      ) : (
        <CannonBlowUp
          {...{
            ...props,
            position: isDestroyed,
          }}
        />
      )}
    </>
  );
};
export default memo(CustomConnon);