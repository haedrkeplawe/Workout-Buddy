import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const UsersDeailes = ({ user, dispatch }) => {
  const [show, setShow] = useState(false);
  async function handleDelete() {
    const response = await axios.delete("api/coatch/" + user._id);
    if (response.status === 200) {
      dispatch({ type: "DELETE_USERS", payload: response.data });
    }
  }

  if (show) {
    return <Navigate to={"/user/" + user._id} />;
  }
  return (
    <div className="workout">
      <div className="head">
        <h2>{user.name}</h2>
        <div>
          <FontAwesomeIcon onClick={() => setShow(true)} icon={faEye} />
          <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} />
        </div>
      </div>
      <div className="info">
        <div>
          <span>Email : </span>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UsersDeailes;
