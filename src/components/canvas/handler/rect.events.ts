import { useContext } from "react";
import { v4 as uuid } from "uuid";

import canvasContext from "../ctx";
import useCanvasStore from "../store";
import { Shape, ShapeConfig } from "konva/lib/Shape";

const HandleRectEvents = () => {
  const canvasCtx = useContext(canvasContext);
  const canvasStore = useCanvasStore();

  canvasCtx.events.rect.mouseDown = e => {
    if (e.target) {
      const position = canvasCtx.utils.getMousePos(e);

      canvasCtx.draw.rect.startPos.x = position.x;
      canvasCtx.draw.rect.startPos.y = position.y;

      const drawLayer = canvasCtx.utils.getLayer(e, "draw");

      if (!drawLayer) return;

      const shape = drawLayer.children.find(
        s => s.attrs.id == canvasCtx.draw.rect.raw.id
      );

      if (!shape) return;

      shape.absolutePosition({ x: position.x, y: position.y });

      canvasCtx.draw.rect.f = shape as Shape<ShapeConfig>;
    }
  };
  canvasCtx.events.rect.mouseMove = e => {
    if (canvasCtx.draw.rect.f) {
      const position = canvasCtx.utils.getMousePos(e);

      canvasCtx.draw.rect.f.height(position.y - canvasCtx.draw.rect.startPos.y);
      canvasCtx.draw.rect.f.width(position.x - canvasCtx.draw.rect.startPos.x);
    }
  };
  canvasCtx.events.rect.mouseUp = () => {
    if (canvasCtx.draw.rect.f) {
      canvasStore.setFeature({
        id: uuid(),
        type: "rect",
        name: "jopus",
        x: canvasCtx.draw.rect.startPos.x,
        y: canvasCtx.draw.rect.startPos.y,
        width: canvasCtx.draw.rect.f.width()!,
        height: canvasCtx.draw.rect.f.height()!,
        fill: "#000",
      });

      canvasCtx.draw.rect.f.absolutePosition({ x: 0, y: 0 });
      canvasCtx.draw.rect.f.height(0);
      canvasCtx.draw.rect.f.width(0);

      canvasCtx.draw.rect.f = null;
    }
  };
};

export default HandleRectEvents;
