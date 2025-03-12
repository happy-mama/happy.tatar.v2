import Konva from "konva";
import { createContext } from "react";
import { Feature } from "./store";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Layer } from "konva/lib/Layer";
import DEFAULT from "./default";

export type EditShapes = {
  tr: Shape<ShapeConfig>;
  r: Shape<ShapeConfig>;
  br: Shape<ShapeConfig>;
  b: Shape<ShapeConfig>;
  bl: Shape<ShapeConfig>;
  l: Shape<ShapeConfig>;
  tl: Shape<ShapeConfig>;
  t: Shape<ShapeConfig>;
  bg: Shape<ShapeConfig>;
};

export type CanvasPosition = {
  x: number;
  y: number;
};

export type CanvasSize = {
  width: number;
  height: number;
};

export type CanvasContext = {
  events: {
    global: {
      click: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseUp: (e: Konva.KonvaEventObject<MouseEvent>) => void;
    };
    rect: {
      click: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
      mouseUp: (e: Konva.KonvaEventObject<MouseEvent>) => void;
    };
  };
  shapes: {
    [key: string]: {
      raw: Feature;
      f: Shape<ShapeConfig>;
    };
  };
  draw: {
    init: {
      position: CanvasPosition;
    };
    isDrawing: boolean;
  };
  edit: {
    border: keyof EditShapes;
    isEditing: boolean;
    init: {
      position: CanvasPosition;
      offset: CanvasPosition;
      x: number;
      y: number;
      width: number;
      height: number;
    };
    scale: number;
  };
  ref: {
    layer: {
      user: Layer;
      shape: Layer;
    };
  };
  getMousePos: (e: Konva.KonvaEventObject<MouseEvent>) => CanvasPosition;
  getLayer: (
    e: Konva.KonvaEventObject<MouseEvent>,
    id?: string
  ) => Layer | null;
  getShape: (l: Layer, id: string) => Shape<ShapeConfig> | null;
  getRectBorder: () => EditShapes;
  setRectBorderOnFeature: (b: EditShapes, f: Shape<ShapeConfig>) => void;
  setWidthHeightAll: (
    d: { [key: string]: Shape<ShapeConfig> },
    w: number,
    h: number
  ) => void;
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
      click: () => {},
      mouseDown: () => {},
      mouseMove: () => {},
      mouseUp: () => {},
    },
  },
  shapes: DEFAULT.shapes,
  draw: {
    init: {
      position: {
        x: 0,
        y: 0,
      },
    },
    isDrawing: false,
  },
  edit: {
    border: "b",
    isEditing: false,
    init: {
      position: {
        x: 0,
        y: 0,
      },
      offset: {
        x: 0,
        y: 0,
      },
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    scale: 0,
  },
  ref: {
    layer: {
      // @ts-expect-error necessary evil
      shape: null,
      // @ts-expect-error necessary evil
      user: null,
    },
  },
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
  getShape: (l, id) => {
    return l.children.find(i => i.attrs.id == id) as Shape<ShapeConfig>;
  },
  getRectBorder: function () {
    return {
      tr: this.getShape(this.ref.layer.shape, this.shapes.edit_tr.raw.id)!,
      r: this.getShape(this.ref.layer.shape, this.shapes.edit_r.raw.id)!,
      br: this.getShape(this.ref.layer.shape, this.shapes.edit_br.raw.id)!,
      b: this.getShape(this.ref.layer.shape, this.shapes.edit_b.raw.id)!,
      bl: this.getShape(this.ref.layer.shape, this.shapes.edit_bl.raw.id)!,
      l: this.getShape(this.ref.layer.shape, this.shapes.edit_l.raw.id)!,
      tl: this.getShape(this.ref.layer.shape, this.shapes.edit_tl.raw.id)!,
      t: this.getShape(this.ref.layer.shape, this.shapes.edit_t.raw.id)!,
      bg: this.getShape(this.ref.layer.shape, this.shapes.edit_bg.raw.id)!,
    };
  },
  setRectBorderOnFeature: function (editShapes, f) {
    this.setWidthHeightAll(editShapes, 10, 10);

    editShapes.t.absolutePosition({
      x: f.x() + f.width() / 2,
      y: f.y(),
    });
    editShapes.tr.absolutePosition({
      x: f.x() + f.width(),
      y: f.y(),
    });
    editShapes.r.absolutePosition({
      x: f.x() + f.width(),
      y: f.y() + f.height() / 2,
    });
    editShapes.br.absolutePosition({
      x: f.x() + f.width(),
      y: f.y() + f.height(),
    });
    editShapes.b.absolutePosition({
      x: f.x() + f.width() / 2,
      y: f.y() + f.height(),
    });
    editShapes.bl.absolutePosition({
      x: f.x(),
      y: f.y() + f.height(),
    });
    editShapes.l.absolutePosition({
      x: f.x(),
      y: f.y() + f.height() / 2,
    });
    editShapes.tl.absolutePosition({
      x: f.x(),
      y: f.y(),
    });
    editShapes.bg.absolutePosition({
      x: f.x(),
      y: f.y(),
    });
    editShapes.bg.size({
      width: f.width(),
      height: f.height(),
    });
  },
  setWidthHeightAll: (EditShapes, width, height) => {
    Object.values(EditShapes).forEach(shape => {
      shape.size({ width, height });
    });
  },
});

export default canvasContext;
