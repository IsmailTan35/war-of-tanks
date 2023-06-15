import React from "react";
import Hull from "./Hull";
import MainGun from "./MainGun";
import Turret from "./Turret";
import Tracks from "./Tracks";

const Tank = () => {
  return (
    <>
      <mesh>
        <Turret />
        <Hull />
        <Tracks direction={"left"} />
        <Tracks direction={"right"} />
      </mesh>
    </>
  );
};

export default Tank;
