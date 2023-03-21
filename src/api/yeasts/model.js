import mongoose from "mongoose";
const { Schema, model } = mongoose;

const yeastSchema = new Schema(
  {
    name: { type: String, required: false },
    techName: { type: String, required: false },
    laboratory: { type: String, required: false },
    cellsPerGram: { type: Schema.Types.Mixed, required: false },
    type: { type: String, required: false },
    attenuation: { type: Schema.Types.Mixed, required: false },
    form: { type: String, required: false },
    maxAbv: { type: Schema.Types.Mixed, required: false },
    flocculation: { type: String, required: false },
    temperature: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    creator: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default model("Yeast", yeastSchema);
