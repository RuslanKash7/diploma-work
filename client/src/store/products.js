import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    productCreated: (state, action) => {
      console.log(action.payload);
      state.entities.push(action.payload);
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },
    productUpdateSuccessed: (state, action) => {
      console.log(state)
      console.log(action)
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: productsReducer, actions } = productsSlice;

const {
  productsRequested,
  productsReceved,
  productsRequestFailed,
  productCreated,
  productRemoved,
  productUpdateSuccessed,
} = actions;

const addProductRequested = createAction("products/addProductRequested");
const removeProductRequested = createAction("products/removeProductsRequested");
const updateProductRequested = createAction("products/updateProductRequested");
const updateProductFailed = createAction("products/updateProductFailed");

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.get();
    dispatch(productsReceved(content));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};

export const getProducts = () => (state) => state.products.entities;

export const getProductsLoadingStatus = () => (state) =>
  state.products.isLoading;

export const getProductById = (productId) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find((p) => p._id === productId);
  }
};

export const getProductByManyIds = (productIds) => (state) => {
  if (state.products.entities) {
    const productsArray = [];
    for (const prodId of productIds) {
      for (const product of state.products.entities) {
        if (product._id === prodId) {
          productsArray.push(product);
          break;
        }
      }
    }
    return productsArray;
  }
  return [];
};

export const createNewProduct = (payload) => async (dispatch) => {
  dispatch(addProductRequested());
  try {
    console.log(payload)
    const { content } = await productService.createProduct(payload);
    console.log(content)
    dispatch(productCreated(content));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  dispatch(removeProductRequested());
  try {
    const { content } = await productService.removeProduct(productId);
    if (!content) {
      dispatch(productRemoved(productId));
    }
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};

export const updateProduct = (payload) => async (dispatch) => {
  dispatch(updateProductRequested());
  try {
    const { content } = await productService.update(payload);
    console.log(content)
    dispatch(productUpdateSuccessed(content));
  } catch (error) {
    dispatch(updateProductFailed(error.message));
  }
};

export default productsReducer;
