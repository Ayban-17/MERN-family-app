const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    moto: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const member = mongoose.model("member", membersSchema);

module.exports = member;
