import express from "express";
import createHttpError from "http-errors";
import YeastModel from "./model.js";

const yeastRouter = express.Router();

yeastRouter.post("/", async (req, res, next) => {
  try {
    const newYeast = new YeastModel(req.body);
    const { _id } = await newYeast.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
yeastRouter.get("/", async (req, res, next) => {
  try {
    // Define query parameters for searching by name and techName
    const { name, techName } = req.query;

    // Create a query object to filter the yeasts
    const query = {};
    if (name) {
      // Use regular expression to match any occurrence of the search string in the name
      query.name = new RegExp(name, "i");
    }
    if (techName) {
      query.techName = new RegExp(techName, "i");
    }

    // Find the yeasts that match the query and sort them alphabetically by name
    const yeasts = await YeastModel.find(query).sort({ name: 1 });

    res.send(yeasts);
  } catch (error) {
    next(error);
  }
});
yeastRouter.get("/:yeastId", async (req, res, next) => {
  try {
    const yeast = await YeastModel.findById(req.params.yeastId);
    if (yeast) {
      res.send(yeast);
    } else {
      next(
        createHttpError(404, `Yeast with ID ${req.params.yeastId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
yeastRouter.put("/:yeastId", async (req, res, next) => {
  try {
    const updateYeast = await YeastModel.findByIdAndUpdate(
      req.params.yeastId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updateYeast) {
      res.send(updateYeast);
    } else {
      next(
        createHttpError(404, `Yeast with ID ${req.params.yeastId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});
yeastRouter.delete("/:yeastId", async (req, res, next) => {
  try {
    const deleteYeast = await YeastModel.findByIdAndDelete(req.params.yeastId);
    if (deleteYeast) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Yeast with ID ${req.params.yeastId} not found`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default yeastRouter;
