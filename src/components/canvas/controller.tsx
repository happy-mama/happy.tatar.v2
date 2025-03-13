import { useContext } from "react";

import canvas from "@/styles/pages/canvas";
import utils from "@/styles/utils";
import tool_pointer from "./assets/tool_pointer.svg";
import tool_rect from "./assets/tool_rect.svg";
import useCanvasStore, { CanvasStore } from "./store";
import canvasContext from "./ctx";
import ColorPicker from "./components/colorPicker";

const SVG = {
  tool_pointer,
  tool_rect,
};

type props = {
  type: CanvasStore["tool"];
  mode: CanvasStore["mode"];
  active: CanvasStore["tool"];
  onClick: (v: CanvasStore["tool"], m: CanvasStore["mode"]) => void;
};

const Button = (p: props) => {
  return (
    <canvas.controlButton
      onClick={() => {
        p.onClick(p.type, p.mode);
      }}
      $active={p.active == p.type}
    >
      <img src={SVG[`tool_${p.type}`]} />
    </canvas.controlButton>
  );
};

const CanvasController = () => {
  const canvasStore = useCanvasStore();

  const canvasCtx = useContext(canvasContext);

  const handleClick = (v: CanvasStore["tool"], m: CanvasStore["mode"]) => {
    canvasStore.setTool(v);
    canvasStore.setMode(m);
    canvasStore.setSelected("");
  };

  const handleColorChange = (color: string) => {
    if (canvasStore.selected) {
      canvasStore.setFeature({ id: canvasStore.selected, fill: color });
    } else {
      canvasCtx.draw.fill = color;
    }
  };

  const colorPickerColor = canvasStore.selected
    ? canvasStore.features[canvasStore.selected].fill
    : canvasCtx.draw.fill;

  return (
    <canvas.controlWrapper>
      <canvas.controlContainer>
        <Button
          onClick={handleClick}
          active={canvasStore.tool}
          type="pointer"
          mode="none"
        />
        <Button
          onClick={handleClick}
          active={canvasStore.tool}
          type="rect"
          mode="draw"
        />
      </canvas.controlContainer>
      <canvas.controlContainer $hide={canvasStore.tool == "pointer"}>
        <ColorPicker value={colorPickerColor} onChange={handleColorChange} />
        <utils.liner $height="30px" />
      </canvas.controlContainer>
    </canvas.controlWrapper>
  );
};

export default CanvasController;
