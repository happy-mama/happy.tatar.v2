import canvas from "@/styles/pages/canvas";
import CanvasController from "./controller";
import CanvasRender from "./render";
import HandleGlobalEvents from "./handler/global.events";
import HandleRectEvents from "./handler/rect.events";

const Canvas = () => {
  HandleRectEvents();

  HandleGlobalEvents();

  return (
    <canvas.container>
      <CanvasController />
      <CanvasRender />
    </canvas.container>
  );
};

export default Canvas;
