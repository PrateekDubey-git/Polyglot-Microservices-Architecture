const materialService = require("./material.service");

/**
 * GET /materials/category/:categoryId
 */
const getMaterialsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const materials =
      await materialService.getMaterialsByCategory(categoryId);

    res.json(materials);
  } catch (error) {
    console.error("GET MATERIALS ERROR", error);
    res.status(500).json({ message: "Failed to load materials" });
  }
};

/**
 * GET /materials/selectable/:categoryId
 */
const getSelectableMaterials = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const materials =
      await materialService.getSelectableMaterialsByCategory(categoryId);

    res.json(materials);
  } catch (error) {
    console.error("GET SELECTABLE MATERIALS ERROR", error);
    res.status(500).json({ message: "Failed to load materials" });
  }
};

module.exports = {
  getMaterialsByCategory,
  getSelectableMaterials,
};
