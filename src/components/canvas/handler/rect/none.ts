import { CanvasContext } from "../../ctx";
import { CanvasStore } from "../../store";

type props = {
  ctx: CanvasContext;
  store: CanvasStore;
};

const noneRectEvents = (p: props) => {
  p.ctx.events.rect.click = () => {};
  p.ctx.events.rect.mouseDown = () => {};
  p.ctx.events.rect.mouseMove = () => {};
  p.ctx.events.rect.mouseUp = () => {};
};

export default noneRectEvents;
