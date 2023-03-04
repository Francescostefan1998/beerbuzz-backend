import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    style: { type: String, required: true },
    batchVolume: { type: Number, required: true },
    abv: { type: Number, required: true },
    ebc: { type: Number, required: true },
    ibu: { type: Number, required: true },
    og: { type: Number, required: true },
    fg: { type: Number, required: true },
    ingredients: {
      malts: [
        {
          nameId: { type: Schema.Types.ObjectId, ref: "Malt" },
          amount: { type: Number, required: true },
        },
      ],
      hops: [
        {
          nameId: { type: Schema.Types.ObjectId, ref: "Hop" },
          amount: { type: Number, required: true },
        },
      ],
      yeasts: [
        {
          nameId: { type: Schema.Types.ObjectId, ref: "Yeast" },
          amount: { type: Number, required: true },
        },
      ],
      others: [
        {
          nameId: { type: Schema.Types.ObjectId, ref: "Other" },
          amount: { type: Number },
        },
      ],
    },
    mash: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        temperature: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],
    boil: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        temperature: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],
    fermentation: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        temperature: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],
    comments: [{ comment: { type: Schema.Types.ObjectId, ref: "Comment" } }],
  },
  {
    timestamps: true,
  }
);

export default model("Recipe", recipeSchema);
