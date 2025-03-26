import axios from "axios";
import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutDeailes from "../components/WorkoutDeailes";
import WorkoutsForm from "../components/WorkoutsForm";

const IndexPage = () => {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutsContext();
  const [updatedWorkouts, setUpdatedWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="index-page">
      <div>
        {/* {workouts &&
          workouts.map((workout) => (
            <WorkoutDeailes
              setUpdatedWorkouts={setUpdatedWorkouts}
              key={workout._id}
              workout={workout}
            />
          ))} */}
      </div>
      <WorkoutsForm
      // setUpdatedWorkouts={setUpdatedWorkouts}
      // updatedWorkouts={updatedWorkouts}
      />
    </div>
  );
};

export default IndexPage;
