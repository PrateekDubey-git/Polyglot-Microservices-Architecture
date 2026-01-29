const Catalogue = require("./catalogue.model");

const getCataloguesByCategory = async (categoryId) => {
  return Catalogue.find({
    category_id: categoryId,
    is_active: true,
  });
};

const getCatalogueById = async (catalogueId) => {
  return Catalogue.findOne({
    _id: catalogueId,
    is_active: true,
  });
  //.populate("material_id"); // only if fixed catalogue
};

module.exports = {
  getCataloguesByCategory,
  getCatalogueById,
};
