const categoryService = require("./category.service");

const getCategories = async (req, res) => {
  try {
    const data = await categoryService.getAllCategories();
    res.json(data);
  } catch (err) {
    console.error("GET CATEGORIES ERROR", err);
    res.status(500).json({ message: "Failed to load categories" });
  }
};

const getCategoryDetail = async (req, res) => {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("GET CATEGORY ERROR", err);
    res.status(500).json({ message: "Failed to load category" });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const data = await categoryService.getChildCategories(req.params.id);
    res.json(data);
  } catch (err) {
    console.error("GET SUB CATEGORIES ERROR", err);
    res.status(500).json({ message: "Failed to load sub categories" });
  }
};

// 🔹 ADMIN
const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error("CREATE CATEGORY ERROR", err);
    res.status(500).json({ message: "Failed to create category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("UPDATE CATEGORY ERROR", err);
    res.status(500).json({ message: "Failed to update category" });
  }
};

module.exports = {
  getCategories,
  getCategoryDetail,
  getSubCategories,
  createCategory,
  updateCategory,
};
