import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './protected-route'; // Import your protected route component
import AdminLayout from '../layout/admin-layout';
import UserLayout from '../layout/user-layout';
import AdminDashboard from '../user/components/user-profile';
import UserDashboard from '../user/components/user-profile';
import Products from '../products/components/product';
import Cart from '../cart/components/cart';
import Login from '../user/components/login-form';
import Register from '../user/components/user-register';
import ProductDetail from '../products/components/product-detail';

const router = createBrowserRouter([
  // Public Routes
  { path: "/login", element: <Login />, role: "Public" },
  { path: "/register", element: <Register />, role: "Public" },
  // Admin Routes
  {
    path: "/admin",
    element: <ProtectedRoute requiredRole="Admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { path: "products", element: <Products /> }
    ]
  },

  // User Routes
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },

      { path: "cart", element: <Cart /> },
      { path: "user-dashboard", element: <Products /> }
    ]
  }
]);

export { router };
