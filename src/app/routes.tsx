import { createBrowserRouter } from "react-router";

// Layouts
import { ClientLayout } from "./layouts/ClientLayout";
import { ManagerLayout } from "./layouts/ManagerLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Client Pages
import { HomePage } from "./pages/client/HomePage";
import { CatalogPage } from "./pages/client/CatalogPage";
import { ProductPage } from "./pages/client/ProductPage";
import { CheckoutPage } from "./pages/client/CheckoutPage";

// Manager Pages
import { ManagerDashboard } from "./pages/manager/ManagerDashboard";
import { OrderDetailsPage } from "./pages/manager/OrderDetailsPage";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ProductsManagementPage } from "./pages/admin/ProductsManagementPage";
import { ManagersManagementPage } from "./pages/admin/ManagersManagementPage";
import { AnalyticsPage } from "./pages/admin/AnalyticsPage";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";

// Not Found
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ClientLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalog", Component: CatalogPage },
      { path: "catalog/:category", Component: CatalogPage },
      { path: "product/:id", Component: ProductPage },
      { path: "checkout", Component: CheckoutPage },
    ],
  },
  {
    path: "/manager",
    Component: ManagerLayout,
    children: [
      { index: true, Component: ManagerDashboard },
      { path: "order/:id", Component: OrderDetailsPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "products", Component: ProductsManagementPage },
      { path: "managers", Component: ManagersManagementPage },
      { path: "analytics", Component: AnalyticsPage },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
