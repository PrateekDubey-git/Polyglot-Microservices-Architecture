const express = require("express");
const router = express.Router();

const catalogueController =
  require("../modules/catalogues/catalogue.controller");

// List designs by category
router.get(
  "/category/:categoryId",
  catalogueController.getCataloguesByCategory
);

// Single catalogue detail
router.get("/:id", catalogueController.getCatalogueDetail);

module.exports = router;
