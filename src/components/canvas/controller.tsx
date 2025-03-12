import canvas from "@/styles/pages/canvas";

import tool_pointer from "./assets/tool_pointer.svg";
import tool_rect from "./assets/tool_rect.svg";
import useCanvasStore, { CanvasStore } from "./store";

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
  const canvasStore = useCanvasStore(({ tool, setTool, setMode }) => ({
    tool,
    setTool,
    setMode,
  }));

  const handleClick = (v: CanvasStore["tool"], m: CanvasStore["mode"]) => {
    canvasStore.setTool(v);
    canvasStore.setMode(m);
  };

  return (
    <canvas.controlsWrapper>
      <canvas.controlsContainer>
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
      </canvas.controlsContainer>
    </canvas.controlsWrapper>
  );
};

export default CanvasController;
