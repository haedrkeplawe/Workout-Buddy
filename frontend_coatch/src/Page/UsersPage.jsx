import axios from "axios";
import { useEffect, useState } from "react";
import UsersDeailes from "../components/UsersDeailes";
import UsersForm from "../components/UsersForm";
import { useUsersContext } from "../hooks/useUsersContext";

const UsersPage = () => {
  const { users, dispatch } = useUsersContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/coatch");
      if (response.status === 200) {
        dispatch({ type: "SET_USERS", payload: response.data });
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="index-page">
      <div>
        {users &&
          users.map((user) => (
            <UsersDeailes key={user._id} user={user} dispatch={dispatch} />
          ))}
      </div>
      <UsersForm />
    </div>
  );
};

export default UsersPage;
