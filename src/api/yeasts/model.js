import mongoose from "mongoose";
const { Schema, model } = mongoose;

const yeastSchema = new Schema(
  {
    name: { type: String, required: true },
    techName: { type: String, required: true },
    laboratory: { type: Number, required: true },
    cellsPerGram: { type: String, required: true },
    type: { type: String, required: true },
    attenuation: { type: Number, required: true },
    form: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Yeast", yeastSchema);
