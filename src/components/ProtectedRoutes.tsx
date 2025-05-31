import React from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultContainer } from "../containers/default/default.container";
import NotFound from "../pages/NotFound";

// ... existing code ...

// Import lazy-loaded pages
const DashboardPage = React.lazy(() =>
  import("../pages/dashboard/dashboard.page").then((module) => ({
    default: module.DashboardPage,
  }))
);

const HomePage = React.lazy(() =>
  import("../pages/home/home.page").then((module) => ({
    default: module.HomePage,
  }))
);

const TransactionAnalytics = React.lazy(() =>
  import("../pages/transactionAnalytics/transactionAnalytics.page").then(
    (module) => ({
      default: module.TransactionAnalytics,
    })
  )
);

const ProductsPage = React.lazy(() =>
  import("../pages/products/products.page").then((module) => ({
    default: module.default,
  }))
);

const ActiveOrders = React.lazy(() =>
  import("../pages/todaysOrders/todaysOrder.page").then((module) => ({
    default: module.TodaysOrderPage,
  }))
);

const HiddenProductsPage = React.lazy(() =>
  import("../pages/hidden-products/hidden-products.page").then((module) => ({
    default: module.HiddenProductsPage,
  }))
);

const InventoryPage = React.lazy(() =>
  import("../pages/inventory/inventory.page").then((module) => ({
    default: module.InventoryPage,
  }))
);

const CategoriesPage = React.lazy(() =>
  import("../pages/categories/categories.page").then((module) => ({
    default: module.CategoriesPage,
  }))
);

const OrderAnalytics = React.lazy(() =>
  import("../pages/orderAnalytics").then((module) => ({
    default: module.default,
  }))
);

const UncategorizedProductsPage = React.lazy(() =>
  import("../pages/uncategorized-products/uncategorized-products.page").then((module) => ({
    default: module.default,
  }))
);

interface ProtectedRoutesProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  toggleTheme,
  mode,
}) => {
  return (
    <DefaultContainer toggleTheme={toggleTheme} mode={mode}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/home/" element={<HomePage />} />
        <Route path="/products/" element={<ProductsPage />} />
        <Route path="/transactions/" element={<TransactionAnalytics />} />
        <Route path="/activeOrders/" element={<ActiveOrders />} />
        <Route path="/hidden-products/" element={<HiddenProductsPage />} />
        <Route path="/inventory/" element={<InventoryPage />} />
        <Route path="/categories/" element={<CategoriesPage />} />
        <Route path="/order-analytics/" element={<OrderAnalytics />} />
        <Route path="/uncategorized-products/" element={<UncategorizedProductsPage />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </DefaultContainer>
  );
}; 