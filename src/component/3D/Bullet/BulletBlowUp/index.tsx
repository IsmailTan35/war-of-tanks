import React, { memo, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const disabledCollide = [
  "ground",
  "tank-body",
  "tank-turret",
  "tank-gun",
  "tank-track",
];
const BulletBlowUp = (props: any) => {
  const { position, setIsDestroyed, id } = props;
  const { scene }: any = useThree();
  const [cannonBlowUpRef, cannonBlowUpApi]: any = useSphere(() => ({
    position: [position.x, position.y, position.z],
    args: [2],
    type: "Static",
    onCollideBegin: (e: any) => {
      if (
        disabledCollide.includes(e.body?.name) ||
        e.target?.name.replace("bulletBlowUp-", "") ===
          e.body?.name.replace("tank-hitbox-", "")
      )
        return;
    },
    mass: 5,
    collisionResponse: false,
  }));

  useEffect(() => {
    scene.add(cannonBlowUpRef.current);

    setTimeout(() => {
      scene.remove(cannonBlowUpRef.current);
      setIsDestroyed(true);
    }, 1000);

    return () => {
      scene.remove(cannonBlowUpRef.current);
      setIsDestroyed(true);
    };
  }, []);
  return <mesh ref={cannonBlowUpRef} name={"bulletBlowUp-" + id}></mesh>;
};

const CustomBlowUp = (props: any) => {
  const [isDestroyed, setIsDestroyed] = React.useState(false);

  return (
    <>
      {!isDestroyed ? <BulletBlowUp {...{ ...props, setIsDestroyed }} /> : null}
    </>
  );
};
export default memo(CustomBlowUp);
