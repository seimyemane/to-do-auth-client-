const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide username!"],
  },
  password: {
    type: String,
    required: [true, "Please provide password!"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm password!"],
  },
  todos: [
    {
      todo: String,
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
