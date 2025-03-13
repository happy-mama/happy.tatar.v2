import { create } from "zustand";

export type Feature = {
  id: string;
  type: "rect";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  offset: { x: number; y: number };
};

type CanvasValues = {
  tool: "pointer" | "rect";
  mode: "edit" | "draw" | "none";
  selected: string;
  features: { [key: string]: Feature };
};

type CanvasMutators = {
  setTool: (v: CanvasValues["tool"]) => void;
  setMode: (v: CanvasValues["mode"]) => void;
  setSelected: (v: CanvasValues["selected"]) => void;
  setFetures: (v: CanvasValues["features"]) => void;
  setFeature: (v: Partial<Feature> & { id: Feature["id"] }) => void;
};

export interface CanvasStore extends CanvasValues, CanvasMutators {
  Set: (
    partial:
      | CanvasStore
      | Partial<CanvasStore>
      | ((state: CanvasStore) => CanvasStore | Partial<CanvasStore>),
    replace?: boolean | undefined
  ) => void;
  Get: () => CanvasStore;

  reset: () => void;
}

const DEFAULT: CanvasValues = {
  tool: "pointer",
  mode: "none",
  selected: "",
  features: {},
};

const useCanvasStore = create<CanvasStore>((set, get) => ({
  ...structuredClone(DEFAULT),

  setTool: v => set(() => ({ tool: v })),
  setMode: v => set(() => ({ mode: v })),
  setSelected: v => set(() => ({ selected: v })),
  setFetures: v => set(() => ({ features: v })),
  setFeature: v =>
    set(() => ({
      features: {
        ...get().features,
        [v.id]: { ...get().features[v.id], ...v },
      },
    })),

  Set: set,
  Get: get,

  reset: () => {
    set(structuredClone(DEFAULT));
  },
}));

export default useCanvasStore;
