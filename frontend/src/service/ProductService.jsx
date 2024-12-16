import { API_URL } from "../store/index";

export class ProductServices {
    // Method to add a product
    async addProduct(sku, name, quantity, description, images) {
        const formData = new FormData();

        formData.append('sku', sku);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);

        images.forEach((image, index) => {
            formData.append('images', image);
        });
        console.log(sku, name, quantity, description, images)

        try {
            const response = await fetch(`${API_URL}/products/add`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Failed to add product:", error);
            throw error;
        }
    }

    // Method to update a product by ID
    async updateProduct(id, sku, name, quantity, description, images) {
        const formData = new FormData();

        formData.append('sku', sku);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);

        // If images are provided, append them to the form data
        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const updatedProduct = await response.json();
            console.log('Product updated:', updatedProduct);
            return updatedProduct;
        } catch (error) {
            console.error('Failed to update product:', error);
            if (error.message.includes("SKU")) {
                alert("Failed to update product: SKU Must be Unique");
            } else {
                alert(`Failed to update product: ${error.message}`);
            }
            throw error;
        }
    }

    // Method to delete a product by ID
    async deleteProduct(id) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const deletedProduct = await response.json();
            console.log('Product deleted:', deletedProduct);
            alert("Product deleted successfully!");
            return deletedProduct;
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert(`Failed to delete product: ${error.message}`);
            throw error;
        }
    }
}

export const productServices = new ProductServices();
