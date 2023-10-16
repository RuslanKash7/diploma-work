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
  },
});

const { reducer: brandsReducer, actions } = brandsSlice;

const { brandsRequested, brandsReceved, brandsRequestFailed, brandCreated } = actions;

const addBrandRequested = createAction("brands/addBrandRequested");

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

export const getBrands = () => (state) => state.brands.entities;

export const getBrandsLoadingStatus = () => (state) => state.brands.isLoading;

export default brandsReducer;
