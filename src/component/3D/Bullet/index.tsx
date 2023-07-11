import React, { memo, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import BulletBlowUp from "./BulletBlowUp";

const disabledCollide = [
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
  "bullet",
  "bulletBlowUp",
];
const Bullet = (props: any) => {
  const { id, args = [0.3], position = [0, -4, 0], setIsDestroyed } = props;
  const { scene }: any = useThree();

  const [bulletRef, api]: any = useSphere(() => ({
    mass: 5,
    args,
    position,
    collisionResponse: false,
    onCollideBegin: (e: any) => {
      if (!bulletRef.current || !e.body?.name || !e.target?.name) return;
      if (
        e.body.name === "tank-hitbox-player" &&
        e.target.name === "bullet-player"
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
          e.target.name.includes("bullet-") ||
        e.body?.name.includes("bulletBlowUp-") ===
          e.target.name.includes("bullet-")
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
    if (!bulletRef.current) return;

    const turret = scene.getObjectByName("secondary-gun-barrel-" + id);
    const vectorialBarrelTarget = scene.getObjectByName(
      "secondary-gun-vectorial-barrel-" + id
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
      if (!bulletRef.current) return;
      scene.remove(bulletRef.current);
      const position = new Vector3();
      bulletRef.current.getWorldPosition(position);
      setIsDestroyed(position);
    }, 750);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [scene, bulletRef, api]);

  useEffect(() => {
    if (!bulletRef.current) return;
    scene.add(bulletRef.current);
    return () => {
      scene.remove(bulletRef.current);
    };
  }, [bulletRef, scene]);

  return (
    <>
      <mesh ref={bulletRef} name={"bullet-" + id}>
        <sphereGeometry args={args} />
        <meshBasicMaterial color={0xfbe119} />
      </mesh>
    </>
  );
};
const CustomBullet = (props: any) => {
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
        <Bullet {...{ ...props, setIsDestroyed }} />
      ) : (
        <BulletBlowUp
          {...{
            ...props,
            position: isDestroyed,
          }}
        />
      )}
    </>
  );
};
export default memo(CustomBullet);
