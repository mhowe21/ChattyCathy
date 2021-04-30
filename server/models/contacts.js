const { Schema } = require("mongoose");

const contactsSchema = new Schema(
  {
    id: [
      {
        type: String,
        required: true,
      },
    ],
    username: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = contactsSchema;
