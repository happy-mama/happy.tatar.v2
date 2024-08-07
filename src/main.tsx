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
import NotFound from "./pages/404";
import Instruments from "./pages/i";
import FSpage from "./pages/i/fs";
import Passgen from "./pages/i/passgen";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Notifications />

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/i/" element={<Instruments />} />
        <Route path="/i/fs" element={<FSpage />} />
        <Route path="/i/passgen" element={<Passgen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
