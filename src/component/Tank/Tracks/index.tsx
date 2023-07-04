import { Circle, Cylinder, Edges, Ring, Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";

const Tracks = (props: any) => {
  const [show, setShow] = React.useState(true);
  const { scene } = useThree();
  const { direction, radius = [0.6, 8] } = props;
  const ref = React.useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.x = 1.55;
    ref.current.rotation.z = 1.55;
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, [ref]);

  return (
    <>
      {show && (
        <mesh position={[direction == "left" ? 1.5 : -1.5, -0.5, 0]} ref={ref}>
          <mesh position={[-1.5, 0, 0]}>
            <Sphere args={radius}>
              <meshStandardMaterial color={0x222222} />
              <Edges color={"black"} />
            </Sphere>
          </mesh>
          <mesh position={[0, 0, 0]}>
            <Sphere args={radius}>
              <meshStandardMaterial color={0x222222} />
              <Edges color={"black"} />
            </Sphere>
          </mesh>
          <mesh position={[1.5, 0, 0]}>
            <Sphere args={radius}>
              <meshStandardMaterial color={0x222222} />
              <Edges color={"black"} />
            </Sphere>
          </mesh>
        </mesh>
      )}
    </>
  );
};

export default Tracks;
