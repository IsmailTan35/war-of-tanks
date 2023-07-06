import { SocketContext } from "@/controller/Contex";
import { useBox } from "@react-three/cannon";
import React, { useContext } from "react";

const cannonName = {
  player: "remote-cannon",
  remotePlayer: "cannon",
};

interface IHitbox {
  name: "player" | "remotePlayer";
}

const Hitbox = (props: IHitbox) => {
  const socket: any = useContext(SocketContext);
  const { name } = props;
  const [refHitbox, apiHitbox]: any = useBox(() => ({
    type: "Static",
    args: [3, 2, 5],
    position: [0, 0.5, 0],
    onCollide: (e: any) => {
      if (e.body.name == "remote-cannon" && name == "player") {
        console.log("hit");
        // socket.emit("hit");
      }
    },
  }));

  return (
    <>
      <mesh name="tank-hitbox" ref={refHitbox}>
        {/* <boxGeometry args={[3, 2, 5]} />
        <meshStandardMaterial
          color={0x000000}
          transparent={true}
          opacity={0.2}
        /> */}
      </mesh>
    </>
  );
};

export default Hitbox;
