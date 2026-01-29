const express = require("express");
const router = express.Router();
const controller = require("../modules/categories/category.controller");
const verifyAdmin = require("../middlewares/auth.middleware");

// public
router.get("/", controller.getCategories);
router.get("/:slug", controller.getCategoryDetail);
router.get("/parent/:id", controller.getSubCategories);

// admin
router.post("/", verifyAdmin, controller.createCategory);
router.patch("/:id", verifyAdmin, controller.updateCategory);

module.exports = router;
