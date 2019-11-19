const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MessageSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Message", MessageSchema);
