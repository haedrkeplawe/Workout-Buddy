import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const WorkoutDeailes = ({ id, workout, setUpdatedWorkouts }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const response = await axios.delete("/api/coatch/user/" + workout._id);

    if (response.status === 200) {
      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    }
  };

  function handleUpdate() {
    setUpdatedWorkouts([
      ,
      workout._id,
      workout.title,
      workout.load,
      workout.reps,
    ]);
  }

  return (
    <div className="workout">
      <div className="head">
        <h2>{workout.title}</h2>
        <div>
          <FontAwesomeIcon onClick={handleUpdate} icon={faEdit} />
          <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} />
        </div>
      </div>
      <div className="info">
        <div>
          <span>Load (kg) : </span>
          <p> {workout.load}</p>
        </div>
        <div>
          <span>Reps : </span>
          <p> {workout.reps}</p>
        </div>
        <div>
          <span>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDeailes;
