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
  active: CanvasStore["tool"];
  onClick: (v: CanvasStore["tool"]) => void;
};

const Button = (p: props) => {
  return (
    <canvas.controlButton
      onClick={() => {
        p.onClick(p.type);
      }}
      $active={p.active == p.type}
    >
      <img src={SVG[`tool_${p.type}`]} />
    </canvas.controlButton>
  );
};

const CanvasController = () => {
  const canvasStore = useCanvasStore(({ tool, setTool }) => ({
    tool,
    setTool,
  }));

  const handleClick = (v: CanvasStore["tool"]) => {
    canvasStore.setTool(v);
  };

  return (
    <canvas.controlsWrapper>
      <canvas.controlsContainer>
        <Button
          onClick={handleClick}
          active={canvasStore.tool}
          type="pointer"
        />
        <Button onClick={handleClick} active={canvasStore.tool} type="rect" />
        <Button
          onClick={handleClick}
          active={canvasStore.tool}
          type="pointer"
        />
        <Button
          onClick={handleClick}
          active={canvasStore.tool}
          type="pointer"
        />
        <Button
          onClick={handleClick}
          active={canvasStore.tool}
          type="pointer"
        />
      </canvas.controlsContainer>
    </canvas.controlsWrapper>
  );
};

export default CanvasController;
