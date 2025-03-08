import { useContext } from "react";

import canvasContext from "../ctx";
import useCanvasStore from "../store";

const HandleGlobalEvents = () => {
  const canvasCtx = useContext(canvasContext);
  const canvasStore = useCanvasStore();

  canvasCtx.events.global.click = e => {
    // console.log(e);

    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        break;
      default:
        console.warn("Unknown tool at global click", e, canvasStore, canvasCtx);
    }
  };

  canvasCtx.events.global.mouseDown = e => {
    // console.log("global mouseDown", e);

    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        canvasCtx.events.rect.mouseDown(e);
        break;
    }
  };
  canvasCtx.events.global.mouseMove = e => {
    // console.log("global mouseMove", e);

    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        canvasCtx.events.rect.mouseMove(e);
        break;
    }
  };
  canvasCtx.events.global.mouseUp = e => {
    // console.log("global mouseUp", e);

    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        canvasCtx.events.rect.mouseUp(e);
        break;
    }
  };
};

export default HandleGlobalEvents;
