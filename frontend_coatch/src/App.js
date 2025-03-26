import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import UsersPage from "./Page/UsersPage";
import IndexPage from "./Page/IndexPage";

axios.defaults.baseURL = "https://workout-buddy-zwqk.onrender.com";

function App() {
  const { mode } = useContext(DarkModeContext);

  return (
    <div className={"App " + mode}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UsersPage />} />
          <Route path="user/:id" element={<IndexPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
