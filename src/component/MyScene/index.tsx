import React, { useContext, useEffect, useState } from "react";
import Ground from "@/component/3D/Ground";
import Rocks from "@/component/3D/Rocks";
import Tank from "@/component/Tank";
import Trees from "@/component/3D/Trees";
import { Physics } from "@react-three/cannon";
// import RemoteTank from "@/component/RemoteTank";
import { SocketContext } from "@/controller/Contex";
import { getRandomPosition } from "@/utils/getRandomPosition";
import BombardmentArea from "../3D/BombardmentArea";
import CustomHud from "../CustomHud";
import { cameraActions, tanksPositionActions, useAppDispatch } from "@/store";
import AiTank from "../AiTank";
import { SpotLight } from "@react-three/drei";
import { Object3D } from "three";
const MyScene = () => {
  const [target] = useState(new Object3D());
  const dispatch = useAppDispatch();
  const socket: any = useContext(SocketContext);

  const [user, setUser] = useState<any>([]);
  const [position, setPosition] = useState<any>(
    getRandomPosition(undefined, undefined, 2)
  );
  const [seed, setSeed] = useState<any>(null);
  useEffect(() => {
    if (!socket) return;
    socket.on("joined-user", (data: any) => {
      setUser((prev: any) => {
        return [...prev, { id: data.id, position: [0, 2, 0] }];
      });
      dispatch(cameraActions.mutationCamera(+1));
    });

    socket.on("left-user", (data: any) => {
      dispatch(tanksPositionActions.deleteRemotePosition(data.id));
      setUser((prev: any) => {
        return prev.filter((item: any) => item.id !== data.id);
      });
      dispatch(cameraActions.mutationCamera(-1));
    });

    socket.on("users", (data: any) => {
      setUser((prev: any) => {
        return data.map((item: any) => {
          return { id: item.id, position: [0, 2, 0], name: item.name };
        });
      });
      dispatch(cameraActions.updateMaxCamera(data.length));
    });

    socket.on("remote-set-name", (data: any) => {
      setUser((prev: any) => {
        return prev.map((item: any) => {
          if (item.id === data.id) {
            return { ...item, name: data.name };
          }
          return item;
        });
      });
    });
    socket.on("get-seed", (data: any) => {
      setSeed(data);
    });

    socket.emit("get-users");
    socket.emit("send-seed");

    return () => {
      socket.off("joined-user");
      socket.off("left-user");
      socket.off("users");
    };
  }, [socket]);
  async function attempt() {
    const customPosition = await getRandomPosition(undefined, undefined, 1);
    setPosition(customPosition);
  }
  useEffect(() => {
    attempt();
  }, []);

  return (
    <>
      <Physics
        broadphase="SAP"
        gravity={[0, -10, 0]}
        defaultContactMaterial={{
          contactEquationRelaxation: 4,
          friction: 1e-3,
          restitution: 0.01,
          contactEquationStiffness: 1e8,
          frictionEquationStiffness: 1e8,
          frictionEquationRelaxation: 3,
        }}
        iterations={10}
      >
        <Ground />

        <CustomHud />
        <AiTank idx={5} item={{ id: 5, position: [0, 2, 0], name: "ai" }} />
        <Tank position={position} />
        {/* {user.map((item: any, idx: number) => {
          return <RemoteTank key={idx} item={item} idx={idx} />;
        })} */}
        {seed ? (
          <>
            <Rocks {...{ setSeed, seed }} />
            <Trees {...{ setSeed, seed }} />
          </>
        ) : null}
        <BombardmentArea />
      </Physics>
    </>
  );
};

export default MyScene;
