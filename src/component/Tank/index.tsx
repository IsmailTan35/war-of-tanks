import React, { useContext, useEffect, useRef, useState } from "react";
import Hull from "../3D/Hull";
import Turret from "./Turret";
import Tracks from "../3D/Tracks";
import { PerspectiveCamera } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "@/hooks/useWheel";
import { useControls } from "@/hooks/useControls";
import { WheelDebug } from "../3D/WheelDebug";
import { Quaternion, Vector3 } from "three";
import { SocketContext } from "@/controller/Contex";
import { Text } from "@react-three/drei";
import {
  cameraActions,
  healthActions,
  tanksPositionActions,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import Hitbox from "../3D/HitBox";
import Explosion from "../3D/Explosion";

const width = 3.5;
const height = 3;
const front = 2.5;
const wheelRadius = 0.5;
const hitboxBodyArgs: any = [width, height, front * 2];
const disableCollideNames = ["ground", "tree", "rock"];
const Tank = (props: any) => {
  const { position } = props;
  const id = "player";
  const socket: any = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<any>("");
  const nameRef = useRef<any>(null);
  const { spectatorMode } = useAppSelector(state => state.camera);
  const [isExplosion, setIsExplosion] = useState<boolean>(false);
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      args: hitboxBodyArgs,
      mass: 1500,
      position,
      userData: {
        healtyPoint: 500,
      },
      onCollideEnd: (e: any) => {
        if (spectatorMode) return;
        if (!e.body?.name || !e.target?.name) return;
        if (
          e.body?.name?.replace("bullet-") ===
            e.target?.name?.replace("tank-hitbox-") ||
          e.body?.name?.replace("cannon-") ===
            e.target?.name?.replace("tank-hitbox-") ||
          disableCollideNames.includes(e.body?.name) ||
          (e.body?.name.includes("tank-hitbox-") &&
            e.target?.name.includes("tank-hitbox-")) ||
          e.body?.name.replace("cannonBlowUp-") ===
            e.target?.name.replace("tank-hitbox-") ||
          e.body?.name.replace("bulletBlowUp-") ===
            e.target?.name.replace("tank-hitbox-")
        )
          return;
        if (e.target.userData.healtyPoint <= 0) return;
        console.log(e.body);
        e.target.userData.healtyPoint -= e.body.userData.damage;
        console.warn("hit", {
          hitPoint: -e.body.userData.damage,
          healtyPoint: e.target.userData.healtyPoint,
        });
        dispatch(healthActions.decrease({ healCount: e.body.userData.damage }));
        if (e.target.userData?.healtyPoint <= 0) {
          setIsExplosion(true);
          socket.emit("dead", {
            killerId: e.body.name.replace("cannon-", ""),
          });
          dispatch(cameraActions.updateSpectatorMode(true));
          dispatch(cameraActions.update(1));
          console.warn("10 seconds later you will be respawned...");
          setTimeout(() => {
            setIsExplosion(false);
          }, 1500);
          setTimeout(() => {
            dispatch(cameraActions.updateSpectatorMode(false));
            dispatch(cameraActions.update(0));
            dispatch(healthActions.update({ healCount: 500 }));
            chassisBody.current.userData.healtyPoint = 500;
            chassisApi.position.set(-1.5, 2, 3);
            chassisApi.rotation.set(0, 0, 0);
            chassisApi.velocity.set(0, 0, 0);
            chassisApi.angularVelocity.set(0, 0, 0);
            console.warn("respawned...");
          }, 10 * 1000);
        }
      },
    }),
    useRef(null)
  );

  const [wheels, wheelInfos]: any = useWheels(
    width,
    height,
    front,
    wheelRadius
  );
  const [vehicle, vehicleApi]: any = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useEffect(() => {
    if (spectatorMode) return;
    const threshold = 0.005;
    let intervalPositionID: any = null;
    let intervalQuanternionID: any = null;

    const handlePositionChange = (newPosition: any) => {
      const target: any = new Vector3();

      chassisBody.current.getWorldPosition(target);
      dispatch(
        tanksPositionActions.updatePosition([target.x, target.y, target.z])
      );
      const dx = newPosition[0] - target.x;
      const dy = newPosition[1] - target.y;
      const dz = newPosition[2] - target.z;

      if (
        Math.abs(dx) < threshold &&
        Math.abs(dy) < threshold &&
        Math.abs(dz) < threshold
      ) {
        return;
      }
      socket.emit("position", {
        x: target.x,
        y: target.y,
        z: target.z,
      });
    };
    const handleQuaternionChange = (newPosition: any) => {
      const target: any = new Quaternion();
      chassisBody.current.getWorldQuaternion(target);

      const dx = newPosition[0] - target.x;
      const dy = newPosition[1] - target.y;
      const dz = newPosition[2] - target.z;
      const dw = newPosition[3] - target.w;

      if (
        Math.abs(dx) < threshold &&
        Math.abs(dy) < threshold &&
        Math.abs(dz) < threshold &&
        Math.abs(dw) < threshold
      ) {
        return;
      }
      socket.emit("quaternion", {
        x: target.x,
        y: target.y,
        z: target.z,
        w: target.w,
      });
    };

    const unsubscribePosition =
      chassisApi.position.subscribe(handlePositionChange);
    const unsubscribeQuaternion = chassisApi.quaternion.subscribe(
      handleQuaternionChange
    );

    intervalPositionID = setInterval(() => {
      const target: any = new Vector3();
      chassisBody.current.getWorldPosition(target);
      socket.emit("position", {
        x: target.x,
        y: target.y,
        z: target.z,
      });
    }, 250);

    intervalQuanternionID = setInterval(() => {
      const target: any = new Quaternion();
      chassisBody.current.getWorldQuaternion(target);
      socket.emit("quaternion", {
        x: target.x,
        y: target.y,
        z: target.z,
        w: target.w,
      });
    }, 250);
    return () => {
      unsubscribePosition();
      unsubscribeQuaternion();
      clearInterval(intervalPositionID);
      clearInterval(intervalQuanternionID);
    };
  }, [chassisApi, spectatorMode]);

  useEffect(() => {
    socket.on("set-name", (data: any) => {
      setName(data);
    });
    return () => {
      socket.off("set-name");
    };
  }, [socket]);

  return (
    <>
      <group ref={vehicle} name={"tank-" + id}>
        <Hitbox name={id} ref={chassisBody}>
          <Camera />
          <group position={[0, -0.5, 0]} name="group--646">
            <Turret id={id} />
            <Hull />
          </group>
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
          <group position={[0, 2, -0.1]} ref={nameRef} name="group--5565456">
            <mesh name="group--584465">
              <boxGeometry args={[3, 1, 0.2]} />
              <meshBasicMaterial
                color={0x000000}
                transparent={true}
                opacity={0.2}
              />
            </mesh>
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.2]}
            >
              {name}
            </Text>
          </group>
          {isExplosion && <Explosion />}
        </Hitbox>
        {wheels.map((wheel: any, index: number) => (
          <WheelDebug wheelRef={wheel} radius={wheelRadius} key={index} />
        ))}
      </group>
    </>
  );
};

const Camera = (props: any) => {
  const selectedCameraID = useAppSelector(state => state.camera.selectedID);
  return (
    <PerspectiveCamera
      position={[10, -10, 10]}
      makeDefault={selectedCameraID == 0}
      name="thirdPersonCamera-player"
    />
  );
};
export default Tank;
