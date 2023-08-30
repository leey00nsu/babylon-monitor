import { Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import { Suspense } from "react";
import { Model } from "react-babylonjs";

const RetroComputer = () => {
  return (
    <Suspense fallback={<></>}>
      <Model
        name="retro-computer"
        position={new Vector3(0.3, 0, 0)}
        rootUrl="/"
        scaling={new Vector3(0.05, 0.05, 0.05)}
        sceneFilename="retro_computer.glb"
      ></Model>
    </Suspense>
  );
};

export default RetroComputer;
