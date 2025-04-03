import { lazy, Suspense } from "react";

const Clicker = lazy(() => import("@/components/clicker"));

const ClickerPage = () => {
  return (
    <Suspense fallback="Loading dynamic page...">
      <Clicker />
    </Suspense>
  );
};

export default ClickerPage;
