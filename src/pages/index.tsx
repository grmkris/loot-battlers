import type { NextPage } from "next";
import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Box } from "../components/Box";
import { useLootBattlerStore } from "../store";

const Home: NextPage = () => {
  const boxes = useLootBattlerStore((state) => state.boxes);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Loot Battlers</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {boxes.map((box, index) => (
            <Box box={box} mesh={{ position: [-3.2 * index, 0, 0] }} />
          ))}
        </Canvas>
      </main>
    </div>
  );
};

export default Home;
