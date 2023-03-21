import express from "express";
import createHttpError from "http-errors";
import BeerModel from "./model.js";

const beerRouter = express.Router();

beerRouter.post("/", async (req, res, next) => {
  try {
    const newBeer = new BeerModel(req.body);
    const { _id } = await newBeer.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
beerRouter.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const query = {};
    if (name) {
      query.name = new RegExp(name, "i");
    }
    const beers = await BeerModel.find(query).sort({ name: 1 });
    res.send(beers);
  } catch (error) {
    next(error);
  }
});
beerRouter.get("/:beerId", async (req, res, next) => {
  try {
    const beer = await BeerModel.findById(req.params.beerId);
    if (beer) {
      res.send(beer);
    } else {
      next(createHttpError(404, `User with ID ${req.params.beerId} not found`));
    }
  } catch (error) {
    next(error);
  }
});
beerRouter.put("/:beerId", async (req, res, next) => {
  try {
    const updatedBeer = await BeerModel.findByIdAndUpdate(
      req.params.beerId,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedBeer) {
      res.send(updatedBeer);
    } else {
      next(createHttpError(404, `User with ID ${req.params.beerId} not found`));
    }
  } catch (error) {
    next(error);
  }
});
beerRouter.delete("/:beerId", async (req, res, next) => {
  try {
    const deleteBeer = await BeerModel.findByIdAndDelete(req.params.beerId);
    if (deleteBeer) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `User with ID ${req.params.beerId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default beerRouter;
