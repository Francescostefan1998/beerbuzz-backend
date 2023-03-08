import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import UserModel from "../../users/model.js";
import createHttpError from "http-errors";

const imageRouter = express.Router();

const cloudUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "beer-buzz-images-endpoint",
    },
  }),
}).single("image");

imageRouter.post("/:userId", cloudUploader, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (user) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.userId,
        { $push: { image: req.file.path } }, // push new path to the end of the array
        { new: true, runValidators: true }
      );
      res.send(updatedUser);
    } else {
      next(createHttpError(404, `user with id ${this.user._id} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default imageRouter;
