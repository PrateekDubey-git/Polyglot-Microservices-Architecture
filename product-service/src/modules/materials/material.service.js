const Material = require("./material.model");

const getMaterialsByCategory = (categoryId) =>
  Material.find({ category_id: categoryId, is_active: true });

const getSelectableMaterialsByCategory = (categoryId) =>
  Material.find({
    category_id: categoryId,
    is_active: true,
    is_user_selectable: true,
  });

const createMaterial = (data) => Material.create(data);

const updateMaterial = (id, data) =>
  Material.findByIdAndUpdate(id, data, { new: true });

module.exports = {
  getMaterialsByCategory,
  getSelectableMaterialsByCategory,
  createMaterial,
  updateMaterial,
};
