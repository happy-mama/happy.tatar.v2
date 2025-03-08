import { Layer, Stage } from "react-konva";
import { useContext, useMemo } from "react";

import useCanvasStore, { Feature } from "../store";
import RenderRect from "./rect";
import canvasContext from "../ctx";

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

  const renderedDrawObjectsJSX = useMemo(
    () => Object.values(canvasCtx.draw).map((f, i) => renderFeature(f.raw, i)),
    [canvasCtx.draw]
  );

  console.log(canvasStore.features);

  return (
    <Stage
      width={window.innerWidth - 50}
      height={window.innerHeight - 90}
      onClick={canvasCtx.events.global.click}
      onMouseDown={canvasCtx.events.global.mouseDown}
      onMouseMove={canvasCtx.events.global.mouseMove}
      onMouseUp={canvasCtx.events.global.mouseUp}
    >
      <Layer id="user">{renderedUserObjectsJSX}</Layer>
      <Layer id="draw">{renderedDrawObjectsJSX}</Layer>
    </Stage>
  );
};

export default CanvasRender;
