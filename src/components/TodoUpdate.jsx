import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GrDocumentUpdate as UpdateIcn } from "react-icons/gr";
import ErrorLayout from "./ErrorLayout";

const TodoUpdate = () => {
  const navigate = useNavigate();

  /* setError catches error and sets the status to true which will trigger the <ErrorLayout/> component and sets the message to response.data.data */
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const { id } = useParams();
  const [todo, setTodo] = useState({
    todo: "",
    id: id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  //handle update submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    await axios
      .patch("https://to-do-api.onrender.com/api/update_todo", todo, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/home");
      })
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
      className="flex  h-[100vh] justify-center items-center bg-[url('https://cdn.pixabay.com/photo/2017/02/10/03/12/winter-2054297_640.jpg')] bg-no-repeat bg-cover flex-col  lg:p-0 md:p-0 sm:p-2 p-2"
      onClick={() =>
        setError(() => {
          return {
            status: false,
            message: "",
          };
        })
      }
    >
      {/* ErrorLayout is a component which pops up in case of an error */}
      {error.status && <ErrorLayout data={error} />}
      <div className="h-1/4 flex justify-center items-center p-4 bg-slate-600 rounded-2xl shadow-2xl shadow-gray-950 bg-opacity-50 w-[100%] lg:w-[40%] md:[30%] sm:w-[80%]">
        <form
          onSubmit={handleUpdateSubmit}
          className="flex justify-center items-end p-2"
        >
          <input
            type="text"
            value={todo.todo}
            name="todo"
            placeholder="update here!"
            onChange={(e) => handleChange(e)}
            className=" p-2 rounded-xl bg-transparent text-black  placeholder:text-slate-600 bg-white"
          />
        </form>

        <UpdateIcn
          size={25}
          onClick={handleUpdateSubmit}
          color="white"
          className="hover:scale-125 cursor-pointer "
        />
      </div>
      <button
        className="bg-black text-white p-1 rounded-md hover:scale-110 mt-2 "
        onClick={() => navigate("/home")}
      >
        back
      </button>
    </div>
  );
};

export default TodoUpdate;
