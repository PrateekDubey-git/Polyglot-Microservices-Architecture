const express = require("express");
const router = express.Router();

const categoryRoutes = require("./category.routes");
const materialRoutes = require("./material.routes");
const catalogueRoutes = require("./catalogue.routes");

router.use("/categories", categoryRoutes);
router.use("/materials", materialRoutes);
router.use("/catalogues", catalogueRoutes);

module.exports = router;
