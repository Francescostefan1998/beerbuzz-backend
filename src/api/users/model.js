import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    image: { type: String, required: false },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    googleId: { type: String, required: false },
  },
  { timestamps: true }
);

export default model("User", userSchema);
