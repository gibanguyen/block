const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: false,
    },
    photo: {
      type: String,
      require: false,
    },
    userEmail: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Block", BlockSchema);
