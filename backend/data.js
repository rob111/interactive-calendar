
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//database schema

const DataSchema = new Schema(
  {
    id: Number,
    time: Array,
    date: Number,
    text: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
