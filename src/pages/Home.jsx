import React, { useEffect, useState } from "react";
import { BiSolidMessageSquareAdd as AddBtn } from "react-icons/bi";
import { MdDelete as DeleteIcn } from "react-icons/md";
import { AiTwotoneEdit as EditIcn } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorLayout from "../components/ErrorLayout";
import Spinner from "../images/spinner.gif";

axios.defaults.withCredentials = true;
const Home = () => {
  alert("log in with 'samir yusuf' as username and 'seim' as password
        ")
  /* setError catches error and sets the status to true which will trigger the <ErrorLayout/> component and sets the message to response.data.data */
  const [error, setError] = useState({
    status: false,
    message: "",
  });
    const [addTodo, setAddTodo] = useState({
    todo: "",
  });
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  //gets all the user's todos after login

  useEffect(() => {
    const getTodos = async () => {
      await axios
        .get("https://to-do-api-0dlv.onrender.com/api/get_todos", {
          withCredentials: true,
        })
        .then((res) => {
          setTodos(() => [res.data.data]);
        })
        .catch((error) =>
          error.request.status === 401
            ? navigate("/")
            : setError(() => {
                return {
                  status: true,
                  message: error.response.data.data,
                };
              }).then(() => navigate("/"))
        );
    };
    getTodos();
  }, [count]);


  const handleTodoChange = (e) => {
    const { name, value } = e.target;
    setAddTodo(() => {
      return {
        [name]: value,
      };
    });
  };
  const handleAddTodoSubmit = async (e) => {
    e.preventDefault();
   setAddTodo(() => {
      return {
        todo: "",
      };
    });
 

    await axios
      .post("https://to-do-api-0dlv.onrender.com/api/add_todo", addTodo)
      .then(() => setLoading(false))
      .finally(() => setCount(count + 1))
      .catch((error) =>
        setError(() => {
          return {
            status: true,
            message: error.response.data.data,
          };
        })
      );
  };
  //handle delete todo

  const handleDeleteTodo = async (id) => {
    
    await axios
      .patch("https://to-do-api-0dlv.onrender.com/api/delete_todo", { id })
      .then(() => setLoading(false))
      .finally(() => setCount(count + 1))
      .catch((error) =>
        setError(() => {
          return {
            status: true,
            message: error.response.data.data,
          };
        })
      );
  };

  //handle updating todo

  const handleUpdateTodo = (id) => {
    navigate(`/update/${id}`);
  };
  const handleSignout = async () => {
    await axios
      .post("https://to-do-api-0dlv.onrender.com/api/signout", {
        withCredentials: true,
      })
      .then(navigate("/"))
      .catch((error) =>
        setError(() => {
          return {
            status: true,
            message: error.response.data.data,
          };
        })
      );
  };
  const mapTodos = todos.map((todo) => {
    return todo.map((t) => {
      return (
        <h1
          key={t._id}
          className=" flex items-center w-full justify-between lg:text-xl m-1 p-2 rounded-xl md:text-lg sm:text-lg  border border-slate-400 border-solid bg-opacity-50 text-white "
        >
          {t.todo}{" "}
          <span className="flex  w-1/6 justify-around items-center ">
            <EditIcn
              size={25}
              className="hover:scale-125  cursor-pointer"
              onClick={() => handleUpdateTodo(t._id)}
            />
            {loading ? (
              <img src={Spinner} alt="" srcset="" className="w-[25px]" />
            ) : (
              <DeleteIcn
                onClick={() => handleDeleteTodo(t._id)}
                size={25}
                className="hover:scale-125  cursor-pointer"
              />
            )}
          </span>
        </h1>
      );
    });
  });

  return (
    <div
      className="h-[100vh]  flex justify-center items-center flex-col bg-[url('https://cdn.pixabay.com/photo/2023/08/07/14/48/sunflowers-8175241_640.jpg')] bg-cover "
      onClick={() => setError(() => !error.status)}
    >
      {error.status && <ErrorLayout data={error} />}
      <div
        className="flex w-[80%] h-[80%]  items-center justify-center flex-col shadow-2xl shadow-indigo-900 rounded-xl bg-opacity-60 text-white bg-stone-900  lg:w-[70%] md:[60%] sm:[80%]
         p-2
      "
      >
        <div className=" flex items-center justify-center  ">
          <form
            className="flex justify-center items-center"
            onSubmit={handleAddTodoSubmit}
          >
            <input
              type="text"
              placeholder="add here!"
              className="border h-8 rounded-[10px] border-solid border-gray-500 px-2 focus:outline-none text-slate-700 w-full lg:w-full md:w-[70%] sm:w-[80%]"
              name="todo"
              value={addTodo.todo}
              onChange={handleTodoChange}
            />

            <AddBtn
              size="28px"
              onClick={handleAddTodoSubmit}
              className="hover:scale-x-125 cursor-pointer "
            />
          </form>
        </div>
        <div className=" h-[80%] w-full p-2 lg:w-[70%] md:[80%] sm:[80%]overflow-auto overflow-y-scroll no-scrollbar">
          <span className="overflow-hidden p-2">
            {todos.length > 0 ? (
              mapTodos
            ) : (
              <p className="text-3xl">Loading....</p>
            )}
          </span>
        </div>
      </div>
      <span className=" lg:w-1/2 md:w-1/2 sm:w-full flex justify-end mt-2">
        <button
          className="text-black p-2 bg-white rounded-xl lg:hover:scale-110 md:hover:scale-110"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </span>
    </div>
  );
};

export default Home;
