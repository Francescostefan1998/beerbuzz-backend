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
      ibu: { type: String, required: true },
      og: { type: String, required: true },
      fg: { type: String, required: true },
      ebc: { type: String, required: true },
      abv: { type: String, required: true },
    },
    waterProfile: {
      calcium: { type: String, required: true },
      magnesium: { type: String, required: true },
      alkalinity: { type: String, required: true },
      sulfate: { type: String, required: true },
      chloride: { type: String, required: true },
      sodium: { type: String, required: true },
      residualAlkalinity: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default model("Beer", beerSchema);
