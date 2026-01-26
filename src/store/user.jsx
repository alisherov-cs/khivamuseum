import { createSlice } from '@reduxjs/toolkit';
import { default_loader } from '../constant';

export const initialState = {
  user: {},
  token: localStorage.getItem('access-token') || '',
  main_loader: {
    begin: true,
  },
  screen_loader: {},
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {};
      state.token = '';
      localStorage.removeItem('access-token');
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('access-token', action.payload);
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    updateLoader: (state, action) => {
      const {
        loader_key = default_loader,
        value: { key = null, loading },
      } = action.payload;
      if (!state[loader_key]) state[loader_key] = {};
      if (!key) {
        state[loader_key] = {
          ...state[loader_key],
          unknown_loaders:
            (state[loader_key]?.unknown_loaders || 0) + (loading ? 1 : -1),
        };
      } else {
        state[loader_key] = { ...state[loader_key], [key]: loading };
      }
    },
    incrementCart: (state, action) => {
      const item = action.payload;
      const found = state.cart.find((c) => c.item.id === item.id);
      if (found) {
        found.quantity += 1;
      } else {
        state.cart.push({ quantity: 1, item });
      }
      saveCartToLocalStorage(state.cart);
    },
    decrementCart: (state, action) => {
      const id = action.payload;
      const found = state.cart.find((c) => c.item.id === id);
      if (found && found.quantity > 1) {
        found.quantity -= 1;
      } else if (found) {
        state.cart = state.cart.filter((c) => c.item.id !== id);
      }
      saveCartToLocalStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((c) => c.item.id !== id);
      saveCartToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
    },
  },
});

export const {
  updateUser,
  updateToken,
  updateUserToken,
  updateTheme,
  updateLoader,
  logoutUser,
  incrementCart,
  decrementCart,
  clearCart,
  removeFromCart,
} = userSlice.actions;

export const getUser = (state) => state.user;

export default userSlice.reducer;
