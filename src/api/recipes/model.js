import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    author: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    style: { type: String, required: false },
    batchVolume: { type: Schema.Types.Mixed, required: false },
    spargeVolume: { type: Schema.Types.Mixed, required: false },
    efficiency: { type: Schema.Types.Mixed, required: false },
    mashVolume: { type: Schema.Types.Mixed, required: false },
    preBoil: { type: Schema.Types.Mixed, required: false },
    favourite: { type: String, required: false },
    postBoil: { type: Schema.Types.Mixed, required: false },
    abv: { type: Schema.Types.Mixed, required: false },
    ebc: { type: Schema.Types.Mixed, required: false },
    ibu: { type: Schema.Types.Mixed, required: false },
    og: { type: Schema.Types.Mixed, required: false },
    fg: { type: Schema.Types.Mixed, required: false },
    malts: [
      {
        name: { type: String, required: false },
        nameId: { type: Schema.Types.ObjectId, ref: "Malt" },
        amount: { type: Schema.Types.Mixed, required: false },
      },
    ],
    hops: [
      {
        name: { type: String, required: false },

        nameId: { type: Schema.Types.ObjectId, ref: "Hop" },
        amount: { type: Schema.Types.Mixed, required: false },
      },
    ],
    yeasts: [
      {
        name: { type: String, required: false },

        nameId: { type: Schema.Types.ObjectId, ref: "Yeast" },
        amount: { type: Schema.Types.Mixed, required: false },
      },
    ],
    others: [
      {
        name: { type: String, required: false },
        description: { type: String, required: false },
        nameId: { type: Schema.Types.ObjectId, ref: "Other" },
        amount: { type: Schema.Types.Mixed, required: false },
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
