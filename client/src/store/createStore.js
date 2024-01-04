import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import productsReducer from "./products";
import typesReducer from "./type";
import brandsReducer from "./brands";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  types: typesReducer,
  brands: brandsReducer,
  comments: commentsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
