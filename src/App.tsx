import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultContainer } from "./containers/default/default.container";
import { CircularProgress, Box } from "@mui/material";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/auth/login.page";

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

export default function App({
  toggleTheme,
  mode,
}: {
  toggleTheme: () => void;
  mode: "light" | "dark";
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress data-testid="loading-progress" />
        </Box>
      }>
        <Routes>
          <Route path="/labelMerger/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DefaultContainer toggleTheme={toggleTheme} mode={mode}>
                  <Routes>
                    <Route path="/labelMerger/" element={<HomePage />} />
                    <Route path="/labelMerger/products/" element={<ProductsPage />} />
                    <Route path="/labelMerger/transactions/" element={<TransactionAnalytics />} />
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
