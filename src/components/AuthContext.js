import { createContext, useState } from "react";
import axios from "axios";
import ErrorLayout from "./ErrorLayout";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState({
    state: false,
    message: "",
    error: "",
  });
  const [user, setUser] = useState({});

  const loginApiCall = async (payload) => {
    await axios
      .post("https://to-do-api-0dlv.onrender.com/api/signin", payload, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(() => payload);
      })
      .catch((error) => {
        setError(() => {
          return {
            status: true,
            message: `${error.message} go back and try again!`,
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
