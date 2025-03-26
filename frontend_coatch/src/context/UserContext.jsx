import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };

    case "CREATE_USERS":
      return {
        users: [action.payload, ...state.users],
      };

    case "DELETE_USERS":
      return {
        users: state.users.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const UserContextProvide = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    users: null,
  });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
