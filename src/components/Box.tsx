import * as THREE from "three";
import React, { useRef, useState } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { BoxType, useLootBattlerStore } from "../store";

export function Box(props: { mesh: ThreeElements["mesh"]; box: BoxType }) {
  const setBoxClicked = useLootBattlerStore((state) => state.setBoxClicked);
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props.mesh}
      ref={ref}
      scale={props.box.clicked ? 2 : 3}
      onClick={(event) => setBoxClicked(props.box.id)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
