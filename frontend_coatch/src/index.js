import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContextProvider } from "./context/DarkModeContext";
import { UserContextProvide } from "./context/UserContext";
import { WorkoutsContextProvide } from "./context/WorkoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <UserContextProvide>
        <WorkoutsContextProvide>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </WorkoutsContextProvide>
      </UserContextProvide>
    </DarkModeContextProvider>
  </React.StrictMode>
);
