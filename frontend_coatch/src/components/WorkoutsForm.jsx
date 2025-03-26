import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import axios from "axios";

const WorkoutsForm = ({ id, updatedWorkouts, setUpdatedWorkouts }) => {
  const { dispatch } = useWorkoutsContext([]);
  const [emptyFields, setEmptyFields] = useState("");
  const [idWorkout, setIdWorkout] = useState("");
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [isUpdate, setIsupdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (updatedWorkouts.length > 0) {
      setIdWorkout(updatedWorkouts[1]);
      setTitle(updatedWorkouts[2]);
      setLoad(updatedWorkouts[3]);
      setReps(updatedWorkouts[4]);
      setIsupdate(true);
    }
  }, [updatedWorkouts]);

  function HandleEmptyFields() {
    setTitle("");
    setLoad("");
    setReps("");
    setEmptyFields([]);
    setError(null);
  }

  function handleCancel() {
    setUpdatedWorkouts([]);
    HandleEmptyFields;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const workout = { idWorkout, title, load, reps };
    try {
      if (!isUpdate) {
        const response = await axios.post("/api/coatch/user/" + id, workout);
        HandleEmptyFields();
        dispatch({ type: "CREATE_WORKOUT", payload: response.data });
      } else if (isUpdate) {
        const response = await axios.patch("/api/coatch/user/" + id, workout);
        HandleEmptyFields();
        setIsupdate(false);
        dispatch({ type: "UPDATE_WORKOUT", payload: response.data });
      }
    } catch (error) {
      setError(error?.response?.data?.error);
      setEmptyFields(error?.response?.data?.emptyFields);
    }
    setIsLoading(false);
  };

  return (
    <form className="workout-form" onSubmit={handleCreate}>
      <h3>Add a New Workout</h3>
      <div>
        <label>Excersize Title:</label>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className={emptyFields?.includes("title") ? "error" : ""}
        />
      </div>
      <div>
        <label>load (in kg):</label>
        <input
          type="number"
          value={load}
          onChange={(ev) => setLoad(ev.target.value)}
          className={emptyFields?.includes("load") ? "error" : ""}
        />
      </div>
      <div>
        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(ev) => setReps(ev.target.value)}
          className={emptyFields?.includes("reps") ? "error" : ""}
        />
      </div>
      <div className="button">
        <button className="btn " disabled={isLoading}>
          {(isUpdate && "Update") || "Add"} Wourkout
        </button>
        {isUpdate && (
          <button onClick={handleCancel} className="btn cancel">
            Cancel
          </button>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutsForm;
