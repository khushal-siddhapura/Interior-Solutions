import { jwtDecode } from "jwt-decode";

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // The decoded token contains the 'admin' payload we set on the backend
    const decodedToken = jwtDecode(token);
    return decodedToken.admin; // This will return { id: '...', role: '...' }
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
