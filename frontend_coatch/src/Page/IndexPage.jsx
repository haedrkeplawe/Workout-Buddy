import axios from "axios";
import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDeailes from "../components/WorkoutDeailes";
import WorkoutsForm from "../components/WorkoutsForm";
import { useParams } from "react-router-dom";

const IndexPage = () => {
  const { id } = useParams();
  const { workouts, dispatch } = useWorkoutsContext();
  const [updatedWorkouts, setUpdatedWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get("/api/coatch/user/" + id);
      if (response.status === 200) {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="index-page">
      <div>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDeailes
              id={id}
              setUpdatedWorkouts={setUpdatedWorkouts}
              key={workout._id}
              workout={workout}
            />
          ))}
      </div>
      <WorkoutsForm
        id={id}
        setUpdatedWorkouts={setUpdatedWorkouts}
        updatedWorkouts={updatedWorkouts}
      />
    </div>
  );
};

export default IndexPage;
