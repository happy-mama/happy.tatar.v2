import { create } from "zustand";

export type Feature = {
  id: string;
  type: "rect";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
};

type CanvasValues = {
  tool: "pointer" | "rect";
  features: { [key: string]: Feature };
  selectedId: string;
};

type CanvasMutators = {
  setTool: (v: CanvasValues["tool"]) => void;
  setFetures: (v: CanvasValues["features"]) => void;
  setFeature: (v: Feature) => void;
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
  features: {},
  selectedId: "",
};

const useCanvasStore = create<CanvasStore>((set, get) => ({
  ...structuredClone(DEFAULT),

  setTool: v => set(() => ({ tool: v })),
  setFetures: v => set(() => ({ features: v })),
  setFeature: v => set(() => ({ features: { ...get().features, [v.id]: v } })),

  Set: set,
  Get: get,

  reset: () => {
    set(structuredClone(DEFAULT));
  },
}));

export default useCanvasStore;
