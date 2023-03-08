import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

userSchema.pre("save", async function (next) {
  const currentUser = this;

  if (currentUser.isModified("password")) {
    const plainPW = currentUser.password;

    const hash = await bcrypt.hash(plainPW, 11);
    currentUser.password = hash;
  }
  next();
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const user = userDocument.toObject();

  delete user.password;
  delete user.__v;
  return user;
};

userSchema.static("checkCredentials", async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});

export default model("User", userSchema);
