import { v4 as uuid } from "uuid";
import { Shape, ShapeConfig } from "konva/lib/Shape";

import { CanvasContext } from "../../ctx";
import { CanvasStore } from "../../store";

type props = {
  ctx: CanvasContext;
  store: CanvasStore;
};

const drawRectEvents = (p: props) => {
  p.ctx.events.rect.mouseDown = e => {
    if (e.target && !p.ctx.draw.isDrawing) {
      const position = p.ctx.getMousePos(e);

      p.ctx.draw.init.position.x = position.x;
      p.ctx.draw.init.position.y = position.y;

      const shape = p.ctx.getShape(
        p.ctx.ref.layer.shape,
        p.ctx.shapes.rect.raw.id
      );

      if (!shape) return;

      shape.absolutePosition({ x: position.x, y: position.y });

      p.ctx.draw.isDrawing = true;
      p.ctx.shapes.rect.f = shape as Shape<ShapeConfig>;
    }
  };
  p.ctx.events.rect.mouseMove = e => {
    if (p.ctx.draw.isDrawing) {
      const position = p.ctx.getMousePos(e);

      p.ctx.shapes.rect.f.size({
        width: position.x - p.ctx.draw.init.position.x,
        height: position.y - p.ctx.draw.init.position.y,
      });
    }
  };
  p.ctx.events.rect.mouseUp = () => {
    if (p.ctx.draw.isDrawing) {
      p.store.setFeature({
        id: uuid(),
        type: "rect",
        name: "jopus",
        x: p.ctx.draw.init.position.x,
        y: p.ctx.draw.init.position.y,
        width: p.ctx.shapes.rect.f.width(),
        height: p.ctx.shapes.rect.f.height(),
        fill: "#000",
      });

      p.ctx.shapes.rect.f.absolutePosition({ x: 0, y: 0 });
      p.ctx.shapes.rect.f.height(0);
      p.ctx.shapes.rect.f.width(0);

      p.ctx.draw.isDrawing = false;
    }
  };
};

export default drawRectEvents;
