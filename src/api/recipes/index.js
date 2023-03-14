import express from "express";
import createHttpError from "http-errors";
import RecipeModel from "./model.js";

const recipeRouter = express.Router();

recipeRouter.post("/", async (req, res, next) => {
  try {
    const newRecipe = new RecipeModel(req.body);
    const { _id } = await newRecipe.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
    console.log(error);
  }
});
recipeRouter.get("/", async (req, res, next) => {
  try {
    const recipes = await RecipeModel.find();
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});
recipeRouter.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeId);
    if (recipe) {
      res.send(recipe);
    } else {
      next(
        createHttpError(404, `Recipe  with ID ${req.params.recipeId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
recipeRouter.put("/:recipeId", async (req, res, next) => {
  try {
    const updateRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updateRecipe) {
      res.send(updateRecipe);
    } else {
      next(
        createHttpError(404, `Recipe  with ID ${req.params.recipeId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
recipeRouter.delete("/:recipeId", async (req, res, next) => {
  try {
    const deleteRecipe = await RecipeModel.findByIdAndDelete(
      req.params.recipeId
    );
    if (deleteRecipe) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Recipe with ID ${req.params.recipeId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default recipeRouter;
