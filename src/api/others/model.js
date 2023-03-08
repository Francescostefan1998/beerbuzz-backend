import mongoose from "mongoose";
const { Schema, model } = mongoose;

const otherSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model("Other", otherSchema);
