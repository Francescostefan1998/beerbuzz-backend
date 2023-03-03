import mongoose from "mongoose";
const { Schema, model } = mongoose;

const maltSchema = new Schema(
  {
    name: { type: String, required: true },
    supplier: { type: String },
    type: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    origin: { type: String, required: true },
    potential: { type: Number, required: true },
    yield: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Malt", maltSchema);
