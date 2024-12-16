const mongoose = require("mongoose");

// Define the Product Schema
const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  images: [
    {
      url: { type: String, required: true },
      isThumbnail: { type: Boolean, default: false }, // Allows one image to be featured as thumbnail
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Function to set one image as the thumbnail
productSchema.methods.setThumbnail = function (imageUrl) {
  this.images.forEach((image) => {
    image.isThumbnail = image.url === imageUrl;
  });
};

module.exports = productSchema;
