import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Products from "../pages/products";
import Home from "../pages";
import EditProfile from "../pages/edit-profile";
// import DashboardLayout from "../layout/Dashboard";

// interface AppRouterProps {
//   pageProps: HomeProps;
// }

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that require DashboardLayout */}
        <Route
          path="/"
          element={
            // <DashboardLayout>
              <Home />
            // </DashboardLayout>
          }
        />
        {/* Routes that don't require DashboardLayout */}
        <Route
          path="/products"
          element={
            // <DashboardLayout>
              <Products />
            // </DashboardLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
