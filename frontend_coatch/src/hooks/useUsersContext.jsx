import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUsersContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUserContext must be used inside n UserContextProvider");
  }

  return context;
};
