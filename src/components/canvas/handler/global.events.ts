import { useContext } from "react";

import canvasContext from "../ctx";
import useCanvasStore from "../store";

const HandleGlobalEvents = () => {
  const canvasCtx = useContext(canvasContext);
  const canvasStore = useCanvasStore();

  canvasCtx.events.global.click = e => {
    // console.log("click");

    if (!(canvasCtx.draw.isDrawing || canvasCtx.edit.isEditing)) {
      if (!e.target.className) {
        canvasStore.setMode("none");
        canvasStore.setTool("pointer");
        canvasStore.setSelected("");
      }

      if (
        canvasStore.selected &&
        e.target.attrs.id !== canvasStore.features[canvasStore.selected].id
      ) {
        canvasStore.setMode("none");
        canvasStore.setTool("pointer");
        canvasStore.setSelected("");
      }
    }

    switch (canvasStore.tool) {
      case "pointer":
        if (e.target.className == "Rect") {
          canvasStore.setMode("edit");
          canvasStore.setTool("rect");
          canvasStore.setSelected(e.target.attrs.id);
        }
        break;
      case "rect":
        break;
      default:
        console.warn("Unknown tool at global click", e, canvasStore, canvasCtx);
    }
  };

  canvasCtx.events.global.mouseDown = e => {
    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        canvasCtx.events.rect.mouseDown(e);
        break;
      default:
        console.warn(
          "Unknown tool at global mouseDown",
          e,
          canvasStore,
          canvasCtx
        );
    }
  };
  canvasCtx.events.global.mouseMove = e => {
    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        canvasCtx.events.rect.mouseMove(e);
        break;
      default:
        console.warn(
          "Unknown tool at global mouseMove",
          e,
          canvasStore,
          canvasCtx
        );
    }
  };
  canvasCtx.events.global.mouseUp = e => {
    switch (canvasStore.tool) {
      case "pointer":
        break;
      case "rect":
        canvasCtx.events.rect.mouseUp(e);
        break;
      default:
        console.warn(
          "Unknown tool at global mouseUp",
          e,
          canvasStore,
          canvasCtx
        );
    }
  };
};

export default HandleGlobalEvents;
