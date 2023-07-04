import React, { Suspense, useContext, useEffect, useState } from "react";
import Ground from "@/component/Ground";
import Rocks from "@/component/Rocks";
import Tank from "@/component/Tank";
import Trees from "@/component/Trees";
import { Physics } from "@react-three/cannon";
import RemoteTank from "@/component/RemoteTank";
import { SocketContext } from "@/controller/Contex";
import getRandomPosition from "@/utils/getRandomPosition";
import { useThree } from "@react-three/fiber";
import SmokeParticles from "../SmokeParticles";
import BombardmentArea from "../BombardmentArea";

const MyScene = () => {
  const { scene }: any = useThree();
  const socket: any = useContext(SocketContext);
  const [user, setUser] = useState<any>([]);
  const [position, setPosition] = useState<any>(
    getRandomPosition(undefined, undefined, 1)
  );
  useEffect(() => {
    if (!socket) return;
    socket.on("joined-user", (data: any) => {
      setUser((prev: any) => {
        return [...prev, { id: data.id, position: [0, 1, 0] }];
      });
    });

    socket.on("left-user", (data: any) => {
      setUser((prev: any) => {
        return prev.filter((item: any) => item.id !== data.id);
      });
    });

    socket.on("users", (data: any) => {
      setUser((prev: any) => {
        return data.map((item: any) => {
          return { id: item.id, position: [0, 1, 0], name: item.name };
        });
      });
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
    socket.emit("get-users");

    return () => {
      socket.off("joined-user");
      socket.off("left-user");
      socket.off("users");
    };
  }, [socket]);
  useEffect(() => {
    const customPosition = getRandomPosition(undefined, undefined, 1);
    setPosition(customPosition);
  }, []);

  return (
    <>
      <Physics broadphase="SAP" gravity={[0, -10, 0]}>
        <ambientLight intensity={0.3} />
        <directionalLight intensity={0.8} position={[5, 10, 5]} castShadow />
        <Ground />

        <Tank position={position} />
        {user.map((item: any, idx: number) => {
          return <RemoteTank key={idx} item={item} />;
        })}
        <Trees />
        <Rocks />
        <BombardmentArea />
        <Suspense fallback={null}>
          <SmokeParticles />
        </Suspense>
      </Physics>
    </>
  );
};

export default MyScene;
