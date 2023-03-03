import express from "express";
import createHttpError from "http-errors";
import HopModel from "./model.js";

const hopRouter = express.Router();

hopRouter.post("/", async (req, res, next) => {
  try {
    const newHop = new HopModel(req.body);
    const { _id } = await newHop.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
hopRouter.get("/", async (req, res, next) => {
  try {
    const hops = await HopModel.find();
    res.send(hops);
  } catch (error) {
    next(error);
  }
});
hopRouter.get("/:hopId", async (req, res, next) => {
  try {
    const hop = await HopModel.findById(req.params.hopId);
    if (hop) {
      res.send(hop);
    } else {
      next(createHttpError(404, `Hop  with ID ${req.params.hopId} not found`));
    }
  } catch (error) {
    next(error);
  }
});
hopRouter.put("/:hopId", async (req, res, next) => {
  try {
    const updateHop = await HopModel.findByIdAndUpdate(
      req.params.hopId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updateHop) {
      res.send(updateHop);
    } else {
      next(createHttpError(404, `Hop  with ID ${req.params.hopId} not found`));
    }
  } catch (error) {
    next(error);
  }
});
hopRouter.delete("/:hopId", async (req, res, next) => {
  try {
    const deleteHop = await HopModel.findByIdAndDelete(req.params.hopId);
    if (deleteHop) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Hop with ID ${req.params.hopId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default hopRouter;
