import axios from "axios";

const API_URL = "https://interior-solutions.onrender.com/api/admins/";

// Helper function to get the auth token
const getToken = () => localStorage.getItem("token");

// Helper function to get headers
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// CREATE
export const createAdmin = (adminData) => {
  return axios.post(API_URL, adminData, getAuthHeaders());
};

// READ
export const getAdmins = () => {
  return axios.get(API_URL, getAuthHeaders());
};

// UPDATE
export const updateAdmin = (id, adminData) => {
  return axios.put(API_URL + id, adminData, getAuthHeaders());
};

// DELETE
export const deleteAdmin = (id) => {
  return axios.delete(API_URL + id, getAuthHeaders());
};
