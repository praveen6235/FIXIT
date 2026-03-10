import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./UserPage/component/Navbar";
import Footer from "./UserPage/component/Footer";

import ProtectedRoute from "./UserPage/component/ProtectedRoute";
import AdminProtectedRoute from "./UserPage/component/AdminProtectedRoute";

import Home from "./UserPage/pages/Home";
import Login from "./UserPage/pages/Login";
import Register from "./UserPage/pages/Register";
import Booking from "./UserPage/pages/Booking";
import MyBookings from "./UserPage/pages/MyBookings";
import About from "./UserPage/pages/About";

import Plumbing from "./UserPage/pages/services/Plumbing";
import Electrician from "./UserPage/pages/services/Electrician";
import Carpenter from "./UserPage/pages/services/Carpenter";
import Cleaning from "./UserPage/pages/services/Cleaning";
import Painting from "./UserPage/pages/services/Painting";
import Services from "./UserPage/pages/services/Services";

import AdminLogin from "./UserPage/pages/AdminLogin";

import Admin from "./AdminPage/page/Dashboard";
import AddProvider from "./AdminPage/page/Add";
import UpdateProvider from "./AdminPage/page/UpdateProvider";

import ProviderLogin from "./ProviderPage/pages/ProviderLogin";
import ProviderDashboard from "./ProviderPage/pages/ProviderDashboard";
import ProviderProtectedRoute from "./UserPage/component/ProviderProtectedRoute";
import ChangePassword from "./ProviderPage/pages/ChangePassword";
import ProviderProfile from "./ProviderPage/pages/ProviderProfile";

export default function App() {
  return (
    <HashRouter>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />

        <Route
          path="/admin/login"
          element={
            <>
              <Navbar />
              <AdminLogin />
              <Footer />
            </>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Navbar />
              <Booking />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <Navbar />
              <MyBookings />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <Services />
              <Footer />
            </>
          }
        />

        <Route
          path="/services/plumbing"
          element={
            <>
              <Navbar />
              <Plumbing />
              <Footer />
            </>
          }
        />

        <Route
          path="/services/electrician"
          element={
            <>
              <Navbar />
              <Electrician />
              <Footer />
            </>
          }
        />

        <Route
          path="/services/carpenter"
          element={
            <>
              <Navbar />
              <Carpenter />
              <Footer />
            </>
          }
        />

        <Route
          path="/services/cleaning"
          element={
            <>
              <Navbar />
              <Cleaning />
              <Footer />
            </>
          }
        />

        <Route
          path="/services/painting"
          element={
            <>
              <Navbar />
              <Painting />
              <Footer />
            </>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/add"
          element={
            <AdminProtectedRoute>
              <AddProvider />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/update/:id"
          element={
            <AdminProtectedRoute>
              <UpdateProvider />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/provider/login"
          element={
            <>
              <Navbar />
              <ProviderLogin />
              <Footer />
            </>
          }
        />

        <Route
          path="/provider/dashboard"
          element={
            <ProviderProtectedRoute>
              <ProviderDashboard />
            </ProviderProtectedRoute>
          }
        />

        <Route
          path="/provider/change-password"
          element={
            <ProviderProtectedRoute>
              <ChangePassword />
            </ProviderProtectedRoute>
          }
        />

        <Route
          path="/provider/profile"
          element={
            <ProviderProtectedRoute>
              <ProviderProfile />
            </ProviderProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
