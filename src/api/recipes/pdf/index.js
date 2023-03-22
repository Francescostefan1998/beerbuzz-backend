import express from "express";
import pdfmake from "pdfmake";
import PdfPrinter from "pdfmake";
import RecipeModel from "../model.js";

const pdfRouter = express.Router();

pdfRouter.get("/recipes/:recipeId/pdf", async (req, res) => {
  try {
    console.log("pdf download function triggered");
    const recipe = await RecipeModel.findById(req.params.recipeId);
    if (recipe) {
      const fonts = {
        Roboto: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
          bolditalic: "Helvetica-BoldOblique",
        },
      };
      const docDefinition = {
        content: [
          { text: recipe.name, style: "header" },
          { text: "Salts", style: "subheader" },
          {
            ul: recipe.salts.map(
              (malts) => malts.name + ": " + malts.amount + "kg"
            ),
          },
          { text: "Malts", style: "subheader" },
          {
            ul: recipe.malts.map(
              (malts) => malts.name + ": " + malts.amount + "kg"
            ),
          },

          { text: "Hops", style: "subheader" },
          {
            ul: recipe.hops.map(
              (malts) => malts.name + ": " + malts.amount + "kg"
            ),
          },
          { text: "Yeasts", style: "subheader" },
          {
            ul: recipe.yeasts.map(
              (malts) => malts.name + ": " + malts.amount + "kg"
            ),
          },
          { text: "Others", style: "subheader" },
          {
            ul: recipe.others.map(
              (malts) => malts.name + ": " + malts.amount + "kg"
            ),
          },
          { text: "Mash", style: "subheader" },

          {
            style: "tableExample",
            table: {
              widths: [100, "*", 200, "*"],
              body: recipe.mash.map((mash) => [
                `${mash.name}`,
                `${mash.duration}min`,
                `${mash.temperature}C`,
                mash.description,
              ]),
            },
          },
          { text: "Boil", style: "subheader" },

          {
            style: "tableExample",
            table: {
              widths: [100, "*", 200, "*"],
              body: recipe.boil.map((mash) => [
                mash.name,
                `${mash.duration}min`,
                `${mash.temperature}C`,
                mash.description,
              ]),
            },
          },
          { text: "Fermentation", style: "subheader" },

          {
            style: "tableExample",
            table: {
              widths: [100, "*", 200, "*"],
              body: recipe.fermentation.map((mash) => [
                mash.name,
                `${mash.duration}min`,
                `${mash.temperature}C`,
                mash.description,
              ]),
            },
          },
          { text: "Chart", style: "subheader" },

          {
            style: "tableExample",
            table: {
              widths: [100, "*"],
              body: recipe.chart.map((mash) => [
                `${mash.day}day`,
                `${mash.temperature}C`,
              ]),
            },
          },
          { text: "Comments", style: "subheader" },
          {
            ul: recipe.comments.map(
              (malts) => malts.name + ": " + malts.comment
            ),
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },
        },
        defaultStyle: {
          // alignment: 'justify'
        },
      };
      const printer = new PdfPrinter(fonts);
      const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
      pdfReadableStream.end();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="recipe.pdf"');
      pdfReadableStream.pipe(res);
    } else {
      res.status(404).send(`recipe with id ${req.params.recipeId} not found`);
    }
  } catch (error) {
    res.status(500).json({ message: "error generating pdf" });
    console.log(error);
  }
});

export default pdfRouter;
