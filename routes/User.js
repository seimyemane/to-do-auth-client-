const route = require("express").Router();

const {
  addTodo,
  signUp,
  signIn,
  updateTodo,
  getAllTodo,
  deleteTodo,
  signOut,
} = require("../controllers/User");
const Auth = require("../controllers/Auth");

route.patch("/update_todo", Auth, updateTodo);
route.get("/get_todos", Auth, getAllTodo);
route.post("/add_todo", Auth, addTodo);
route.post("/signup", signUp);
route.post("/signin", signIn);
route.post("/signout", Auth, signOut);
route.patch("/delete_todo", Auth, deleteTodo);
module.exports = route;
