import { createAction, createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brand.service";

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    brandsRequested: (state) => {
      state.isLoading = true;
    },
    brandsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    brandsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    brandCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    brandRemoved: (state, action) => {
      state.entities = state.entities.filter((t) => t._id !== action.payload);
    },
    brandUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: brandsReducer, actions } = brandsSlice;

const {
  brandsRequested,
  brandsReceved,
  brandsRequestFailed,
  brandCreated,
  brandRemoved,
  brandUpdateSuccessed,
} = actions;

const addBrandRequested = createAction("brands/addBrandRequested");
const removeBrandRequested = createAction("brands/removeBrandsRequested");
const updateBrandRequested = createAction("brands/updateBrandsRequested");
const updateBrandFailed = createAction("brands/updateBrandFailed");

export const loadBrandsList = () => async (dispatch) => {
  dispatch(brandsRequested());
  try {
    const { content } = await brandService.get();
    dispatch(brandsReceved(content));
  } catch (error) {
    dispatch(brandsRequestFailed(error.message));
  }
};

export const createNewBrand = (payload) => async (dispatch) => {
  dispatch(addBrandRequested());
  try {
    const { content } = await brandService.createBrand(payload);
    dispatch(brandCreated(content));
  } catch (error) {
    dispatch(brandsRequestFailed(error.message));
  }
};

export const removeBrand = (brandId) => async (dispatch) => {
  dispatch(removeBrandRequested());
  try {
    const { content } = await brandService.removeBrand(brandId);
    if (!content) {
      dispatch(brandRemoved(brandId));
    }
  } catch (error) {
    dispatch(brandsRequestFailed(error.message));
  }
};

export const updateBrand = (payload) => async (dispatch) => {
  dispatch(updateBrandRequested());
  try {
    const { content } = await brandService.update(payload);
    dispatch(brandUpdateSuccessed(content));
  } catch (error) {
    dispatch(updateBrandFailed(error.message));
  }
};

export const getBrands = () => (state) => state.brands.entities;

export const getBrandsLoadingStatus = () => (state) => state.brands.isLoading;

export const getBrandById = (brandId) => (state) => {
  if (state.brands.entities) {
    return state.brands.entities.find((p) => p._id === brandId);
  }
};

export default brandsReducer;
