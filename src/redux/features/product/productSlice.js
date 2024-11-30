import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        const response = await fetch("/api/products");
        const data = await response.json();
        return data.data;
    }
);

// export const createProduct = createAsyncThunk(
//     "products/createProduct",
//     async (newProduct) => {
//         if (
//             !newProduct.name ||
//             !newProduct.price ||
//             !newProduct.images ||
//             !newProduct.description ||
//             !newProduct.quantity ||
//             !newProduct.sku
//         ) {
//             throw new Error("Please fill in all fields");
//         }

//         const response = await fetch("/api/products", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newProduct),
//         });

//         const data = await response.json();
//         return data.data;
//     }
// );
export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id) => {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch product");
        }
        return data.data;
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (newProduct) => {
        // Prepare the data for the API request
        const formData = new FormData();

        // Append form fields to FormData
        Object.keys(newProduct).forEach((key) => {
            if (key === "images") {
                // Append each image from the array
                newProduct[key].forEach((image) => {
                    formData.append("images", image);
                });
            } else {
                formData.append(key, newProduct[key]);
            }
        });

        // Send the request to create a new product
        const response = await fetch("/api/products", {
            method: "POST",
            body: formData, // Send FormData instead of JSON
        });

        const data = await response.json();
        return data.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (pid) => {
        const response = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return pid;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ pid, updatedProduct }) => {
        const response = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data.data;
    }
);

// Slice
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

// export const
export const { setProducts, addToFavourite, removeFromFavourite } =
    productSlice.actions;
export default productSlice.reducer;
