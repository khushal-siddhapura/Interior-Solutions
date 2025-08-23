// import "./App.css";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import { Products } from "./pages/Products";
// import { Solutions } from "./pages/Solutions";
// import { Gallery } from "./pages/Gallery";
// import { Contact } from "./pages/Contact";
// import { Quote } from "./pages/Quote";
// import Layout from "./layouts/Layout";
// import LoginPage from "./Admin/pages/LoginPage";
// import ProtectedRoute from "./Admin/components/ProtectedRoute";
// import DashboardPage from "./Admin/pages/DashboardPage";
// import AdminManagementPage from "./Admin/pages/AdminManagementPage";
// import SuperAdminRoute from "./Admin/components/SuperAdminRoute";
// import ProductManagementPage from "./Admin/pages/ProductManagementPage";
// import GalleryManagementPage from "./Admin/pages/GalleryManagementPage";
// import ContactSubmissionsPage from "./Admin/pages/ContactSubmissionsPage";
// import QuoteSubmissionsPage from "./Admin/pages/QuoteSubmissionsPage";
// import { Toaster } from "react-hot-toast";
// import AdminLayout from "./Admin/components/AdminLayout";

// function App() {
//   return (
//     <>
//       {/* The main <Layout> wrapper is removed from around the <Routes> */}
//       <Routes>
//         {/* --- Public Routes Grouped Under The Main Layout --- */}
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/solutions" element={<Solutions />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/quote" element={<Quote />} />
//         </Route>

//         {/* --- Standalone routes that DO NOT use the main Layout --- */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* --- Protected Admin Routes (uses its own AdminLayout) --- */}
//         <Route path="/admin" element={<ProtectedRoute />}>
//           <Route element={<AdminLayout />}>
//             <Route index element={<Navigate to="/admin/dashboard" />} />
//             <Route path="dashboard" element={<DashboardPage />} />
//             <Route path="products" element={<ProductManagementPage />} />
//             <Route path="gallery" element={<GalleryManagementPage />} />
//             <Route
//               path="contact-submissions"
//               element={<ContactSubmissionsPage />}
//             />
//             <Route
//               path="quote-submissions"
//               element={<QuoteSubmissionsPage />}
//             />
//             <Route element={<SuperAdminRoute />}>
//               <Route path="management" element={<AdminManagementPage />} />
//             </Route>
//           </Route>
//         </Route>
//       </Routes>
//       <Toaster duration={4000} position="top-right" />
//     </>
//   );
// }

// export default App;

//================== working ===========================

// import "./App.css";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import { About } from "./pages/About";
// import { Products } from "./pages/Products";
// import { Solutions } from "./pages/Solutions";
// import { Gallery } from "./pages/Gallery";
// import { Contact } from "./pages/Contact";
// import { Quote } from "./pages/Quote";
// import Layout from "./layouts/Layout";
// import LoginPage from "./Admin/pages/LoginPage";
// import ProtectedRoute from "./Admin/components/ProtectedRoute";
// import DashboardPage from "./Admin/pages/DashboardPage";
// import AdminManagementPage from "./Admin/pages/AdminManagementPage";
// import SuperAdminRoute from "./Admin/components/SuperAdminRoute";
// import ProductManagementPage from "./Admin/pages/ProductManagementPage";
// import GalleryManagementPage from "./Admin/pages/GalleryManagementPage";
// import ContactSubmissionsPage from "./Admin/pages/ContactSubmissionsPage";
// import QuoteSubmissionsPage from "./Admin/pages/QuoteSubmissionsPage";
// import { Toaster } from "react-hot-toast";
// import AdminLayout from "./Admin/components/AdminLayout";

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* --- Public Routes Grouped Under The Main Layout --- */}
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/solutions" element={<Solutions />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/quote" element={<Quote />} />
//         </Route>

//         {/* --- Standalone routes that DO NOT use the main Layout --- */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* --- Protected Admin Routes (uses its own AdminLayout) --- */}
//         <Route path="/admin" element={<ProtectedRoute />}>
//           <Route element={<AdminLayout />}>
//             <Route index element={<Navigate to="/admin/dashboard" />} />
//             <Route path="dashboard" element={<DashboardPage />} />
//             <Route path="products" element={<ProductManagementPage />} />
//             <Route path="gallery" element={<GalleryManagementPage />} />
//             <Route
//               path="contact-submissions"
//               element={<ContactSubmissionsPage />}
//             />
//             <Route
//               path="quote-submissions"
//               element={<QuoteSubmissionsPage />}
//             />
//             <Route element={<SuperAdminRoute />}>
//               <Route path="management" element={<AdminManagementPage />} />
//             </Route>
//           </Route>
//         </Route>
//       </Routes>
//       <Toaster duration={4000} position="top-right" />
//     </>
//   );
// }

// export default App;

// src/App.jsx
import "./App.css";
import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./Admin/components/ProtectedRoute";
import SuperAdminRoute from "./Admin/components/SuperAdminRoute";
import AdminLayout from "./Admin/components/AdminLayout";
import { Toaster } from "react-hot-toast";

/*
  Lazy imports for route-based code-splitting.
  Each import becomes a separate chunk and only loads when the route is visited.
*/
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Quote = lazy(() => import("./pages/Quote"));

const LoginPage = lazy(() => import("./Admin/pages/LoginPage"));
const DashboardPage = lazy(() => import("./Admin/pages/DashboardPage"));
const AdminManagementPage = lazy(() =>
  import("./Admin/pages/AdminManagementPage")
);
const ProductManagementPage = lazy(() =>
  import("./Admin/pages/ProductManagementPage")
);
const GalleryManagementPage = lazy(() =>
  import("./Admin/pages/GalleryManagementPage")
);
const ContactSubmissionsPage = lazy(() =>
  import("./Admin/pages/ContactSubmissionsPage")
);
const QuoteSubmissionsPage = lazy(() =>
  import("./Admin/pages/QuoteSubmissionsPage")
);

function LoadingFallback() {
  // keep this very small (spinner/text) — it is shown while lazy chunks load
  return <div style={{ padding: 40, textAlign: "center" }}>Loading…</div>;
}

export default function App() {
  return (
    <>
      {/* Wrap routes in one Suspense so route components lazy-load */}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes under main layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
          </Route>

          {/* Standalone login (public) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin (protected) - Admin code split will only be fetched when /admin* is visited */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductManagementPage />} />
              <Route path="gallery" element={<GalleryManagementPage />} />
              <Route
                path="contact-submissions"
                element={<ContactSubmissionsPage />}
              />
              <Route
                path="quote-submissions"
                element={<QuoteSubmissionsPage />}
              />
              <Route element={<SuperAdminRoute />}>
                <Route path="management" element={<AdminManagementPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>

      <Toaster duration={4000} position="top-right" />
    </>
  );
}
