import Konva from "konva";
import { createContext } from "react";
import { Feature } from "./store";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Layer } from "konva/lib/Layer";

export type CanvasContext = {
  events: {
    global: {
      click: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseUp: (e: Konva.KonvaEventObject<MouseEvent>) => void;
    };
    rect: {
      mouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseUp: (e: Konva.KonvaEventObject<MouseEvent>) => void;
    };
  };
  draw: {
    rect: {
      raw: Feature;
      f: Shape<ShapeConfig> | null;
      startPos: {
        x: number;
        y: number;
      };
    };
  };
  utils: {
    getMousePos: (e: Konva.KonvaEventObject<MouseEvent>) => {
      x: number;
      y: number;
    };
    getLayer: (
      e: Konva.KonvaEventObject<MouseEvent>,
      id?: string
    ) => Layer | null;
  };
};

const canvasContext = createContext<CanvasContext>({
  events: {
    global: {
      click: () => {},
      mouseDown: () => {},
      mouseMove: () => {},
      mouseUp: () => {},
    },
    rect: {
      mouseDown: () => {},
      mouseMove: () => {},
      mouseUp: () => {},
    },
  },
  draw: {
    rect: {
      raw: {
        id: "draw-rect",
        name: "draw-rect",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f6af0c",
      },
      f: null,
      startPos: {
        x: 0,
        y: 0,
      },
    },
  },
  utils: {
    getMousePos: e => {
      const stage = e.target.getStage();

      if (stage) {
        const position = stage.getPointerPosition();

        if (position) {
          return position;
        }
      }

      return { x: 0, y: 0 };
    },
    getLayer: (e, id) => {
      const stage = e.target.getStage();

      if (!stage) return null;

      const layers = stage.getLayers();

      if (!layers) return null;

      if (id) {
        return layers.find(l => l.attrs.id == id) || null;
      }

      return layers[0];
    },
  },
});

export default canvasContext;
