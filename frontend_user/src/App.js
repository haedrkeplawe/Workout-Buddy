import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import SignupPage from "./Page/SignupPage";
import LoginPage from "./Page/LoginPage";
import IndexPage from "./Page/IndexPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { DarkModeContext } from "./context/DarkModeContext";
import { useContext } from "react";

axios.defaults.baseURL = "https://workout-buddy-zwqk.onrender.com";
// axios.defaults.withCredentials = true;

function App() {
  const { user } = useAuthContext();
  const { mode } = useContext(DarkModeContext);

  return (
    <div className={"App " + mode}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={user ? <IndexPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to={"/"} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
