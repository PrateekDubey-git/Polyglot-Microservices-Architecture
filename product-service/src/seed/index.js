require("dotenv").config();
const connectDB = require("../config/db");

const seedCategories = require("./categories.seed");
const seedMaterials = require("./material.seed");
const seedCatalogues = require("./catalogue.seed");

const runSeed = async () => {
  try {
    await connectDB();

  
const categories = await seedCategories();
await seedMaterials(categories);
await seedCatalogues(categories);


    console.log("🌱 PRODUCT SERVICE SEEDING COMPLETE");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
};

runSeed();
