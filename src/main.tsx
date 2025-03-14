import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "@/pages/root";
import "@/styles/main.css";
import Header from "@/components/header";
import Notifications from "@/components/notifications";

// fonts
import "@/fonts/Zain/ExtraBold.ttf";
import "@/fonts/Zain/Light.ttf";
import "@/fonts/Zain/ExtraLight.ttf";
import "@/fonts/Inter/VariableFont_slnt_wght.ttf";

// pages
import NotFound from "@/pages/404";
import Instruments from "@/pages/i";
import FSpage from "@/pages/i/fs";
import Passgen from "@/pages/i/passgen";
import CalcPage from "@/pages/i/calc";
import CanvasPage from "@/pages/i/canvas";
import Redirect from "@/pages/r";
import RedirectById from "@/pages/r/[id]";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Header />
      <Notifications />

      <Routes>
        <Route index element={<Root />} />

        <Route path="/i">
          <Route index element={<Instruments />} />
          <Route path="fs" element={<FSpage />} />
          <Route path="passgen" element={<Passgen />} />
          <Route path="calc" element={<CalcPage />} />
          <Route path="canvas" element={<CanvasPage />} />
        </Route>

        <Route path="/r">
          <Route index element={<Redirect />} />
          <Route path="/r/:id" element={<RedirectById />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
