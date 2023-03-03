import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./api/users/index.js";
import beerRouter from "./api/beerBJCP/index.js";
import passport from "passport";

const server = express();

const port = process.env.PORT || 3001;

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

server.use(cors());
server.use(express.json());
server.use("/users", userRouter);
server.use("/beers", beerRouter);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on Port: ${port}`);
  });
});
