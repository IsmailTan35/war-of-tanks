import React, { memo, use, useEffect, useMemo } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import BulletBlowUp from "./BulletBlowUp";
import DistanceAudio from "../DistanceAudio";

const disabledCollide = [
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
  "bullet",
  "bulletBlowUp",
];
const Bullet = (props: any) => {
  const {
    id,
    args = [0.3],
    position = [0, -4, -0.5],
    setIsDestroyed,
    isDestroyed,
  } = props;
  const { scene }: any = useThree();

  const [bulletRef, api]: any = useSphere(() => ({
    mass: 5,
    args,
    position,
    collisionResponse: false,
    userData: {
      damage: 10,
    },
    onCollideBegin: (e: any) => {
      if (isDestroyed) return;
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
        e.body?.name.includes("bulletBlowUp-") ===
        e.target.name.includes("bullet-")
      )
        return;
      setIsDestroyed({
        x: 0,
        y: 0,
        z: 0,
      });
    },
  }));

  useEffect(() => {
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

    const force = 5000;
    const impulse = [
      (vectorialBarrelTargetTarget.x - turretTarget.x) * force,
      (vectorialBarrelTargetTarget.y - turretTarget.y) * force,
      (vectorialBarrelTargetTarget.z - turretTarget.z) * force,
    ];
    const bodyPosition2 = [0, 0, 0];
    api.applyLocalImpulse(impulse, bodyPosition2);
  }, [bulletRef]);

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
        <DistanceAudio {...{ audioUrl: "audio/machine-gun.mp3", time: 1000 }} />
        <sphereGeometry args={args} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    </>
  );
};

const CustomBullet = (props: any) => {
  const [isDestroyed, setIsDestroyed] = React.useState<any>(null);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setIsDestroyed({
        x: 0,
        y: 0,
        z: 0,
      });
    }, 500);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  return (
    <>
      {!isDestroyed ? (
        <Bullet {...{ ...props, setIsDestroyed, isDestroyed }} />
      ) : null}
    </>
  );
};
export default memo(CustomBullet);
