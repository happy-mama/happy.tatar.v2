import { lazy, Suspense } from "react";

const Canvas = lazy(() => import("@/components/canvas"));

const CanvasPage = () => {
  return (
    <Suspense fallback="Loading dynamic page...">
      <Canvas />
    </Suspense>
  );
};

export default CanvasPage;
