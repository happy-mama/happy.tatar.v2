import { Layer, Stage } from "react-konva";
import { useContext, useLayoutEffect, useMemo, useRef } from "react";

import { Layer as ILayer } from "konva/lib/Layer";

import useCanvasStore, { Feature } from "../store";
import RenderRect from "./rect";
import canvasContext from "../ctx";
import globals from "@/styles/globals";

const renderFeature = (f: Feature, i: number) => {
  switch (f.type) {
    case "rect":
      return RenderRect(f, i);
    default: {
      console.warn("Unable to render feature, unknown type", f);
      return <></>;
    }
  }
};

const CanvasRender = () => {
  const canvasStore = useCanvasStore(({ features }) => ({
    features,
  }));

  const canvasCtx = useContext(canvasContext);

  const renderedUserObjectsJSX = useMemo(
    () =>
      Object.values(canvasStore.features).map((f, i) => renderFeature(f, i)),
    [canvasStore.features]
  );

  const renderedShapeObjectsJSX = useMemo(
    () =>
      Object.values(canvasCtx.shapes).map((f, i) => renderFeature(f.raw, i)),
    [canvasCtx.shapes]
  );

  const userLayerRef = useRef<ILayer>(null);
  const shapeLayerRef = useRef<ILayer>(null);

  useLayoutEffect(() => {
    canvasCtx.ref.layer.shape = shapeLayerRef.current!;
    canvasCtx.ref.layer.user = userLayerRef.current!;
  }, [canvasCtx.ref.layer]);

  return (
    <Stage
      width={window.innerWidth}
      height={
        window.innerHeight -
        Number(globals.size.height.header.replace("px", ""))
      }
      onClick={canvasCtx.events.global.click}
      onMouseDown={canvasCtx.events.global.mouseDown}
      onMouseMove={canvasCtx.events.global.mouseMove}
      onMouseUp={canvasCtx.events.global.mouseUp}
    >
      <Layer ref={userLayerRef} id="user">
        {renderedUserObjectsJSX}
      </Layer>
      <Layer ref={shapeLayerRef} id="shape">
        {renderedShapeObjectsJSX}
      </Layer>
    </Stage>
  );
};

export default CanvasRender;
