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
    spargeVolume: { type: Number, required: true },
    efficiency: { type: Number, required: true },
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
        amount: { type: Schema.Types.Mixed, required: true },
      },
    ],
    hops: [
      {
        name: { type: String, required: true },

        nameId: { type: Schema.Types.ObjectId, ref: "Hop" },
        amount: { type: Schema.Types.Mixed, required: true },
      },
    ],
    yeasts: [
      {
        name: { type: String, required: true },

        nameId: { type: Schema.Types.ObjectId, ref: "Yeast" },
        amount: { type: Schema.Types.Mixed, required: true },
      },
    ],
    others: [
      {
        name: { type: String, required: true },
        description: { type: String },
        nameId: { type: Schema.Types.ObjectId, ref: "Other" },
        amount: { type: Schema.Types.Mixed },
      },
    ],
    salts: [
      {
        name: { type: String, required: false },
        amount: { type: Schema.Types.Mixed, required: false },
      },
    ],
    mash: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        temperature: { type: Schema.Types.Mixed, required: false },
        duration: { type: Schema.Types.Mixed, required: false },
      },
    ],
    boil: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        temperature: { type: Schema.Types.Mixed, required: false },
        duration: { type: Schema.Types.Mixed, required: false },
      },
    ],
    fermentation: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        temperature: { type: Schema.Types.Mixed, required: false },
        duration: { type: Schema.Types.Mixed, required: false },
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
