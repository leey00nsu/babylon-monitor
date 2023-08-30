import { Vector3, Color4, Texture, CubeTexture, Color3 } from "@babylonjs/core";
import { Engine, Scene, Skybox } from "react-babylonjs";
import RetroComputer from "./RetroComputer";
import { useRef, useCallback, useState, useEffect } from "react";

export const SceneTest = () => {
  const [_, setTexturesLoaded] = useState(false);
  const [zoom, setZoom] = useState(30);
  const cubeTextureRef = useRef<CubeTexture | undefined>(undefined);
  const cubeTextureCloneRef = useRef<CubeTexture | undefined>(undefined);

  const cubeTextureCallback = useCallback((node: CubeTexture | null) => {
    if (node) {
      cubeTextureRef.current = node;
      // console.log("hdrTexture", node);
      // hdrTexture = node;

      cubeTextureCloneRef.current = node.clone();
      cubeTextureCloneRef.current.name = "cloned texture";
      cubeTextureCloneRef.current.coordinatesMode = Texture.SKYBOX_MODE;

      setTexturesLoaded(true); // trigger render and props assignment
    }
  }, []);

  useEffect(() => {
    if (zoom > 6) {
      setZoom((prev) => prev - Math.abs(6 - zoom) * 0.001);
    }
  }, [zoom]);
  return (
    <div>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene
          environmentTexture={cubeTextureRef.current}
          clearColor={new Color4(1, 1, 1)}
        >
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={2.2}
            beta={Math.PI / 3}
            radius={zoom}
            lowerRadiusLimit={zoom}
            upperRadiusLimit={zoom}
            lowerBetaLimit={Math.PI / 8}
            upperBetaLimit={Math.PI / 3}
          />
          <hemisphericLight
            name="light1"
            intensity={0.3}
            direction={Vector3.Up()}
          />
          <cubeTexture
            ref={cubeTextureCallback}
            name="cubeTexture"
            rootUrl={"/environmentSpecular.env"}
            createPolynomials={true}
            format={undefined}
            prefiltered={true}
          />

          <box
            name="hdrSkybox"
            size={1000}
            infiniteDistance
            isPickable={false}
            ignoreCameraMaxZ
          >
            <pbrMaterial
              name="skybox"
              backFaceCulling={false}
              reflectionTexture={cubeTextureCloneRef.current}
              disableLighting={true}
              microSurface={0.7}
            />
          </box>

          <RetroComputer />
        </Scene>
      </Engine>
    </div>
  );
};
