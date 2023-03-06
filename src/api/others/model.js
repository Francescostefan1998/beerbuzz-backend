import mongoose from "mongoose";
const { Schema, model } = mongoose;

const otherSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Other", otherSchema);
