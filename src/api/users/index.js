import express from "express";
import createHttpError from "http-errors";
import UsersModel from "./model.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
userRouter.get("/:userId", async (req, res, next) => {
  try {
    const users = await UsersModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
userRouter.put("/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
userRouter.delete("/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default userRouter;
