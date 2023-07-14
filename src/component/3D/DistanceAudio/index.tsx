import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper";
const DistanceAudio = (props: any) => {
  const { audioUrl } = props;
  const soundRef = useRef<any>();
  const { camera, scene } = useThree();

  useEffect(() => {
    if (!soundRef.current || !audioUrl) return;
    const target = new THREE.Vector3();
    soundRef.current.parent.getWorldPosition(target);
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.PositionalAudio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(audioUrl, function (buffer) {
      sound.setBuffer(buffer);
      sound.setRefDistance(150);
      sound.play();
    });
    const helper = new PositionalAudioHelper(sound, 0.1);
    sound.add(helper);

    const mesh = new THREE.Mesh();
    mesh.position.set(target.x, target.y, target.z);

    scene.add(mesh);
    mesh.add(sound);

    setTimeout(() => {
      camera.remove(listener);
      sound.setVolume(0);
    }, 1350);

    return () => {
      if (!soundRef.current) return;
      camera.remove(listener);
      scene.remove(soundRef.current);
    };
  }, [audioUrl]);

  return <mesh ref={soundRef}></mesh>;
};

export default DistanceAudio;
