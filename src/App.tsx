import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultContainer } from "./containers/default/default.container";
import { CircularProgress, Box } from "@mui/material";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/auth/login.page";

const DashboardPage = React.lazy(() =>
  import("./pages/dashboard/dashboard.page").then((module) => ({
    default: module.DashboardPage,
  }))
);

const HomePage = React.lazy(() =>
  import("./pages/home/home.page").then((module) => ({
    default: module.HomePage,
  }))
);

const TransactionAnalytics = React.lazy(() =>
  import("./pages/transactionAnalytics/transactionAnalytics.page").then(
    (module) => ({
      default: module.TransactionAnalytics,
    })
  )
);

const ProductsPage = React.lazy(() =>
  import("./pages/products/products.page").then((module) => ({
    default: module.default,
  }))
);

const ActiveOrders = React.lazy(() =>
  import("./pages/todaysOrders/todaysOrder.page").then((module) => ({
    default: module.TodaysOrderPage,
  }))
);

export default function App({
  toggleTheme,
  mode,
}: {
  toggleTheme: () => void;
  mode: "light" | "dark";
}) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense
        fallback={
          <CircularProgress data-testid="loading-progress" color="success" />
        }
      >
        <Routes>
          <Route path="/flipkart-amazon-tools/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DefaultContainer toggleTheme={toggleTheme} mode={mode}>
                  <Routes>
                    <Route path="/flipkart-amazon-tools/" element={<DashboardPage />} />
                    <Route path="/flipkart-amazon-tools/home/" element={<HomePage />} />
                    <Route
                      path="/flipkart-amazon-tools/products/"
                      element={<ProductsPage />}
                    />
                    <Route
                      path="/flipkart-amazon-tools/transactions/"
                      element={<TransactionAnalytics />}
                    />
                    <Route
                      path="/flipkart-amazon-tools/activeOrders/"
                      element={<ActiveOrders />}
                    />
                  </Routes>
                </DefaultContainer>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Box>
  );
}
