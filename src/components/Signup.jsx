import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser as UserIcon } from "react-icons/fa";
import { RiLoginCircleFill as SignUpIcon } from "react-icons/ri";
import ErrorLayout from "./ErrorLayout";
import Spinner from "../images/spinner.gif";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSignUp = async () => {
    const { username, password, confirmPassword } = user;
    if (!username || !password || confirmPassword) {
      setError(() => {
        return {
          status: true,
          message: "please fill in all inputs",
        };
      });
    }
    setLoading(true);
    await axios
      .post("https://to-do-api-0dlv.onrender.com/api/signup", user)
      .then(() => setLoading(false))
      .finally(() => navigate("/"))
      .catch((error) =>
        setError(() => {
          return {
            status: true,
            message: error.response.data.data,
          };
        })
      );
  };
  return (
    <div
      className="h-[100vh] flex justify-center items-center bg-[url('https://cdn.pixabay.com/photo/2023/08/30/17/59/snowflakes-8223860_1280.jpg')]  text-white bg-no-repeat bg-cover "
      onClick={() => setError(() => !error.status)}
    >
      {error.status && <ErrorLayout data={error} />}
      <div
        className=" flex flex-2 flex-col lg:h-[80%] md:h-[60%] sm:h-1/2  justify-center items-center lg:w-1/3 md:w-[70%]  sm:w-1/2 opacity-100 bg-opacity-20 bg-cyan-800 rounded-3xl shadow-2xl shadow-teal-200 h-1/2 w-fit 

        
      "
      >
        <p className="w-1/2 text-3xl flex justify-between items-center   lg:text-4xl md:text-6xl sm:text-3xl font-thin mb-1   ">
          Sign up
          <span>
            <UserIcon />
          </span>
        </p>
        <form
          onSubmit={handleSignUp}
          className="flex  justify-between items-center flex-col  h-1/2 lg:w-1/2 md:w-1/2 sm:w-full p-1 "
        >
          <input
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="username"
            value={user.username}
            className="text-black p-1 rounded-lg w-full mt-1"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            className="text-black p-1 rounded-lg  w-full mt-1"
          />

          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={user.confirmPassword}
            className="text-black p-1 rounded-lg  w-full mt-1"
          />
          <span className=" w-full flex flex-col justify-center items-center  ">
            {loading ? (
              <img
                src={Spinner}
                alt="loading..."
                srcset=""
                className="w-[30px]"
              />
            ) : (
              <SignUpIcon
                size={25}
                className="hover:scale-125 cursor-pointer"
                onClick={handleSignUp}
              />
            )}
            or <br></br>
            <button
              type="button"
              className="bg-white text-black p-2 rounded-xl w-[70px] hover:scale-110"
              onClick={() => navigate("/")}
            >
              login
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
