import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const petsContextRef = createContext();

export const UsersContext = ({ children }) => {
  const [petsArray, setPetsArray] = useState(null);

  //Logs user out

  //Checks current user on load

  //Saves user to current user

  return <petsContextRef.Provider>{children}</petsContextRef.Provider>;
};
