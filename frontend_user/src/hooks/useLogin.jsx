import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    await axios
      .post("/api/user/login", {
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

  return { login, setIsLoading, error };
};
