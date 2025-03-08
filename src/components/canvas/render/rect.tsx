import { Rect } from "react-konva";
import { Feature } from "../store";

const RenderRect = (f: Feature, i: number) => {
  return (
    <Rect
      key={i}
      id={f.id}
      name={f.name}
      x={f.x}
      y={f.y}
      height={f.height}
      width={f.width}
      fill={f.fill}
    />
  );
};

export default RenderRect;
