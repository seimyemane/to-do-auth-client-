import React, { useContext, useState } from "react";
import { FaUser as UserIcon } from "react-icons/fa";
import { RiLoginCircleFill as LoginIcon } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import ErrorLayout from "./ErrorLayout";

const Signin = () => {
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const { loginApiCall } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  //login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password)
      return setError((prevState) => {
        return {
          ...prevState,
          status: true,
          message: "Please fill in the inputs",
        };
      });

    await loginApiCall(loginData)
      .then(() =>
        setLoginData(() => {
          return {
            username: "",
            password: "",
          };
        })
      )
      .finally(() => navigate("/home"))
      .catch((error) =>
        setError((prevState) => {
          return {
            ...prevState,
            status: true,
            message: error.response.data.data,
          };
        })
      );
  };
  return (
    <div
      className=" flex justify-around items-center flex-col bg-[url(https://img.freepik.com/free-photo/3d-background-with-white-cubes_23-2150472987.jpg?size=626&ext=jpg)] h-[100vh] bg-no-repeat bg-cover"
      onClick={() =>
        setError(() => {
          return {
            status: false,
            message: "",
          };
        })
      }
    >
      {error.status && <ErrorLayout data={error} />}
      <p className="text-2xl lg:text-3xl lg:w-1/2 md:text-4xl md:w-2/3 sm:text-3xl sm:w-full font-bold flex justify-center items-center  p-2 rounded-2xl bg-opacity-10 bg-slate-600 text-slate-700">
        Write your to-do's here and access them anywhere, anytime, any device
      </p>
      <p className="text-6xl lg:text-6xl lg:w-1/2 md:text-6xl md:w-2/3 sm:text-6xl sm:w-full font-thin flex justify-center items-center ">
        let's get started!
      </p>
      <div className="bg-rose-200 bg-opacity-[15%] bg-transparent  flex  justify-center items-center h-[70%]  lg:w-[50%] md:w-[70%] sm:w-[80%] sm:p-1 sm:text-sm rounded-xl p-4 shadow-2xl shadow-slate-600 w-[80%] ">
        <form onSubmit={handleLoginSubmit}>
          <p className="text-4xl text-sky-950 font-thin  mb-2 flex flex-1  justify-between">
            Login <UserIcon />
          </p>
          <input
            type="text"
            className="border  mb-4 h-8 rounded-[10px] border-solid border-gray-500 flex flex-1 px-2 focus:outline-none text-slate-700"
            placeholder="username"
            name="username"
            onChange={handleLoginChange}
            value={loginData.username}
          />
          <input
            type="password"
            className="border mt-4 h-8 rounded-[10px] border-solid border-gray-500 flex flex-1 px-2 focus:outline-none text-slate-700"
            placeholder="password"
            name="password"
            onChange={handleLoginChange}
            value={loginData.password}
          />
          <button className="mt-2">
            <LoginIcon size="25px" color="black" className="hover:scale-125" />
          </button>
          <p>
            or <br></br>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="bg-slate-700 text-white p-2 rounded-[10px] hover:scale-110"
            >
              signup
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
