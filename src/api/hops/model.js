import mongoose from "mongoose";
const { Schema, model } = mongoose;

const hopSchema = new Schema(
  {
    name: { type: String, required: true },
    alpha: { type: Number, required: true },
    type: { type: String, required: true },
    origin: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model("Hop", hopSchema);
