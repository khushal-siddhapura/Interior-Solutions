import React, { useEffect } from "react"; // 1. Import useEffect
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import toast from "react-hot-toast";

const SuperAdminRoute = () => {
  const user = getCurrentUser();

  // Use optional chaining for safety in case user is null/undefined
  const isSuperAdmin = user?.role === "SuperAdmin";

  // 2. Move the side effect (the toast call) into a useEffect hook
  useEffect(() => {
    // Only show the toast if a user is logged in but is not a SuperAdmin
    if (user && !isSuperAdmin) {
      toast.error("You don't have permission to access this page.");
    }
  }, [user, isSuperAdmin]); // Dependencies ensure this runs only when user or role changes

  // The render logic below is now "pure" and just decides what to display.

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isSuperAdmin) {
    // The component first returns the Navigate element to trigger the redirect.
    // The useEffect hook above will then run AFTER this render.
    return <Navigate to="/admin/dashboard" />;
  }

  // If all checks pass, render the child component.
  return <Outlet />;
};

export default SuperAdminRoute;
