import mongoose from "mongoose";
const { Schema, model } = mongoose;

const hopSchema = new Schema(
  {
    name: { type: String, required: false },
    alpha: { type: Schema.Types.Mixed, required: false },
    type: { type: String, required: false },
    origin: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    creator: { type: String, required: false },
    pubblic: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default model("Hop", hopSchema);
