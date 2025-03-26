import { Outlet } from "react-router-dom";
import Headers from "./components/Headers";

const Layout = () => {
  return (
    <div className="">
      <Headers />
      <Outlet />
    </div>
  );
};

export default Layout;
