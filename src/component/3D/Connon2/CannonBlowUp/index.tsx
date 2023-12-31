import React, { memo, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import DistanceAudio from "../../DistanceAudio";

const disabledCollide = [
  "ground",
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
];
const CannonBlowUp = (props: any) => {
  const { position, setIsDestroyed, id } = props;
  const { scene }: any = useThree();
  const [cannonBlowUpRef, cannonBlowUpApi]: any = useSphere(() => ({
    position: [position.x, position.y, position.z],
    args: [3],
    type: "Static",
    mass: 5,
    collisionResponse: false,
    userData: {
      damage: 100,
    },
    onCollideBegin: (e: any) => {
      if (
        disabledCollide.includes(e.body?.name) ||
        e.target?.name.replace("cannonBlowUp-", "") ===
          e.body?.name.replace("tank-hitbox-", "")
      )
        return;
    },
  }));

  useEffect(() => {
    const targetScale = 4;
    let timeoutId: any;
    let intervalID: any;
    let scale = 1;
    let isScaling = true;
    scene.add(cannonBlowUpRef.current);
    cannonBlowUpApi.collisionResponse.set(true);

    const updateScale = () => {
      if (isScaling) {
        scale = THREE.MathUtils.lerp(scale, targetScale, 0.1);
        cannonBlowUpRef.current.scale.set(scale, scale, scale);

        if (scale >= targetScale - 0.01) {
          isScaling = false;
          cannonBlowUpApi.collisionResponse.set(false);
        }
      } else {
        scale = THREE.MathUtils.lerp(scale, 0, 0.1);
        cannonBlowUpRef.current.scale.set(scale, scale, scale);
        if (scale <= 0.01) {
          clearInterval(intervalID);
        }
      }
    };
    intervalID = setInterval(updateScale, 10);
    setTimeout(() => {
      scene.remove(cannonBlowUpRef.current);
      clearInterval(intervalID);
      setIsDestroyed(true);
    }, 1250);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalID);
      scene.remove(cannonBlowUpRef.current);
      setIsDestroyed(true);
    };
  }, []);
  return (
    <mesh
      ref={cannonBlowUpRef}
      name={"cannonBlowUp-" + id}
      castShadow
      receiveShadow
    >
      <DistanceAudio {...{ audioUrl: "audio/explosion.mp3" }} />
      <sphereGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const CustomBlowUp = (props: any) => {
  const [isDestroyed, setIsDestroyed] = React.useState(false);

  return (
    <>
      {!isDestroyed ? (
        <>
          <CannonBlowUp {...{ ...props, setIsDestroyed }} />
        </>
      ) : null}
    </>
  );
};
export default memo(CustomBlowUp);
