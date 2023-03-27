import GoogleStrategy from "passport-google-oauth20";
import { createAccessToken } from "./tools.js";
import UserModel from "../../api/users/model.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `https://beerbuzz-backend-production.up.railway.app/users/googleRedirect`,
  },
  async (accesstoken, refreshtoken, profile, passportNext) => {
    console.log(profile);
    try {
      const { email, given_name, family_name } = profile._json;
      const user = await UserModel.findOne({ email });
      if (user) {
        const accessToken = await createAccessToken({
          _id: user._id,
          role: user.role,
        });
        const id = await user._id;

        passportNext(null, { accessToken, id });
      } else {
        const newUser = new UserModel({
          firstName: given_name,
          lastName: family_name,
          email,
          googleId: profile.id,
        });
        const createdUser = await newUser.save();
        const id = await createdUser._id;
        const accessToken = await createAccessToken({
          _id: createdUser._id,
          role: createdUser.role,
        });
        passportNext(null, { accessToken, id });
      }
    } catch (error) {
      console.log(error);
      passportNext(error);
    }
  }
);
export default googleStrategy;
