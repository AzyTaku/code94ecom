import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "./index";

// Async thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk("products/all", async () => {
  console.log("Fetching products from:", `${API_URL}/products`);
  const response = await fetch(`${API_URL}/products/all`);
  if (!response.ok) {
    console.error("Failed to fetch products. Status:", response.status);
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  console.log("Fetched products:", data);
  return data;
});

// Async thunk to upload multiple images
export const uploadImages = createAsyncThunk(
  "products/uploadImages",
  async (formData) => {
    console.log("Uploading images with formData:", formData);
    const response = await fetch(`${API_URL}/upload-multiple`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Failed to upload images. Status:", response.status);
      throw new Error("Failed to upload images");
    }
    const data = await response.json();
    console.log("Uploaded images response:", data);
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    uploadStatus: "idle",
    uploadError: null,
    fetchStatus: "idle",
    fetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        console.log("Fetching products...");
        state.fetchStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("Fetched products:", action.payload);
        state.fetchStatus = "succeeded";
        state.items = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.error("Failed to fetch products:", action.error.message);
        state.fetchStatus = "failed";
        state.fetchError = action.error.message;
      })
      // Upload images
      .addCase(uploadImages.pending, (state) => {
        console.log("Uploading images...");
        state.uploadStatus = "loading";
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        console.log("Images uploaded successfully:", action.payload);
        state.uploadStatus = "succeeded";
        state.items = [...state.items, ...action.payload.files];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        console.error("Failed to upload images:", action.error.message);
        state.uploadStatus = "failed";
        state.uploadError = action.error.message;
      });
  },
});

export default productsSlice.reducer;
