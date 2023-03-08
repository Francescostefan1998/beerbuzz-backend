import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import RecipeModel from "../../recipes/model.js";
import createHttpError from "http-errors";

const fileRecipeRouter = express.Router();

const cloudUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "beer-buzz-recipes",
    },
  }),
}).single("image");

fileRecipeRouter.post(
  "/:recipeId/picture",
  cloudUploader,
  async (req, res, next) => {
    try {
      const recipe = await RecipeModel.findById(req.params.recipeId);
      if (recipe) {
        const updateRecipe = await RecipeModel.findByIdAndUpdate(
          req.params.recipeId,
          { image: req.files.path },
          { new: true, runValidators: true }
        );
      } else {
        next(
          createHttpError(404, `recipe wit id ${req.params.recipeId} not found`)
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default fileRecipeRouter;
