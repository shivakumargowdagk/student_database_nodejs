const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let studentSchema = new Schema(
  {
    studentId: {
      type: Number,
    },
    name: {
      type: String,
    },
    
    standard: {
        type : Number,
    },

    marks: {
        english: Number,
        hindi: Number,
        kannada: Number,
        mathematics: Number,
        science: Number,
        socialScience: Number,
    },

    isDeleted: {
        type : Boolean,
        default: false,
    },

    createdAt: { type: Date, default: Date.now(), index: { expiresIn: 300 } },
    source: { type: String },

    updatedAt: { type: Date, default: Date.now(), index: { expiresIn: 300 } },
    source: { type: String },
  },
  {
    timestamps: true,
    collection: "students",
  }
);

module.exports = mongoose.model("students", studentSchema);
