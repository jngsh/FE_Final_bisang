// src/config/apiConfig.js
export const API_BASE_URL = 'http:/localhost:8090';

export const endpoints = {
  GET_CART: (cartId) => `${API_BASE_URL}/bisang/carts/${cartId}`,
  GET_ITEMS: (cartId) => `${API_BASE_URL}/bisang/carts/${cartId}/items`,
  ADD_ITEM: `${API_BASE_URL}/bisang/carts/items`,
  UPDATE_ITEM: `${API_BASE_URL}/bisang/carts/items`,
  REMOVE_ITEM: (cartItemId) => `${API_BASE_URL}/bisang/carts/items/${cartItemId}`,
  CLEAR_CART: (cartId) => `${API_BASE_URL}/bisang/carts/${cartId}/items`,
};
