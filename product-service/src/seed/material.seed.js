const Material = require("../modules/materials/material.model");

const seedMaterials = async (categories) => {
  await Material.deleteMany();

  const map = {};
  categories.forEach((c) => (map[c.slug] = c._id));

  await Material.insertMany([
    // ================= WALLPAPER =================
    {
      name: "FabricFresco – Matte",
      code: "WP-MATTE",
      category_id: map["wallpaper"],
      is_user_selectable: true,
      price_per_sqft: 45,
      material_grade: "Premium",
      features: ["Water", "Eco"],
      image_url: "/material/matte.jpg",
    },

    {
      name: "FabricFresco – Vinyl",
      code: "WP-VINYL",
      category_id: map["wallpaper"],
      is_user_selectable: true,
      price_per_sqft: 65,
      material_grade: "Commercial",
      features: ["Water", "Fire"],
      image_url: "/material/vinyl.jpg",
    },

    // ================= ROLLER BLINDS =================
    {
      name: "Blackout Roller",
      code: "RB-BO",
      category_id: map["roller-blinds"],
      is_user_selectable: true,
      price_per_sqft: 70,
      material_grade: "Blackout",
      features: ["UV Protection", "Privacy"],
      image_url: "/roller/blackout.jpg",
    },

    {
      name: "Sunscreen Roller",
      code: "RB-SS",
      category_id: map["roller-blinds"],
      is_user_selectable: true,
      price_per_sqft: 55,
      material_grade: "Sunscreen",
      features: ["Daylight View"],
      image_url: "/roller/sunscreen.jpg",
    },

    // ================= ZEBRA BLINDS =================
    {
      name: "Standard Zebra",
      code: "ZB-STD",
      category_id: map["zebra-blinds"],
      is_user_selectable: true,
      price_per_sqft: 75,
      material_grade: "Dual Shade",
      features: ["Light Control"],
      image_url: "/zebra/standard.jpg",
    },

    {
      name: "Premium Zebra",
      code: "ZB-PRM",
      category_id: map["zebra-blinds"],
      is_user_selectable: true,
      price_per_sqft: 95,
      material_grade: "Luxury",
      features: ["UV Protection"],
      image_url: "/zebra/premium.jpg",
    },

    // ================= VERTICAL BLINDS =================
    {
      name: "PVC Vertical",
      code: "VB-PVC",
      category_id: map["vertical-blinds"],
      is_user_selectable: true,
      price_per_sqft: 50,
      material_grade: "PVC",
      features: ["Waterproof"],
      image_url: "/vertical/pvc.jpg",
    },

    {
      name: "Fabric Vertical",
      code: "VB-FAB",
      category_id: map["vertical-blinds"],
      is_user_selectable: true,
      price_per_sqft: 65,
      material_grade: "Fabric",
      features: ["Washable"],
      image_url: "/vertical/fabric.jpg",
    },
  ]);

  console.log("✅ Materials seeded");
};

module.exports = seedMaterials;
