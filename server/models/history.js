const { Schema } = require("mongoose");

const historySchema = new Schema(
  {
    messages: [
      {
        type: String,
        required: false,
      },
    ],
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = historySchema;
