import React, { useEffect, useRef, useState } from "react";
import Connon from "./Connon";
const Weaponry = (props: any) => {
  const { connonAmmo = 5, degreX, degreY } = props;
  const [ammo, setAmmo] = useState<number>(0);
  useEffect(() => {
    let intervalId: any;
    let timeoutId: any;
    let timer: any;
    window.addEventListener("click", e => {
      if (e.button !== 0) return;
      if (timer) return;
      // console.info(`stand by...(${timer} seconds.)`);
      setAmmo(prv => prv + 1);
      timer = 2.5;
      intervalId = setInterval((e: any) => {
        timer = timer - 0.5;
        if (!timer || timer <= 0) timer = null;
      }, 500);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        // console.info("Döngü durdu.");
      }, 2500);
    });
    return () => {
      window.removeEventListener("click", () => {});
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      timer = null;
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
