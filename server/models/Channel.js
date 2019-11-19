const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    users: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    admin: {
      type: ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("User", ChannelSchema);
