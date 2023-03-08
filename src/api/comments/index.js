import express from "express";
import createHttpError from "http-errors";
import CommentModel from "./model.js";

const commentRouter = express.Router();

commentRouter.post("/", async (req, res, next) => {
  try {
    const newComment = new CommentModel(req.body);
    const { _id } = await newComment.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
commentRouter.get("/", async (req, res, next) => {
  try {
    const comments = await CommentModel.find();

    res.send(comments);
  } catch (error) {
    next(error);
  }
});
commentRouter.get("/:commentId", async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (comment) {
      res.send(comment);
    } else {
      next(
        createHttpError(404, `Hop  with ID ${req.params.commentId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
commentRouter.put("/:commentId", async (req, res, next) => {
  try {
    const updateComment = await CommentModel.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updateComment) {
      res.send(updateComment);
    } else {
      next(
        createHttpError(404, `Hop  with ID ${req.params.commentId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
commentRouter.delete("/:commentId", async (req, res, next) => {
  try {
    const deleteComment = await CommentModel.findByIdAndDelete(
      req.params.commentId
    );
    if (deleteComment) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Hop with ID ${req.params.commentId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default commentRouter;
