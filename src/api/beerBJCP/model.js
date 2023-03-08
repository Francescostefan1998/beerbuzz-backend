import mongoose from "mongoose";
const { Schema, model } = mongoose;

const beerSchema = new Schema(
  {
    name: { type: String, required: true },
    aroma: { type: String, required: true },
    apperance: { type: String, required: true },
    flavor: { type: String, required: true },
    ingredients: { type: String, required: true },
    stats: {
      ibu: [{ type: Number, required: true }],
      og: [{ type: Number, required: true }],
      fg: [{ type: Number, required: true }],
      ebc: [{ type: Number, required: true }],
      abv: [{ type: Number, required: true }],
    },
    waterProfile: {
      calcium: [{ type: Number, required: true }],
      magnesium: [{ type: Number, required: true }],
      alkalinity: [{ type: Number, required: true }],
      sulfate: [{ type: Number, required: true }],
      chloride: [{ type: Number, required: true }],
      sodium: [{ type: Number, required: true }],
      residualAlkalinity: [{ type: Number, required: true }],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Beer", beerSchema);
