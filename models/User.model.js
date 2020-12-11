const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const Plants = require("./Plants.model")
const HomePlants = require("./HomePlants.model")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    favoritePlants: [
      {
      type: ObjectId,
      ref: Plants
      }
    ],
    homePlants: [
      {
      type: ObjectId,
      ref: Plants
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;


