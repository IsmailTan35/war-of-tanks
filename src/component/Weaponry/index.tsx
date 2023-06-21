import React, { useEffect, useRef } from "react";
import Connon from "./Connon";
const Weaponry = (props: any) => {
  const { connonAmmo = 5, degreX, degreY } = props;
  const [ammo, setAmmo] = React.useState<number>(0);
  useEffect(() => {
    window.addEventListener("click", () => {
      setAmmo(prv => prv + 1);
    });
    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <>
      {Array.from({ length: ammo }, (_, index) => (
        <Connon key={index} layer={index} {...{ degreX, degreY }} />
      ))}
    </>
  );
};

export default Weaponry;
