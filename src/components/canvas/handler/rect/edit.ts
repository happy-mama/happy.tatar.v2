import { CanvasContext, CanvasPosition } from "../../ctx";
import { CanvasStore } from "../../store";

type props = {
  ctx: CanvasContext;
  store: CanvasStore;
};

const scale = (ctx: CanvasContext, position: CanvasPosition) => {
  switch (ctx.edit.border) {
    case "tl":
      ctx.shapes.rect.f.absolutePosition({
        x: position.x,
        y:
          ctx.edit.init.y +
          (ctx.edit.init.height -
            (ctx.edit.init.x + ctx.edit.init.width - position.x) /
              ctx.edit.scale),
      });
      ctx.shapes.rect.f.size({
        width: ctx.edit.init.x + ctx.edit.init.width - position.x,
        height:
          (ctx.edit.init.x + ctx.edit.init.width - position.x) / ctx.edit.scale,
      });

      break;
    case "tr":
      ctx.shapes.rect.f.y(
        ctx.edit.init.y +
          (ctx.edit.init.height -
            (position.x - ctx.edit.init.x) / ctx.edit.scale)
      );
      ctx.shapes.rect.f.size({
        width: position.x - ctx.edit.init.x,
        height: (position.x - ctx.edit.init.x) / ctx.edit.scale,
      });
      break;
    case "bl":
      ctx.shapes.rect.f.x(position.x);
      ctx.shapes.rect.f.size({
        width: ctx.edit.init.x - position.x + ctx.edit.init.width,
        height:
          (ctx.edit.init.x - position.x + ctx.edit.init.width) / ctx.edit.scale,
      });
      break;
    case "br":
      ctx.shapes.rect.f.size({
        width: position.x - ctx.edit.init.x,
        height: (position.x - ctx.edit.init.x) / ctx.edit.scale,
      });
      break;
    case "r":
      ctx.shapes.rect.f.width(position.x - ctx.edit.init.x);
      break;
    case "l":
      ctx.shapes.rect.f.x(position.x);
      ctx.shapes.rect.f.width(
        ctx.edit.init.x - position.x + ctx.edit.init.width
      );
      break;
    case "b":
      ctx.shapes.rect.f.height(position.y - ctx.edit.init.y);
      break;
    case "t":
      ctx.shapes.rect.f.height(
        ctx.edit.init.y + ctx.edit.init.height - position.y
      );
      ctx.shapes.rect.f.y(position.y);
      break;

    case "bg":
      ctx.shapes.rect.f.absolutePosition({
        x: position.x - ctx.edit.init.offset.x,
        y: position.y - ctx.edit.init.offset.y,
      });
      break;

    default:
      console.warn("Unable to process unknown border id", ctx.edit.border);
  }
};

const editRectEvents = (p: props) => {
  p.ctx.events.rect.click = () => {};

  p.ctx.events.rect.mouseDown = e => {
    if (!(e.target.attrs.id && e.target.attrs.id.startsWith("edit_"))) return;

    const shape = p.ctx.getShape(p.ctx.ref.layer.user, p.store.selected);

    if (!shape) return;

    const position = p.ctx.getMousePos(e);

    p.ctx.edit.scale = shape.width() / shape.height();
    p.ctx.edit.init.x = shape.x();
    p.ctx.edit.init.y = shape.y();
    p.ctx.edit.init.height = shape.height();
    p.ctx.edit.init.width = shape.width();
    p.ctx.edit.init.offset = {
      x: position.x - p.ctx.edit.init.x,
      y: position.y - p.ctx.edit.init.y,
    };

    const border = p.ctx.getRectBorder();
    p.ctx.setWidthHeightAll(border, 0, 0);

    p.ctx.edit.border = e.target.attrs.id.replace("edit_", "");
    p.ctx.shapes.rect.f = shape;
    p.ctx.edit.isEditing = true;
  };

  p.ctx.events.rect.mouseMove = e => {
    if (p.ctx.edit.isEditing) {
      const position = p.ctx.getMousePos(e);

      scale(p.ctx, position);
    }
  };

  p.ctx.events.rect.mouseUp = () => {
    if (p.ctx.edit.isEditing) {
      p.store.setFeature({
        id: p.store.selected,
        x: p.ctx.shapes.rect.f.x(),
        y: p.ctx.shapes.rect.f.y(),
        width: p.ctx.shapes.rect.f.width(),
        height: p.ctx.shapes.rect.f.height(),
      });

      p.ctx.edit.isEditing = false;

      const border = p.ctx.getRectBorder();
      const shape = p.ctx.getShape(p.ctx.ref.layer.user, p.store.selected);
      if (shape) p.ctx.setRectBorderOnFeature(border, shape);
    }
  };
};

export default editRectEvents;
