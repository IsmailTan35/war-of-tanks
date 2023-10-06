const getRandomPosition = (
  min: number = -240,
  max: number = 240,
  height: number = 4
): [number, number, number] => {
  const x = Math.random() * (max - min) + min;
  const y = height;
  const z = Math.random() * (max - min) + min;
  return [x, y, z];
};

const getRandomPositionInCircle = (
  radius: number = 240,
  height: number = 4
): [number, number, number] => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.sqrt(Math.random()) * radius;
  const x = distance * Math.cos(angle);
  const y = height;
  const z = distance * Math.sin(angle);
  return [x, y, z];
};
const getRandomPositionInSphere = (
  radius: number = 240
): [number, number, number] => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  return [x, y, z];
};
function customRandom(number: number) {
  var x = Math.sin(number) * 10000;
  return x - Math.floor(x);
}

interface IGetSeedRandomPosition {
  show: boolean;
  isDestroy?: boolean;
  position: [number, number, number];
}

const getSeedRandomPosition = (
  seed: number,
  min: number = -240,
  max: number = 240,
  height: number = 4
): IGetSeedRandomPosition => {
  const x = customRandom(seed + 1) * (max - min) + min;
  const y = height;
  const z = customRandom(seed + 2) * (max - min) + min;

  return {
    show: true,
    isDestroy: false,
    position: [x, y, z],
  };
};

export {
  getRandomPosition,
  getSeedRandomPosition,
  getRandomPositionInCircle,
  getRandomPositionInSphere,
};
