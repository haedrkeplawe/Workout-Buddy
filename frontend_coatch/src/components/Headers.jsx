import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";

const Headers = () => {
  const { mode, setMode } = useContext(DarkModeContext);

  function handleDarkMode(ev) {
    setMode(ev);
    localStorage.setItem("mode", ev);
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
          <>
            <button>Coatch Page</button>
          </>
        </div>
      </header>
    </>
  );
};

export default Headers;
