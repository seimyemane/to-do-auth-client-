import { createContext, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorLayout from "./ErrorLayout";
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState({
    state: false,
    message: "",
    error: "",
  });
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const loginApiCall = async (payload) => {
    await axios
      .post("https://to-do-api.onrender.com/api/signin", payload, {
        withCredentials: true,
      })
      .then(() => setUser(() => payload))
      .catch((error) => {
        setError(() => {
          return {
            status: true,
            message: `${error.message}, please try again!`,
            err: error,
          };
        });
      });
  };
  return (
    <AuthContext.Provider value={{ loginApiCall, user }}>
      {!error.status && [children]}
      {error.status && <ErrorLayout data={error} />}
    </AuthContext.Provider>
  );
};
export default AuthContext;
