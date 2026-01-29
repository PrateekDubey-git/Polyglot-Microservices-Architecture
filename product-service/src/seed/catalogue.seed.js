const Catalogue = require("../modules/catalogues/catalogue.model");

const seedCatalogues = async (categories) => {
  await Catalogue.deleteMany();

  const map = {};
  categories.forEach((c) => (map[c.slug] = c._id));

  await Catalogue.insertMany([
    // ================= WALLPAPER =================
    {
      name: "Abstract Geometric Wallpaper",
      category_id: map["wallpaper"],
      variant: "wallpaper",
      style: "Abstract",
      image_url: "/placeholder.svg?height=400&width=400",
      price_per_sqft: 45,
      allows_custom_size: true,
      allows_material_selection: true,
    },

    // ================= CANVAS =================
    {
      name: "Modern Canvas Art",
      category_id: map["canvas"],
      variant: "canvas",
      style: "Modern Art",
      image_url: "/placeholder.svg?height=400&width=400",
      fixed_price: 499,
      allows_custom_size: false,
      allows_material_selection: false,
    },

    // ================= GLASS FILMS =================
    {
      name: "Geometric Glass Film",
      category_id: map["glass-films"],
      variant: "glass-film",
      style: "Geometric",
      image_url: "/placeholder.svg?height=400&width=400",
      price_per_sqft: 45,
      allows_custom_size: true,
      allows_material_selection: false,
    },

    // ================= ROLLER BLINDS =================
    {
      name: "Office Roller Blind",
      category_id: map["roller-blinds"],
      parent_category_id: map["blinds"],
      variant: "roller",
      style: "Commercial",
      image_url: "/placeholder.svg?height=400&width=400",
      price_per_sqft: 75,
      allows_custom_size: true,
      allows_material_selection: true,
    },

    // ================= ROMAN BLINDS =================
    {
      name: "Luxury Roman Blind",
      category_id: map["roman-blinds"],
      parent_category_id: map["blinds"],
      variant: "roman",
      style: "Luxury",
      image_url: "/placeholder.svg?height=400&width=400",
      price_per_sqft: 85,
      allows_custom_size: true,
      allows_material_selection: true,
    },

    // ================= WOODEN BLINDS =================
    {
      name: "Classic Wooden Blind",
      category_id: map["wooden-blinds"],
      parent_category_id: map["blinds"],
      variant: "wooden",
      style: "Classic",
      image_url: "/placeholder.svg?height=400&width=400",
      price_per_sqft: 120,
      allows_custom_size: false,
      allows_material_selection: false,
    },
  ]);

  console.log("✅ Catalogues seeded");
};

module.exports = seedCatalogues;
