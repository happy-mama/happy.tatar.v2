import { useContext, useEffect } from "react";

import canvasContext from "../../ctx";
import useCanvasStore from "../../store";
import drawRectEvents from "./draw";
import editRectEvents from "./edit";
import noneRectEvents from "./none";

const HandleRectEvents = () => {
  const canvasCtx = useContext(canvasContext);
  const canvasStore = useCanvasStore();

  useEffect(() => {
    switch (canvasStore.mode) {
      case "none":
        noneRectEvents({ ctx: canvasCtx, store: canvasStore });
        break;
      case "draw":
        drawRectEvents({ ctx: canvasCtx, store: canvasStore });
        break;
      case "edit":
        editRectEvents({ ctx: canvasCtx, store: canvasStore });
        break;
    }
  }, [canvasCtx, canvasStore]);
};

export default HandleRectEvents;
