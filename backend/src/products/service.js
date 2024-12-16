const express = require("express");
const { Product } = require("../schema/index");
const router = express.Router();
const { upload } = require("../../server");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./dal");

// Create Product
router.post("/add", upload.array("images", 5), async (req, res) => {
  const { sku, quantity, name, description } = req.body;

  if (!sku || !quantity || !name) {
    return res
      .status(400)
      .json({ error: "SKU, quantity, and name are required" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one image is required" });
  }

  const imagePaths = req.files.map((file) => ({
    url: `/uploads/${file.filename}`,
    isThumbnail: false,
  }));

  try {
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({
        error:
          "SKU must be unique. This SKU is already in use by another product.",
      });
    }

    const newProduct = await addProduct({
      sku,
      quantity,
      name,
      description,
      images: imagePaths,
    });

    res.status(201).json({ status: true, product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve all products
router.get("/all", async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve a product by ID
router.get("/:id", async (req, res) => {
  const get_id = req.params.id;
  try {
    const product = await getProductById(get_id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Product by ID
router.put("/:id", upload.array("images", 5), async (req, res) => {
  const update_id = req.params.id;
  const { sku, name, quantity, description } = req.body;
  const images = req.files;

  try {
    // Check if SKU is unique (similar to addProduct)
    if (sku) {
      const existingProduct = await Product.findOne({ sku });

      if (existingProduct) {
        return res.status(411).json({
          error:
            "SKU must be unique. This SKU is already in use by another product. Product update aborted.",
        });
      }
    }
    // Update product in the database
    const updatedProduct = await updateProduct(update_id, {
      sku,
      name,
      quantity,
      description,
      images: images.map((file) => ({ url: file.path, isThumbnail: false })), // Assume you have logic for thumbnails
    });

    res.status(200).json({ status: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  const delete_Id = req.params.id;
  try {
    const deleted = await deleteProduct(delete_Id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
