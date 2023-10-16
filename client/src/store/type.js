import { createAction, createSlice } from "@reduxjs/toolkit";
import typeService from "../services/type.service";

const typesSlice = createSlice({
  name: "types",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    typesRequested: (state) => {
      state.isLoading = true;
    },
    typesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    typesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    typeCreated: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

const { reducer: typesReducer, actions } = typesSlice;

const { typesRequested, typesReceved, typesRequestFailed, typeCreated } =
  actions;

const addTypeRequested = createAction("types/addTypeRequested");

export const loadTypesList = () => async (dispatch) => {
  dispatch(typesRequested());
  try {
    const { content } = await typeService.get();
    dispatch(typesReceved(content));
  } catch (error) {
    dispatch(typesRequestFailed(error.message));
  }
};

export const createNewType = (payload) => async (dispatch) => {
  dispatch(addTypeRequested());
  try {
    const { content } = await typeService.createType(payload);
    dispatch(typeCreated(content));
  } catch (error) {
    dispatch(typesRequestFailed(error.message));
  }
};

export const getTypes = () => (state) => state.types.entities;

export const getTypesLoadingStatus = () => (state) => state.types.isLoading;

export default typesReducer;
