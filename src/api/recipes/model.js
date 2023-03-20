import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    author: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    style: { type: String },
    batchVolume: { type: Number, required: true },
    mashVolume: { type: Number, required: true },
    preBoil: { type: Number, required: true },
    postBoil: { type: Number, required: true },
    abv: { type: Number, required: true },
    ebc: { type: Number, required: true },
    ibu: { type: Number, required: true },
    og: { type: Number, required: true },
    fg: { type: Number, required: true },
    malts: [
      {
        name: { type: String, required: true },
        nameId: { type: Schema.Types.ObjectId, ref: "Malt" },
        amount: { type: Number, required: true },
      },
    ],
    hops: [
      {
        name: { type: String, required: true },

        nameId: { type: Schema.Types.ObjectId, ref: "Hop" },
        amount: { type: Number, required: true },
      },
    ],
    yeasts: [
      {
        name: { type: String, required: true },

        nameId: { type: Schema.Types.ObjectId, ref: "Yeast" },
        amount: { type: Number, required: true },
      },
    ],
    others: [
      {
        name: { type: String, required: true },
        description: { type: String },
        nameId: { type: Schema.Types.ObjectId, ref: "Other" },
        amount: { type: Number },
      },
    ],
    salts: [
      {
        name: { type: String, required: false },
        amount: { type: Number, required: false },
      },
    ],
    mash: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        temperature: { type: Number, required: false },
        duration: { type: Number, required: false },
      },
    ],
    boil: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        temperature: { type: Number, required: false },
        duration: { type: Number, required: false },
      },
    ],
    fermentation: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        temperature: { type: Number, required: false },
        duration: { type: Number, required: false },
      },
    ],

    comments: [],
    chart: [],
  },
  {
    timestamps: true,
  }
);

export default model("Recipe", recipeSchema);
