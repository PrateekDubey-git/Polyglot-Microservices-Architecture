const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    parent_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },

    allows_customization: {
      type: Boolean,
      default: false
    },

    has_catalogue: {
      type: Boolean,
      default: false
    },

    allows_material_selection: {
      type: Boolean,
      default: false
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Category", categorySchema);
