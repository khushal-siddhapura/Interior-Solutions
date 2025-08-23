import axios from "axios";

const API_URL = "http://localhost:5001/api/gallery/";
const getToken = () => localStorage.getItem("token");

export const uploadImage = (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return axios.post(API_URL, formData, config);
};

export const getGalleryImages = () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  return axios.get(API_URL, config);
};

export const updateImage = (id, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return axios.put(API_URL + id, formData, config);
};

export const deleteImage = (id) => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  return axios.delete(API_URL + id, config);
};
