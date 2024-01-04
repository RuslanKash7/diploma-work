import { createAction, createSlice } from "@reduxjs/toolkit";
import history from "../utils/history";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import cartService from "../services/cart.service";
import { generetaAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userCardAddSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    makePurchaseSuccessed: (state, action) => {
      console.log(action.payload);
      // state.entities.push(action.payload);
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },
    productRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // userUpdateSuccessed: (state, action) => {
    //   state.entities[
    //     state.entities.findIndex((u) => u._id === action.payload._id)
    //   ] = action.payload;
    // },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFailed,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userCardAddSuccessed,
  makePurchaseSuccessed,
} = actions;

const authRequested = createAction("users/authRequested");
const addUserCartRequested = createAction("users/addUserCartRequested");
const makePurchaseRequested = createAction("users/makePurchaseRequested");
const changeUserCardRequested = createAction("users/changeUserCardRequested");
const addUserCartFailed = createAction("users/addUserCartFailed");
const removeProductRequested = createAction("users/removeProductRequested");
// const userUpdateFailed = createAction("users/userUpdateFailed");
// const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
  ({ payload }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    dispatch(usersRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      console.log(data);
      const { content } = await userService.get();
      dispatch(usersReceved(content));
      history.push("/");
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("/");
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const addUserCart = (payload) => async (dispatch) => {
  dispatch(addUserCartRequested());
  try {
    const { content } = await cartService.createCart(payload);
    dispatch(userCardAddSuccessed(content));
  } catch (error) {
    dispatch(addUserCartFailed(error.message));
  }
};

export const removeProductFromUserCart = (payload) => async (dispatch) => {
  dispatch(removeProductRequested());
  try {
    const { content } = await cartService.removeProduct(payload);
    dispatch(userCardAddSuccessed(content));
  } catch (error) {
    dispatch(addUserCartFailed(error.message));
  }
};

export const changeProdQuantity = (payload) => async (dispatch) => {
  dispatch(changeUserCardRequested());
  try {
    const { content } = await cartService.changeCart(payload);
    dispatch(userCardAddSuccessed(content));
  } catch (error) {
    dispatch(addUserCartFailed(error.message));
  }
};

export const makePurchase = (payload) => async (dispatch) => {
  dispatch(makePurchaseRequested());
  try {
    console.log(payload);
    const { content } = await cartService.makePurchase(payload);
    console.log(content);
    dispatch(makePurchaseSuccessed(content));
  } catch (error) {
    dispatch(addUserCartFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;

export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === state.users.auth.userId);
  }
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
