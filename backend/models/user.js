const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },

  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }],
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
