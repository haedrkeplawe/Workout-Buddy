import { useEffect, useState } from "react";
import axios from "axios";
import { useUsersContext } from "../hooks/useUsersContext";

const WorkoutsForm = ({}) => {
  const { dispatch } = useUsersContext();

  const [emptyFields, setEmptyFields] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function HandleEmptyFields() {
    setName("");
    setEmail("");
    setPassword("");
    setEmptyFields([]);
    setError(null);
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = { name, email, password };
    try {
      const response = await axios.post("/api/coatch", user);
      dispatch({ type: "CREATE_USERS", payload: response.data });
      HandleEmptyFields();
    } catch (error) {
      setError(error?.response?.data?.error);
      setEmptyFields(error?.response?.data?.emptyFields);
    }
    setIsLoading(false);
  };

  return (
    <form className="workout-form" onSubmit={handleCreate}>
      <h3>Add a New User</h3>
      <div>
        <label>Name :</label>
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className={emptyFields?.includes("name") ? "error" : ""}
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className={emptyFields?.includes("email") ? "error" : ""}
        />
      </div>
      <div>
        <label>Passwrod :</label>
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className={emptyFields?.includes("password") ? "error" : ""}
        />
      </div>
      <div className="button">
        <button className="btn " disabled={isLoading}>
          Add User
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutsForm;
