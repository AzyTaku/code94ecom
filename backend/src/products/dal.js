const { Product } = require("../schema/index");

// Add a new product
async function addProduct({ sku, quantity, name, description, images }) {
  try {
    const newProduct = await Product.create({
      sku,
      quantity,
      name,
      description,
      images,
    });
    return newProduct;
  } catch (error) {
    console.log("Product creation failed:", error);
    throw error;
  }
}

// Get all products
async function getProducts() {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
}

// Get a single product by ID
async function getProductById(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error("Error retrieving product:", error);
    throw error;
  }
}

// Update a product by ID
async function updateProduct(id, data) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product by ID
async function deleteProduct(id) {
  try {
    await Product.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
