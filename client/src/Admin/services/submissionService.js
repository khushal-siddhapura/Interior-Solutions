import axios from "axios";

const API_URL = "http://localhost:5001/api/submissions/";
const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getContactSubmissions = () =>
  axios.get(API_URL + "contact", getAuthHeaders());
export const getQuoteSubmissions = () =>
  axios.get(API_URL + "quote", getAuthHeaders());

export const updateSubmissionStatus = (type, id, status) => {
  return axios.put(`${API_URL}${type}/${id}`, { status }, getAuthHeaders());
};

export const deleteSubmission = (type, id) => {
  return axios.delete(`${API_URL}${type}/${id}`, getAuthHeaders());
};
