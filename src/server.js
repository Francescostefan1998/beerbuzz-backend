import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./api/users/index.js";
import beerRouter from "./api/beerBJCP/index.js";
import maltRouter from "./api/malts/index.js";
import hopRouter from "./api/hops/index.js";
import yeastRouter from "./api/yeasts/index.js";
import recipeRouter from "./api/recipes/index.js";
import otherRouter from "./api/others/index.js";
import commentRouter from "./api/comments/index.js";
import fileRecipeRouter from "./api/recipes/file/index.js";
import imageRouter from "./api/momentaryImage/file/index.js";
import pdfRouter from "./api/recipes/pdf/index.js";
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  genericErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandlers.js";
import googleStrategy from "./lib/auth/google.js";
import passport from "passport";

const server = express();

const port = process.env.PORT || 3001;
passport.use("google", googleStrategy);
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
console.log(mongoConnectionString);
const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOpts = {
  origin: (origin, corsNext) => {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      corsNext(null, true);
    } else {
      corsNext(new Error("Not allowed by CORS"));
    }
  },
};
server.use("/pdf", pdfRouter);

server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use("/users", userRouter);
server.use("/beers", beerRouter);
server.use("/malts", maltRouter);
server.use("/hops", hopRouter);
server.use("/yeasts", yeastRouter);
server.use("/recipes", recipeRouter);
server.use("/recipes", fileRecipeRouter);
server.use("/images", imageRouter);

server.use("/others", otherRouter);
server.use("/comments", commentRouter);
server.use(unauthorizedErrorHandler);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on Port: ${port}`);
  });
});
