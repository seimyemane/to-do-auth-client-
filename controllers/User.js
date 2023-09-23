const mongoose = require("mongoose");

const User = require("../modal/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { serialize } = require("cookie");

const resController = require("./ResController");

//{user sign up and sign in} //
/////sign up

const signUp = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;

  if (username === "" || password === "" || confirmPassword === "")
    return resController(res, "fail", 400, "Please fill all inputs");
  if (password !== confirmPassword)
    return resController(res, "fail", 400, "passwords do not match!");
  const findUser = await User.findOne({ username });
  if (findUser)
    return resController(
      res,
      "fail",
      400,
      "user already exists, please sign in or try different user name!"
    );

  try {
    const userPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({
      username,
      password: userPassword,
      confirmPassword,
    });
    newUser.save();
    resController(res, "success", 200, "new user added!");
  } catch (error) {
    resController(res, error.message, 400, "signup error");
    next();
  }
};

///sign in
const signIn = async (req, res, next) => {
  try {
    const username = req.body.username.toLowerCase();
    const password = req.body.password.toLowerCase();
    if (username === "" || password === "")
      return resController(res, "fail", 400, "Please fill all inputs");
    const findUser = await User.findOne({ username });
    const comparePassword = bcrypt.compareSync(password, findUser.password);
    if (!findUser && !comparePassword)
      return resController(res, "fail", 400, "username or password is wrong!");
    const userId = await findUser._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    const serialized = serialize("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.setHeader("Set-cookie", serialized);
    resController(res, "login successful!", 200, token);
  } catch (error) {
    resController(res, error.message, 400, "login error!");
    next();
  }
};

//signout

const signOut = async (req, res, next) => {
  res.clearCookie("token");
  resController(res, "success", 200, "signed out!");
  next();
};
//add todo
const addTodo = async (req, res, next) => {
  const { todo } = req.body;
  if (todo === "")
    return resController(res, "fail", 400, "cannot add empty todo!");
  const decoded = jwt.decode(req.token, { complete: true });
  const { userId } = decoded.payload;

  try {
    const findUser = await User.findById(userId);
    if (!findUser)
      return resController(res, "fail", 400, "please sign in again!");

    findUser.todos.push({ todo });
    findUser.save();
    resController(res, "success", 200, "todo added!");
  } catch (error) {
    resController(
      res,
      error.message,
      400,
      "adding todo error, please try again! "
    );
    next();
  }
};
//update todo
const updateTodo = async (req, res, next) => {
  const { todo, id } = req.body;
  if (todo === "")
    return resController(res, "fail", 400, "cannot add empty todo");
  try {
    const findTodo = await User.updateOne(
      { "todos._id": id },
      {
        $set: {
          "todos.$.todo": todo,
        },
      }
    );
    if (!findTodo) return resController(res, "fail", 400, "todo not found!");
    resController(res, "success", 200, "todo updated!");
  } catch (error) {
    resController(
      res,
      error.message,
      400,
      "there was an error, please try again!"
    );
    next();
  }
};

//get all todos
const getAllTodo = async (req, res, next) => {
  //////////
  const token = req.headers.cookie.slice(6);
  if (!token) return resController(res, "fail", 400, "Please sign in again!");
  const decoded = jwt.decode(token, { complete: true });
  const { userId } = decoded.payload;
  try {
    const { todos } = await User.findById(userId);
    if (!todos) return resController(res, "fail", 400, "empty list");
    resController(res, "success", 200, todos);
  } catch (error) {
    resController(res, error.message, 400, "error getting todos!");
    next();
  }
};
//delete todo

const deleteTodo = async (req, res, next) => {
  const token = req.headers.cookie.slice(6);
  if (!token) return resController(res, "fail", 400, "Please sign in again!");
  const decoded = jwt.decode(token, { complete: true });
  const { userId } = decoded.payload;
  const { id } = req.body;
  try {
    const todo = await User.updateOne(
      { _id: userId },
      { $pull: { todos: { _id: id } } }
    );
    resController(res, "deleted", 200, todo);
  } catch (error) {
    resController(res, error.message, 400, "deleting error!");
    next();
  }
};
module.exports = {
  addTodo,
  signUp,
  signIn,
  updateTodo,
  getAllTodo,
  deleteTodo,
  signOut,
};
