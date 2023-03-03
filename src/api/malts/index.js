import express from "express";
import createHttpError from "http-errors";
import MaltModel from "./model.js";

const maltRouter = express.Router();

maltRouter.post("/", async (req, res, next) => {
  try {
    const newMalt = new MaltModel(req.body);
    const { _id } = await newMalt.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
maltRouter.get("/", async (req, res, next) => {
  try {
    const malts = await MaltModel.find();
    res.send(malts);
  } catch (error) {
    next(error);
  }
});
maltRouter.get("/:maltId", async (req, res, next) => {
  try {
    const malt = await MaltModel.findById(req.params.maltId);
    if (malt) {
      res.send(malt);
    } else {
      next(createHttpError(404, `User with ID ${req.params.maltId} not found`));
    }
  } catch (error) {
    next(error);
  }
});
maltRouter.put("/:maltId", async (req, res, next) => {
  try {
    const updatedMalt = await MaltModel.findByIdAndUpdate(
      req.params.maltId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedMalt) {
      res.send(updatedMalt);
    } else {
      next(createHttpError(404, `User with ID ${req.params.maltId} not found`));
    }
  } catch (error) {
    next(error);
  }
});
maltRouter.delete("/:maltId", async (req, res, next) => {
  try {
    const deleteMalt = await MaltModel.findByIdAndDelete(req.params.maltId);
    if (deleteMalt) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with ID ${req.params.maltId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default maltRouter;
