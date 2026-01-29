const express = require("express");
const router = express.Router();

const {
  getMaterialsByCategory,
  getSelectableMaterials,
} = require("../modules/materials/material.controller");

/**
 * Get all materials by category
 */
router.get(
  "/category/:categoryId",
  getMaterialsByCategory
);

/**
 * Get user selectable materials by category
 * ✅ MATCHES FRONTEND
 */
router.get(
  "/category/:categoryId/selectable",
  getSelectableMaterials
);

module.exports = router;
