import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";

const Headers = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { mode, setMode } = useContext(DarkModeContext);

  function handleDarkMode(ev) {
    setMode(ev);
    localStorage.setItem("mode", ev);
  }

  function handleLogout() {
    logout();
  }

  return (
    <>
      <header>
        <Link to={"/"} className="main">
          Workout Buddy
        </Link>
        <div className="info">
          {mode === "sun" && (
            <FontAwesomeIcon
              onClick={() => handleDarkMode("moon")}
              className="sun"
              icon={faSun}
            />
          )}
          {mode === "moon" && (
            <FontAwesomeIcon
              onClick={() => handleDarkMode("sun")}
              className="moon"
              icon={faMoon}
            />
          )}

          {!user && (
            <>
              <Link to={"/login"}>LOGIN</Link>
              <Link to={"/signup"}>SIGNUP</Link>
            </>
          )}
          {user && (
            <>
              <p>{user?.name}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Headers;
