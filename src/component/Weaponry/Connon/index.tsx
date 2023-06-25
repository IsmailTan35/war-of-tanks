import React, { useEffect, useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Vector3 } from "three";

const Connon = (props: any) => {
  const explosionAudio = new Audio("audio/explosion.mp3");
  const audio2 = new Audio("audio/cannon-fire.mp3");
  const {
    connonStep,
    degreX,
    degreY,
    args = [2],
    args2 = [0.3],
    position = [0, -4, 0],
    id,
  } = props;
  const disabledCollide = [
    "tank-body",
    "tank-turret",
    "tank-gun",
    "tank-track",
    "ground",
  ];
  const { scene, gl }: any = useThree();
  const [isCollided, setIsCollided] = React.useState(false);

  const [containerRef, api]: any = useSphere(() => ({
    mass: 1,
    args,
    position,

    onCollideBegin: (e: any) => {
      if (disabledCollide.includes(e.body.name) || isCollided) return;
      setIsCollided(prv => {
        if (prv) return prv;
        scene.remove(e.target);
        api.collisionResponse.set(false);
        e.target.visible = false;
        api.applyLocalImpulse([0, 0, 0], [0, 0, 0]);
        const position = new Vector3();
        e.target.getWorldPosition(position);
        blowUp({ scene, position });
        if (explosionAudio) {
          explosionAudio.play();
          setTimeout(() => {
            explosionAudio.pause();
          }, 1350);
        }
        return !prv;
      });
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const turret = scene.getObjectByName("turret");
    const camera = scene.getObjectByName("attempt");
    if (!turret || !camera) return;

    const turretTarget = new Vector3();
    const cameraTarget = new Vector3();

    turret?.getWorldPosition(turretTarget);
    camera?.getWorldPosition(cameraTarget);
    api.position.set(turretTarget.x, 1, turretTarget.z);

    const force = 200;
    const impulse = [
      (cameraTarget.x - turretTarget.x) * force,
      0,
      (cameraTarget.z - turretTarget.z) * force,
    ];
    const bodyPosition = [turretTarget.x, 0, turretTarget.z];
    if (audio2) {
      audio2.play();
      setTimeout(() => {
        audio2.pause();
      }, 1450);
    }
    api.applyLocalImpulse(impulse, bodyPosition);
    setTimeout(() => {
      api.collisionResponse.set(true);
    }, 100);
    setTimeout(() => {
      scene.remove(containerRef.current);
      setIsCollided(prv => {
        if (prv) return prv;
        scene.remove(containerRef.current);
        api.collisionResponse.set(false);
        containerRef.current.visible = false;
        api.applyLocalImpulse([0, 0, 0], [0, 0, 0]);
        const position = new Vector3();
        containerRef.current.getWorldPosition(position);
        blowUp({ scene, position });
        if (explosionAudio) {
          explosionAudio.play();
          setTimeout(() => {
            explosionAudio.pause();
          }, 1350);
        }
        return !prv;
      });
    }, 750);
  }, [scene, containerRef, api]);

  useEffect(() => {
    scene.add(containerRef.current);
  }, [containerRef, scene]);
  return (
    <>
      <mesh ref={containerRef} name="cannon">
        <sphereGeometry args={args2} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    </>
  );
};

const blowUp = (props: any) => {
  const { position, scene } = props;
  let scale = 1;
  const targetScale = 5;
  let isScaling = true;
  let intervalID: any = null;
  let timeoutID: any = null;
  const meshSphere: any = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: "red" })
  );
  meshSphere.position.set(
    position.x + Math.random() * 2 - 1,
    position.y + Math.random() * 2 - 1,
    position.z + Math.random() * 2 - 1
  );
  scene.add(meshSphere);

  const updateScale = () => {
    if (isScaling) {
      scale = THREE.MathUtils.lerp(scale, targetScale, 0.1);
      meshSphere.scale.set(scale, scale, scale);

      // Check if the target scale is reached
      if (scale >= targetScale - 0.01) {
        isScaling = false;
      }
    } else {
      scale = THREE.MathUtils.lerp(scale, 0, 0.1);
      meshSphere.scale.set(scale, scale, scale);

      // Check if the mesh is invisible
      if (scale <= 0.01) {
        clearInterval(intervalID);
      }
    }
  };
  intervalID = setInterval(updateScale, 10);
  timeoutID = setTimeout(() => {
    scene.remove(meshSphere);
    clearInterval(intervalID);
  }, 1000);
};
export default Connon;
