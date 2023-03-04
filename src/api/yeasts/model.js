import mongoose from "mongoose";
const { Schema, model } = mongoose;

const yeastSchema = new Schema(
  {
    name: { type: String, required: true },
    techName: { type: String, required: true },
    laboratory: { type: String, required: true },
    cellsPerGram: { type: Number, required: true },
    type: { type: String, required: true },
    attenuation: { type: Number, required: true },
    form: { type: String, required: true },
    maxAbv: { type: Number, required: true },
    flocculation: { type: String, required: true },
    temperature: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

export default model("Yeast", yeastSchema);
