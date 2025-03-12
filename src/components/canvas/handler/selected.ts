import { useContext, useEffect } from "react";
import canvasContext from "../ctx";
import useCanvasStore from "../store";

const HandleSelected = () => {
  const canvasCtx = useContext(canvasContext);
  const canvasStore = useCanvasStore();

  useEffect(() => {
    // const drawLayer = canvasCtx.ref.layer.shape;
    // const userLayer = canvasCtx.ref.layer.user;

    if (canvasStore.selected) {
      const storeFeature = canvasStore.features[canvasStore.selected];
      const feature = canvasCtx.getShape(
        canvasCtx.ref.layer.user,
        canvasStore.selected
      );

      if (!feature) return;

      switch (storeFeature.type) {
        case "rect": {
          const border = canvasCtx.getRectBorder();

          canvasCtx.setRectBorderOnFeature(border, feature);
        }
      }
    } else {
      const border = canvasCtx.getRectBorder();

      canvasCtx.setWidthHeightAll(border, 0, 0);
    }
  }, [canvasCtx, canvasStore]);
};

export default HandleSelected;
