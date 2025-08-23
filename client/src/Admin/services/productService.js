// // import axios from "axios";

// // const API_URL = "http://localhost:5001/api/products/";
// // const getToken = () => localStorage.getItem("token");

// // // We use FormData because we are sending a file
// // export const createProduct = (productData) => {
// //   const config = {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //       Authorization: `Bearer ${getToken()}`,
// //     },
// //   };
// //   return axios.post(API_URL, productData, config);
// // };

// // export const getProducts = () => {
// //   const config = { headers: { Authorization: `Bearer ${getToken()}` } };
// //   return axios.get(API_URL, config);
// // };

// // // UPDATE
// // export const updateProduct = (id, productData) => {
// //   const config = {
// //     headers: {
// //       "Content-Type": "multipart/form-data",
// //       Authorization: `Bearer ${getToken()}`,
// //     },
// //   };
// //   return axios.put(API_URL + id, productData, config);
// // };

// // export const deleteProduct = (id) => {
// //   const config = { headers: { Authorization: `Bearer ${getToken()}` } };
// //   return axios.delete(API_URL + id, config);
// // };

// // 1. Import the centralized 'api' client instead of 'axios'
// import api from "./api";

// // The API base URL, token, and headers are now handled by the interceptors in api.js,
// // so we can remove the old API_URL and getToken constants.

// // We use FormData because we are sending a file
// export const createProduct = (productData) => {
//   // 2. Use the 'api' client and a relative path. No config needed.
//   // console.log("Product data:", productData);
//   return api.post("/products", productData);
// };

// export const getProducts = () => {
//   // 3. The request is much simpler now.
//   return api.get("/products");
// };

// export const updateProduct = (id, productData) => {
//   // 4. Use a template literal for the dynamic ID.
//   return api.put(`/products/${id}`, productData);
// };

// export const deleteProduct = (id) => {
//   return api.delete(`/products/${id}`);
// };


// src/services/productService.js

import api from "./api";

// We use FormData because we are sending a file
export const createProduct = (productData) => {
  // Add the config object to override the Content-Type header
  return api.post("/products", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProducts = () => {
  return api.get("/products");
};

export const updateProduct = (id, productData) => {
  // Also add the config object here for updates involving files
  return api.put(`/products/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};