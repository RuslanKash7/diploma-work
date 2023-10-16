import { createAction, createSlice } from "@reduxjs/toolkit";
import basketService from "../services/basket.service";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
    },
    basketReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    basketRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // basketCreated: (state, action) => {
    //   state.entities.push(action.payload);
    // },
    basketCreated: (state, action) => {
      let newItem = [...state.entities];
      const alreadyExists = state.entities.find(({ productId }) => productId === action.payload.productId);

      if (alreadyExists) {
        newItem = newItem.map((item) => {
          return item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newItem.push({ ...action.payload, quantity: 1 });

      state.entities = newItem;
      },
    basketRemoved: (state, action) => {
      state.entities = state.entities.filter((b) => b._id !== action.payload);
    },
    basketUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: basketReducer, actions } = basketSlice;

const { basketRequested, basketReceved, basketRequestFailed, basketCreated, basketRemoved, basketUpdateSuccessed } =
  actions;

const addToBasketRequested = createAction("basket/addToBasketRequested");
const removeBasketRequested = createAction("basket/removeBasketRequested");
const updateBasketRequested = createAction("basket/updateBasketRequested");
const updateBasketFailed = createAction("basket/updateBasketFailed");

export const loadBasketList = () => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const { content } = await basketService.get();
    dispatch(basketReceved(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const getBasketByUsersId = (userId) => (state) => {
  if (state.basket.entities) {
    return state.basket.entities.filter((b) => b.currentUserId === userId);
  }
};

export const getBasket = () => (state) => state.basket.entities;

export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;

export const addToBasket = (payload) => async (dispatch) => {
  dispatch(addToBasketRequested());
  try {
    console.log(payload);
    const { content } = await basketService.createBasket(payload);
    dispatch(basketCreated(content));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const removeBasket = (basketId) => async (dispatch) => {
  dispatch(removeBasketRequested());
  try {
    const { content } = await basketService.removeBasket(basketId);
    if (!content) {
      dispatch(basketRemoved(basketId));
    }
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const updateBasket = (payload) => async (dispatch) => {
  dispatch(updateBasketRequested());
  try {
    const { content } = await basketService.update(payload);
    dispatch(basketUpdateSuccessed(content));
  } catch (error) {
    dispatch(updateBasketFailed(error.message));
  }
};


export default basketReducer;
