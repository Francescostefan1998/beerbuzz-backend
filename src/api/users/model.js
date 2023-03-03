import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: true },
    userName: { type: String, required: false },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export default model("User", userSchema);
