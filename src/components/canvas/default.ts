import { Shape } from "konva/lib/Shape";
import { CanvasContext } from "./ctx";

type IDEFAULT = {
  shapes: CanvasContext["shapes"];
};

const DEFAULT: IDEFAULT = {
  shapes: {
    edit_bg: {
      raw: {
        id: "edit_bg",
        name: "edit_bg",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "transparent",
        offset: { x: 0, y: 0 },
      },
      f: new Shape(),
    },
    edit_tr: {
      raw: {
        id: "edit_tr",
        name: "edit_tr",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_r: {
      raw: {
        id: "edit_r",
        name: "edit_r",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_br: {
      raw: {
        id: "edit_br",
        name: "edit_br",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_b: {
      raw: {
        id: "edit_b",
        name: "edit_b",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_bl: {
      raw: {
        id: "edit_bl",
        name: "edit_bl",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_l: {
      raw: {
        id: "edit_l",
        name: "edit_l",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_tl: {
      raw: {
        id: "edit_tl",
        name: "edit_tl",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    edit_t: {
      raw: {
        id: "edit_t",
        name: "edit_t",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f0f",
        offset: { x: 5, y: 5 },
      },
      f: new Shape(),
    },
    rect: {
      raw: {
        id: "draw_rect",
        name: "draw_rect",
        type: "rect",
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        fill: "#f6af0c",
        offset: { x: 0, y: 0 },
      },
      f: new Shape(),
    },
  },
};

export default DEFAULT;
