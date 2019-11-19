const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    avatar: {
      type: String,
      required: true
    },
    joinedChannels: [
      {
        type: ObjectId,
        ref: "Channel"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("User", UserSchema);
