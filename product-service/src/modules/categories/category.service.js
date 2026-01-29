const Category = require("./category.model");

const getAllCategories = async () => {
  return Category.find({ is_active: true }).sort({ createdAt: 1 });
};

const getCategoryBySlug = async (slug) => {
  return Category.findOne({ slug, is_active: true });
};

const getChildCategories = async (parentId) => {
  return Category.find({
    parent_category: parentId,
    is_active: true,
  });
};

// 🔹 ADMIN
const createCategory = async (data) => {
  return Category.create(data);
};

const updateCategory = async (id, data) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  getChildCategories,
  createCategory,
  updateCategory,
};
