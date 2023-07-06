import React, { useContext, useEffect, useRef, useState } from "react";
import Hull from "./Hull";
import Turret from "./Turret";
import Tracks from "./Tracks";
import { PerspectiveCamera } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "@/hooks/useWheel";
import { useControls } from "@/hooks/useControls";
import { WheelDebug } from "../WheelDebug";
import { Quaternion, Vector3 } from "three";
import { SocketContext } from "@/controller/Contex";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { tanksPositionActions, useAppDispatch } from "@/store";
import Hitbox from "../HitBox";

const Tank = (props: any) => {
  const { position } = props;
  const socket: any = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<any>("");
  const nameRef = useRef<any>(null);
  const width = 3;
  const height = 1;
  const front = 1.5;
  const wheelRadius = 0.5;

  const chassisBodyArgs: any = [width, height, front * 2];
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
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
    }, 1500);
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
  }, [chassisApi]);

  useFrame(({ camera }) => {
    const cameraPosition = camera.position;
    const textRotation = Math.atan2(cameraPosition.x, cameraPosition.z);
    nameRef.current.rotation.y = textRotation;
  });

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
      <group ref={vehicle} name="tank">
        <group ref={chassisBody} name="tank-body">
          <boxGeometry args={chassisBodyArgs} />
          <meshBasicMaterial
            transparent={true}
            opacity={0.25}
            color={"black"}
          />
          <Hitbox name={"player"} />
          <Camera />
          <Turret />
          <Hull />
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
          <group position={[0, 3, -0.1]} ref={nameRef}>
            <mesh>
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
        </group>

        <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[4]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[5]} radius={wheelRadius} />
      </group>
    </>
  );
};

const Camera = (props: any) => {
  return (
    <PerspectiveCamera
      position={[10, -10, 10]}
      makeDefault
      name="thirdPersonCamera"
    />
  );
};
export default Tank;
