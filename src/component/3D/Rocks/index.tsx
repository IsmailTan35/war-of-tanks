import React, { memo, useEffect, useState } from "react";
import Rock from "./Rock";
import { getSeedRandomPosition } from "@/utils/getRandomPosition";
import { useAppSelector } from "@/store";

function calculateDistance(point1: any, point2: any) {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  const dz = point2[2] - point1[2];

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const Rocks = (props: any) => {
  const { seed } = props;
  const user = useAppSelector(state => state.tanksPosition.player);

  const [rocksArr, setRocksArr] = useState<any[]>([]);
  const [check, setCheck] = useState<boolean>(true);
  const [firstCheck, setFirstCheck] = useState<boolean>(false);
  useEffect(() => {
    const rocks = Array.from({ length: 100 }, (_, index) =>
      getSeedRandomPosition(2 * seed + index, undefined, undefined, 2.5)
    );
    setRocksArr(rocks);
  }, [seed]);
  useEffect(() => {
    let timeoutID: any;
    if (!check || rocksArr.length == 0 || !user || !firstCheck) {
      timeoutID = setTimeout(() => {
        setCheck(!check);
      }, 2500);
      return;
    }
    const trees = rocksArr.map(item => {
      const distance = calculateDistance(item.position, user);
      if (distance > 200) {
        return {
          ...item,
          show: false,
        };
      }
      return {
        ...item,
        show: true,
      };
    });
    setRocksArr(trees);
    setCheck(false);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [check]);

  useEffect(() => {
    setTimeout(() => {
      setFirstCheck(true);
    }, 5000);
  }, []);
  return (
    <>
      {rocksArr.length >= 0
        ? rocksArr.map(
            (item, index) =>
              !item.isDestroy && (
                <Rock
                  key={index}
                  {...{ position: item.position, setRocksArr, show: item.show }}
                  idx={index}
                />
              )
          )
        : null}
    </>
  );
};

export default memo(Rocks);
