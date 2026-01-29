const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true,
      unique: true
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    // true = user can select this material
    // false = system-fixed material
    is_user_selectable: {
      type: Boolean,
      default: true
    },

    price_per_sqft: {
      type: Number,
      required: true
    },

    material_grade: {
  type: String,
  required: true,
  trim: true
}
,

    description: {
      type: String
    },

    features: {
      type: [String],
      default: []
    },

    specs: [
      {
        key: String,
        value: String
      }
    ],

    image_url: {
      type: String
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

module.exports = mongoose.model("Material", materialSchema);
