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
    typeRemoved: (state, action) => {
      state.entities = state.entities.filter((t) => t._id !== action.payload);
    },
    typeUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: typesReducer, actions } = typesSlice;

const {
  typesRequested,
  typesReceved,
  typesRequestFailed,
  typeCreated,
  typeRemoved,
  typeUpdateSuccessed,
} = actions;

const addTypeRequested = createAction("types/addTypeRequested");
const removeTypeRequested = createAction("types/removeTypesRequested");
const updateTypeRequested = createAction("types/updateTypesRequested");
const updateTypeFailed = createAction("types/updateTypeFailed");

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

export const removeType = (typeId) => async (dispatch) => {
  dispatch(removeTypeRequested());
  try {
    console.log(typeId)
    const { content } = await typeService.removeType(typeId);
    console.log(content)
    if (!content) {
      dispatch(typeRemoved(typeId));
    }
  } catch (error) {
    dispatch(typesRequestFailed(error.message));
  }
};

export const updateType = (payload) => async (dispatch) => {
  dispatch(updateTypeRequested());
  try {
    const { content } = await typeService.update(payload);
    dispatch(typeUpdateSuccessed(content));
  } catch (error) {
    dispatch(updateTypeFailed(error.message));
  }
};

export const getTypes = () => (state) => state.types.entities;

export const getTypesLoadingStatus = () => (state) => state.types.isLoading;

export default typesReducer;
