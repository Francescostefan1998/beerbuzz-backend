import mongoose from "mongoose";
const { Schema, model } = mongoose;

const maltSchema = new Schema(
  {
    name: { type: String, required: false },
    supplier: { type: String },
    type: { type: String, required: false },
    color: { type: Schema.Types.Mixed, required: false },
    category: { type: String, required: false },
    origin: { type: String, required: false },
    creator: { type: String, required: false },

    potential: { type: Schema.Types.Mixed, required: false },
    yield: { type: Schema.Types.Mixed, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    pubblic: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default model("Malt", maltSchema);
