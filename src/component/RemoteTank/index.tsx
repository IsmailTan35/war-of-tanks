import { useRemoteControls } from "@/hooks/useRemoteControls";
import { useWheels } from "@/hooks/useWheel";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import React, { useContext, useEffect, useRef, useState } from "react";
import Tracks from "../3D/Tracks";
import Hull from "../3D/Hull";
import Turret from "./Turret";
import { useFrame, useThree } from "@react-three/fiber";
import { WheelDebug } from "../3D/WheelDebug";
import { PerspectiveCamera, Text } from "@react-three/drei";
import HitBox from "../3D/HitBox";
import { useAppSelector } from "@/store";
import { MathUtils, Vector3 } from "three";
import { SocketContext } from "@/controller/Contex";
import Destroy from "../3D/Destory";

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
  const [isDestroyed, setIsDestroyed] = useState<boolean>(false);
  const socket: any = useContext(SocketContext);
  const { position = [0, 2, 0], item, idx } = props;
  const selectedCameraID = useAppSelector(state => state.camera.selectedID);
  const { spectatorMode } = useAppSelector(state => state.camera);
  const { scene } = useThree();
  const nameRef = useRef<any>(null);

  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      allowSleep: false,
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

  const [degreX, setDegreX] = useState(180);
  const [degreY, setDegreY] = useState(110);

  const handleMouseMove = (event: any) => {
    setDegreX(prv => prv - event.movementX * 0.2);
    setDegreY(prv => {
      const fixedData = prv - event.movementY * 2;
      const result = fixedData > 120 ? 120 : fixedData < 80 ? 80 : fixedData;
      return result;
    });
  };

  useEffect(() => {
    if (spectatorMode) return;
    if (!selectedCameraID || selectedCameraID !== idx + 1) return;
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [selectedCameraID, spectatorMode]);

  useFrame(({ camera }) => {
    //namebox rotation
    const cameraPosition = camera.position;
    const textRotation = Math.atan2(cameraPosition.x, cameraPosition.z);
    nameRef.current.rotation.y = textRotation;
  });

  useFrame(state => {
    if (!selectedCameraID || selectedCameraID !== idx + 1) return;
    if (!chassisBody.current) return;
    var target = new Vector3();
    chassisBody.current.getWorldPosition(target);
    var angle = MathUtils.degToRad(degreX);
    var angleY = MathUtils.degToRad(degreY);

    if (selectedCameraID === 0) return;
    var cameraDistance = 20;
    state.camera.position.set(0, 5, -cameraDistance);
    state.camera.position.applyAxisAngle(new Vector3(0, 1, 0), angle);
    state.camera.lookAt(target.x, target.y, target.z);
  });

  useEffect(() => {
    socket.on("remote-dead", (data: any) => {
      if (data.victimId === item.id) {
        setIsDestroyed(true);
        chassisBody.current.userData.isDestroyed = true;
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
          <Camera idx={idx} />
          <group position={[0, -0.5, 0]}>
            <Turret id={item.id} />
            <Hull />
          </group>
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
          <group position={[0, 3, -0.1]} ref={nameRef}>
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
          </group>
          {isDestroyed && <Destroy />}
        </HitBox>
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
      makeDefault={selectedCameraID === props.idx + 1}
      name="thirdPersonCamera"
    />
  );
};
export default RemoteTank;
