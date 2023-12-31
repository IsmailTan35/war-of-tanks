import { useRemoteControls } from "@/hooks/useRemoteControls";
import { useWheels } from "@/hooks/useWheel";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import Tracks from "../3D/Tracks";
import Hull from "../3D/Hull";
import Turret from "./Turret";
import { useFrame, useThree } from "@react-three/fiber";
import { WheelDebug } from "../3D/WheelDebug";
import { PerspectiveCamera, Text } from "@react-three/drei";
import HitBox from "../3D/HitBox";
import { useAppSelector } from "@/store";
import { Vector3 } from "three";
import { SocketContext } from "@/controller/Contex";
import Explosion from "../3D/Explosion";

const width = 3.5;
const height = 3;
const front = 2.5;
const wheelRadius = 0.5;
const chassisBodyArgs: any = [width, height, front * 2];

interface IRemoteTank {
  position?: [number, number, number];
  item: any;
  idx: number;
}
const RemoteTank = (props: IRemoteTank) => {
  const [isExplosion, setIsExplosion] = useState<boolean>(false);
  const socket: any = useContext(SocketContext);
  const { position = [0, 2, 0], item, idx } = props;
  const selectedCameraID = useAppSelector(state => state.camera.selectedID);
  const { scene } = useThree();
  const nameRef = useRef<any>(null);
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      allowSleep: true,
      args: chassisBodyArgs,
      mass: 1500,
      position: position,
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

  useEffect(() => {
    chassisApi.name = "tank-hitbox-" + item.id;
  }, [item.id]);

  useRemoteControls(vehicleApi, chassisApi);

  useEffect(() => {
    return () => {
      scene.remove(chassisBody.current);
    };
  }, []);

  useFrame(state => {
    if (!selectedCameraID || selectedCameraID !== idx + 1) return;
    if (!chassisBody.current) return;
    var target = new Vector3();
    chassisBody.current.getWorldPosition(target);
  });

  useEffect(() => {
    socket.on("remote-dead", (data: any) => {
      if (data.victimId === item.id) {
        setIsExplosion(true);
        chassisBody.current.userData.isDestroyed = true;
        setTimeout(() => {
          setIsExplosion(false);
        }, 1500);
      }
    });
    return () => {
      socket.off("remote-dead");
    };
  }, []);

  return (
    <>
      <group ref={vehicle} name={"tank" + item.id}>
        <HitBox ref={chassisBody} name={item.id}>
          <Camera {...{ idx, id: item.id }} />
          <mesh position={[0, -0.5, 0]}>
            <Turret id={item.id} {...{ idx }} />
            <Hull />
          </mesh>
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
          <mesh position={[0, 3, -0.1]} ref={nameRef}>
            <mesh>
              <boxGeometry args={[3, 1, 0.2]} />
              <meshBasicMaterial color="red" />
            </mesh>
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.2]}
            >
              {item.name}
            </Text>
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, -0.2]}
              rotation={[0, Math.PI, 0]}
            >
              {item.name}
            </Text>
          </mesh>
          {isExplosion && <Explosion />}
        </HitBox>
        {wheels.map((wheel: any, index: number) => (
          <WheelDebug wheelRef={wheel} radius={wheelRadius} key={index} />
        ))}
      </group>
    </>
  );
};

const Camera = (props: any) => {
  const cameraRef = useRef<any>(null);
  const { idx, id } = props;
  const selectedCameraID = useAppSelector(state => state.camera.selectedID);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      position={[10, -10, 10]}
      makeDefault={selectedCameraID === idx + 1}
      name={"thirdPersonCamera-ai-" + id}
    />
  );
};

export default RemoteTank;
