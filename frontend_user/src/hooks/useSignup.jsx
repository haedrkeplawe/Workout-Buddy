import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    await axios
      .post("/api/user/register", {
        name,
        email,
        password,
      })
      .then((respone) => {
        localStorage.setItem("user", JSON.stringify(respone.data));
        dispatch({ type: "LOGIN", payload: respone.data });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error?.response?.data?.error);
      });
  };
  return { signup, setIsLoading, error };
};
