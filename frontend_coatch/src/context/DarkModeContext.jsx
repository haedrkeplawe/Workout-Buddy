import { createContext, useEffect, useReducer, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("sun");

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode) {
      setMode(mode);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
