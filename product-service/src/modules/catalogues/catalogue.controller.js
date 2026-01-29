const catalogueService = require("./catalogue.service");

const getCataloguesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const catalogues =
      await catalogueService.getCataloguesByCategory(categoryId);

    res.json(catalogues);
  } catch (err) {
    console.error("GET CATALOGUES ERROR", err);
    res.status(500).json({ message: "Failed to load catalogues" });
  }
};

const getCatalogueDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const catalogue = await catalogueService.getCatalogueById(id);

    if (!catalogue) {
      return res.status(404).json({ message: "Catalogue not found" });
    }

    res.json(catalogue);
  } catch (err) {
    console.error("GET CATALOGUE ERROR", err);
    res.status(500).json({ message: "Failed to load catalogue" });
  }
};

module.exports = {
  getCataloguesByCategory,
  getCatalogueDetail,
};
