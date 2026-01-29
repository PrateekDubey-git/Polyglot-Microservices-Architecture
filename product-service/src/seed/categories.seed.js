const Category = require("../modules/categories/category.model");

const seedCategories = async () => {
  await Category.deleteMany();

  // ================= ROOT CATEGORIES =================
  const roots = await Category.insertMany([
    {
      name: "Wallpaper",
      slug: "wallpaper",
      has_catalogue: true,
      allows_customization: true,
      allows_material_selection: true,
    },
    {
      name: "Blinds",
      slug: "blinds",
    },
    {
      name: "Canvas",
      slug: "canvas",
      has_catalogue: true,
    },
    {
      name: "Glass Films",
      slug: "glass-films",
      has_catalogue: true,
      allows_customization: true,
    },
    {
      name: "Curtains",
      slug: "curtains",
      has_catalogue: true,
      allows_customization: true,
      allows_material_selection: true,
    },
  ]);

  const map = {};
  roots.forEach((c) => (map[c.slug] = c._id));

  // ================= BLINDS CHILD CATEGORIES =================
  const blindsChildren = await Category.insertMany([
    {
      name: "Roller Blinds",
      slug: "roller-blinds",
      parent_category: map["blinds"],
      has_catalogue: true,
      allows_customization: true,
      allows_material_selection: true,
    },
    {
      name: "Zebra Blinds",
      slug: "zebra-blinds",
      parent_category: map["blinds"],
      has_catalogue: true,
      allows_customization: true,
      allows_material_selection: true,
    },
    {
      name: "Vertical Blinds",
      slug: "vertical-blinds",
      parent_category: map["blinds"],
      has_catalogue: true,
      allows_customization: true,
      allows_material_selection: true,
    },
    {
      name: "Roman Blinds",
      slug: "roman-blinds",
      parent_category: map["blinds"],
      has_catalogue: true,
      allows_customization: true,
      allows_material_selection: true,
    },
    {
      name: "Wooden Blinds",
      slug: "wooden-blinds",
      parent_category: map["blinds"],
      has_catalogue: true,
      allows_customization: false, // ❗ as discussed
      allows_material_selection: false,
    },
  ]);

  console.log("✅ Categories seeded");
  return [...roots, ...blindsChildren];
};

module.exports = seedCategories;
