import React, { memo, useEffect, useState } from "react";
import Rock from "./Rock";
import { getSeedRandomPosition } from "@/utils/getRandomPosition";

const Rocks = (props: any) => {
  const { seed } = props;
  const [rocksArr, setRocksArr] = useState<any[]>([]);
  useEffect(() => {
    const rocks = Array.from({ length: 100 }, (_, index) =>
      getSeedRandomPosition(2 * seed + index, undefined, undefined, 2.5)
    );
    setRocksArr(rocks);
  }, [seed]);
  return (
    <>
      {rocksArr.length >= 0
        ? rocksArr.map((position, index) => (
            <Rock key={index} {...{ position }} idx={index} />
          ))
        : null}
    </>
  );
};

export default memo(Rocks);
