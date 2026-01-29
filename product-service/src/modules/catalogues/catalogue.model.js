// src/modules/catalogues/catalogue.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CatalogueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // UI navigation (roman-blinds / wallpaper / canvas)
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // optional but useful (blinds parent)
    parent_category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    // product meaning
    variant: {
      type: String, // roman / roller / zebra
    },

    style: {
      type: String, // Modern / Abstract / Nature
      index: true,
    },

    image_url: {
      type: String,
    },

    description: {
      type: String,
    },

    price_per_sqft: {
      type: Number,
    },

    fixed_price: {
      type: Number,
    },

    allows_custom_size: {
      type: Boolean,
      default: false,
    },

    allows_material_selection: {
      type: Boolean,
      default: false,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalogue", CatalogueSchema);
