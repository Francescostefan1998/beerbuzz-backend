import express from "express";
import createHttpError from "http-errors";
import OtherModel from "./model.js";

const otherRouter = express.Router();

otherRouter.post("/", async (req, res, next) => {
  try {
    const newOther = new OtherModel(req.body);
    const { _id } = await newOther.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
otherRouter.get("/", async (req, res, next) => {
  try {
    const others = await OtherModel.find(query).sort({ name: 1 });

    res.send(others);
  } catch (error) {
    next(error);
  }
});
otherRouter.get("/:otherId", async (req, res, next) => {
  try {
    const other = await OtherModel.findById(req.params.otherId);
    if (other) {
      res.send(other);
    } else {
      next(
        createHttpError(404, `Product with ID ${req.params.otherId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
otherRouter.put("/:otherId", async (req, res, next) => {
  try {
    const updateOther = await OtherModel.findByIdAndUpdate(
      req.params.otherId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updateOther) {
      res.send(updateOther);
    } else {
      next(
        createHttpError(404, `Product with ID ${req.params.otherId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
otherRouter.delete("/:otherId", async (req, res, next) => {
  try {
    const deleteProduct = await OtherModel.findByIdAndDelete(
      req.params.otherId
    );
    if (deleteProduct) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Priduct with ID ${req.params.otherId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default otherRouter;
