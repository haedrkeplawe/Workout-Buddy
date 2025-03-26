import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { WorkoutsContextProvide } from "./context/WorkoutContext";
import { DarkModeContextProvider } from "./context/DarkModeContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <WorkoutsContextProvide>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </WorkoutsContextProvide>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
