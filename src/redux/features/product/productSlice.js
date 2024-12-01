import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios.js";

const initialState = {
    productItems: [],
    favouriteItems: localStorage.getItem("favouriteItems")
        ? JSON.parse(localStorage.getItem("favouriteItems"))
        : [],
    status: "idle",
    error: null,
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProdcuts",
    async () => {
        const response = await axios.get("/api/products");
        return response.data.data;
    }
);

export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id) => {
        const response = await axios.get(`/api/products/${id}`);
        if (response.status !== 200) {
            throw new Error(response.data.message || "Failed to fetch product");
        }
        return response.data.data;
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (newProduct) => {
        const formData = new FormData();

        Object.keys(newProduct).forEach((key) => {
            if (key === "images") {
                newProduct[key].forEach((image) => {
                    formData.append("images", image);
                });
            } else {
                formData.append(key, newProduct[key]);
            }
        });

        try {
            const response = await axios.post("/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Check if the response status is 201 (created)
            if (response.status !== 201) {
                throw new Error(
                    response.data.message || "Failed to create product"
                );
            }

            return response.data.data;
        } catch (error) {
            // If the error is from the server, capture and return the error message
            if (error.response) {
                // Server responded with an error status
                console.error("Server error:", error.response.data);
                return error.response.data.message || "Server error";
            } else if (error.request) {
                // The request was made, but no response was received
                console.error("Request error:", error.request);
                return "No response from the server";
            } else {
                // Something happened in setting up the request
                console.error("Error message:", error.message);
                return error.message || "Unknown error occurred";
            }
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (pid) => {
        const response = await axios.delete(`/api/products/${pid}`);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return pid;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ pid, updatedProduct }) => {
        const response = await axios.put(
            `/api/products/${pid}`,
            updatedProduct,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data.data;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.productItems = action.payload;
        },
        addToFavourite: (state, action) => {
            const item = state.productItems.find(
                (product) => product._id === action.payload._id
            );
            if (item && !state.favouriteItems.includes(item)) {
                state.favouriteItems.push(item);
                localStorage.setItem(
                    "favouriteItems",
                    JSON.stringify(state.favouriteItems)
                );
            }
        },
        removeFromFavourite: (state, action) => {
            state.favouriteItems = state.favouriteItems.filter(
                (product) => product._id !== action.payload._id
            );
            localStorage.setItem(
                "favouriteItems",
                JSON.stringify(state.favouriteItems)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.productItems = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.productItems.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.productItems = state.productItems.filter(
                    (product) => product._id !== action.payload
                );
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.productItems.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.productItems[index] = action.payload;
                }
            });
    },
});

export const { setProducts, addToFavourite, removeFromFavourite } =
    productSlice.actions;
export default productSlice.reducer;
