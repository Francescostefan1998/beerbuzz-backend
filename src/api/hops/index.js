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
    // Define query parameter for searching by name
    const { name } = req.query;

    // Create a query object to filter the hops
    const query = {};
    if (name) {
      // Use regular expression to match any occurrence of the search string in the name
      query.name = new RegExp(name, "i");
    }

    // Find the hops that match the query and sort them alphabetically by name
    const hops = await HopModel.find(query).sort({ name: 1 });

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
